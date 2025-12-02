import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: undefined,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("Products API", () => {
  it("should list all categories publicly", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const categories = await caller.categories.list();

    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it("should list all products publicly", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const products = await caller.products.list();

    expect(Array.isArray(products)).toBe(true);
  });

  it("should get products by category", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Get first category
    const categories = await caller.categories.list();
    if (categories.length > 0) {
      const products = await caller.products.getByCategory({
        categoryId: categories[0].id,
      });

      expect(Array.isArray(products)).toBe(true);
    }
  });

  it("should require admin role to create product", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.products.create({
        name: "Test Watch",
        nameAr: "ساعة تجريبية",
        price: 100,
        categoryId: 1,
      })
    ).rejects.toThrow();
  });

  it("should allow admin to create product", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Get first category
    const categories = await caller.categories.list();
    
    if (categories.length > 0) {
      const result = await caller.products.create({
        name: "Test Watch",
        nameAr: "ساعة تجريبية",
        description: "Test description",
        descriptionAr: "وصف تجريبي",
        price: 100,
        categoryId: categories[0].id,
      });

      expect(result).toBeDefined();
    }
  });
});
