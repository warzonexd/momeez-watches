import Database from "better-sqlite3";

const db = new Database("/home/ubuntu/momeez-watches/data.db");

const products = [
  // ساعات كلاسيكية (categoryId: 1)
  {
    name: "Classic Gold Watch",
    nameAr: "ساعة ذهبية كلاسيكية",
    description: "Elegant gold watch with leather strap",
    descriptionAr: "ساعة ذهبية أنيقة مع حزام جلدي فاخر",
    price: 299,
    categoryId: 1,
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "Silver Classic",
    nameAr: "ساعة فضية كلاسيكية",
    description: "Timeless silver watch",
    descriptionAr: "ساعة فضية خالدة بتصميم عصري",
    price: 249,
    categoryId: 1,
    imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "Brown Leather Watch",
    nameAr: "ساعة جلد بني",
    description: "Classic brown leather watch",
    descriptionAr: "ساعة كلاسيكية بحزام جلد بني",
    price: 199,
    categoryId: 1,
    imageUrl: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "Black Steel Watch",
    nameAr: "ساعة فولاذية سوداء",
    description: "Modern black steel watch",
    descriptionAr: "ساعة فولاذية سوداء عصرية",
    price: 279,
    categoryId: 1,
    imageUrl: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "Rose Gold Elegance",
    nameAr: "ساعة ذهب وردي",
    description: "Elegant rose gold watch",
    descriptionAr: "ساعة أنيقة بلون الذهب الوردي",
    price: 329,
    categoryId: 1,
    imageUrl: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=500&h=500&fit=crop",
    isActive: 1
  },
  
  // ساعات إسلامية (categoryId: 2)
  {
    name: "Prayer Time Watch",
    nameAr: "ساعة مواقيت الصلاة الذكية",
    description: "Smart prayer time watch with Qibla",
    descriptionAr: "ساعة ذكية مع مواقيت الصلاة واتجاه القبلة",
    price: 399,
    categoryId: 2,
    imageUrl: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "Islamic Gold Watch",
    nameAr: "ساعة إسلامية ذهبية",
    description: "Gold watch with Islamic design",
    descriptionAr: "ساعة ذهبية بنقوش إسلامية",
    price: 449,
    categoryId: 2,
    imageUrl: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "Azan Watch",
    nameAr: "ساعة الأذان الفاخرة",
    description: "Luxury Azan watch",
    descriptionAr: "ساعة فاخرة مع تنبيه الأذان",
    price: 379,
    categoryId: 2,
    imageUrl: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "Qibla Compass Watch",
    nameAr: "ساعة بوصلة القبلة",
    description: "Watch with Qibla compass",
    descriptionAr: "ساعة مع بوصلة القبلة المدمجة",
    price: 359,
    categoryId: 2,
    imageUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "Islamic Calendar Watch",
    nameAr: "ساعة التقويم الهجري",
    description: "Watch with Islamic calendar",
    descriptionAr: "ساعة مع التقويم الهجري",
    price: 389,
    categoryId: 2,
    imageUrl: "https://images.unsplash.com/photo-1526045478516-99145907023c?w=500&h=500&fit=crop",
    isActive: 1
  },
  
  // ساعات رقمية (categoryId: 3)
  {
    name: "Smart Digital Watch",
    nameAr: "ساعة رقمية ذكية",
    description: "Modern smart digital watch",
    descriptionAr: "ساعة رقمية ذكية حديثة",
    price: 199,
    categoryId: 3,
    imageUrl: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "Sport Digital Watch",
    nameAr: "ساعة رقمية رياضية",
    description: "Sports digital watch",
    descriptionAr: "ساعة رقمية رياضية متطورة",
    price: 149,
    categoryId: 3,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "LED Digital Watch",
    nameAr: "ساعة LED رقمية",
    description: "LED display digital watch",
    descriptionAr: "ساعة رقمية بشاشة LED",
    price: 129,
    categoryId: 3,
    imageUrl: "https://images.unsplash.com/photo-1495704907664-81f74a7efd9e?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "Fitness Tracker Watch",
    nameAr: "ساعة تتبع اللياقة",
    description: "Fitness tracking watch",
    descriptionAr: "ساعة ذكية لتتبع اللياقة البدنية",
    price: 179,
    categoryId: 3,
    imageUrl: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "Waterproof Digital",
    nameAr: "ساعة رقمية مقاومة للماء",
    description: "Waterproof digital watch",
    descriptionAr: "ساعة رقمية مقاومة للماء",
    price: 159,
    categoryId: 3,
    imageUrl: "https://images.unsplash.com/photo-1617625802912-cde586faf331?w=500&h=500&fit=crop",
    isActive: 1
  },
  
  // ساعات نسائية (categoryId: 4)
  {
    name: "Rose Gold Ladies Watch",
    nameAr: "ساعة نسائية ذهب وردي",
    description: "Elegant ladies watch",
    descriptionAr: "ساعة نسائية أنيقة بلون الذهب الوردي",
    price: 259,
    categoryId: 4,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "Diamond Ladies Watch",
    nameAr: "ساعة نسائية بالماس",
    description: "Luxury diamond watch",
    descriptionAr: "ساعة فاخرة مرصعة بالماس",
    price: 599,
    categoryId: 4,
    imageUrl: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "Silver Bracelet Watch",
    nameAr: "ساعة سوار فضية",
    description: "Silver bracelet watch",
    descriptionAr: "ساعة سوار فضية أنيقة",
    price: 229,
    categoryId: 4,
    imageUrl: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "Pink Leather Watch",
    nameAr: "ساعة جلد وردية",
    description: "Pink leather ladies watch",
    descriptionAr: "ساعة نسائية بحزام جلد وردي",
    price: 189,
    categoryId: 4,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    isActive: 1
  },
  {
    name: "Pearl Ladies Watch",
    nameAr: "ساعة نسائية باللؤلؤ",
    description: "Pearl decorated watch",
    descriptionAr: "ساعة مزينة باللؤلؤ",
    price: 349,
    categoryId: 4,
    imageUrl: "https://images.unsplash.com/photo-1625695845455-8490d5c0c50c?w=500&h=500&fit=crop",
    isActive: 1
  }
];

const insert = db.prepare(`
  INSERT INTO products (name, nameAr, description, descriptionAr, price, categoryId, imageUrl, isActive)
  VALUES (@name, @nameAr, @description, @descriptionAr, @price, @categoryId, @imageUrl, @isActive)
`);

console.log("Adding sample products...");
for (const product of products) {
  insert.run(product);
}

console.log(`Successfully added ${products.length} products!`);
db.close();
