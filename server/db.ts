import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, categories, products, productImages, reviews, InsertCategory, InsertProduct, InsertProductImage, InsertReview, Review } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Categories helpers
export async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(categories);
}

export async function getCategoryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCategory(category: InsertCategory) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(categories).values(category);
  return result;
}

// Products helpers
export async function getAllProducts() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(products);
}

export async function getProductsByCategory(categoryId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(products).where(eq(products.categoryId, categoryId));
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createProduct(product: InsertProduct) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(products).values(product);
  // Get the inserted product ID from result
  const insertId = (result as any).insertId;
  if (insertId) {
    // Fetch and return the newly created product
    const newProduct = await db.select().from(products).where(eq(products.id, insertId)).limit(1);
    return newProduct[0];
  }
  return result;
}

export async function updateProduct(id: number, product: Partial<InsertProduct>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(products).set(product).where(eq(products.id, id));
  return result;
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Delete associated images first
  await db.delete(productImages).where(eq(productImages.productId, id));
  const result = await db.delete(products).where(eq(products.id, id));
  return result;
}

// Product Images helpers
export async function getProductImages(productId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(productImages).where(eq(productImages.productId, productId));
}

export async function createProductImage(image: InsertProductImage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(productImages).values(image);
  return result;
}

export async function deleteProductImage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.delete(productImages).where(eq(productImages.id, id));
  return result;
}

export async function setPrimaryImage(productId: number, imageId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // First, unset all primary images for this product
  await db.update(productImages)
    .set({ isPrimary: 0 })
    .where(eq(productImages.productId, productId));
  // Then set the selected image as primary
  await db.update(productImages)
    .set({ isPrimary: 1 })
    .where(eq(productImages.id, imageId));
  return true;
}

// Reviews helpers
export async function getProductReviews(productId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(reviews).where(eq(reviews.productId, productId));
}

export async function createReview(review: InsertReview) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(reviews).values(review);
  return result;
}

export async function getAverageRating(productId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select().from(reviews).where(eq(reviews.productId, productId));
  if (result.length === 0) return 0;
  const sum = result.reduce((acc: number, review: Review) => acc + review.rating, 0);
  return Math.round((sum / result.length) * 10) / 10;
}

export async function getReviewCount(productId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select().from(reviews).where(eq(reviews.productId, productId));
  return result.length;
}
