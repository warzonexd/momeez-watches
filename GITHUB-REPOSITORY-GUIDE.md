# مستودع GitHub - مميز للساعات

## 📦 محتويات المستودع

هذا المستودع يحتوي على كود موقع مميز للساعات بالكامل، يتضمن:

### **1. تطبيق React (Frontend)**
```
client/
├── src/
│   ├── pages/              # صفحات التطبيق
│   │   ├── Home.tsx        # الصفحة الرئيسية
│   │   ├── ProductDetails.tsx  # تفاصيل المنتج
│   │   ├── Admin.tsx       # لوحة التحكم
│   │   └── ...
│   ├── components/         # مكونات React
│   │   ├── ImageLightbox.tsx   # معرض الصور
│   │   ├── DashboardLayout.tsx # تخطيط لوحة التحكم
│   │   └── ...
│   ├── lib/               # مكتبات مساعدة
│   └── main.tsx           # نقطة الدخول
└── public/                # ملفات ثابتة
```

### **2. خادم Node.js/Express (Backend)**
```
server/
├── routers.ts             # API endpoints
├── db.ts                  # دوال قاعدة البيانات
├── storage.ts             # إدارة التخزين (S3)
├── _core/                 # مكتبات أساسية
│   ├── llm.ts            # تكامل LLM
│   ├── oauth.ts          # المصادقة
│   ├── context.ts        # السياق
│   └── ...
└── index.ts              # نقطة الدخول
```

### **3. قاعدة البيانات (Drizzle ORM)**
```
drizzle/
├── schema.ts             # تعريف الجداول
├── relations.ts          # العلاقات بين الجداول
└── migrations/           # ملفات الترحيل
```

### **4. قالب WordPress (اختياري)**
```
├── functions.php         # وظائف القالب
├── style.css            # أنماط CSS
├── header.php           # رأس الموقع
├── footer.php           # تذييل الموقع
├── index.php            # الصفحة الرئيسية
├── single-momeez_product.php  # صفحة المنتج
├── template-parts/      # أجزاء القالب
└── wordpress-setup.sql  # قاعدة البيانات
```

### **5. أدلة التثبيت والنشر**
```
├── README.md                      # دليل سريع
├── WORDPRESS-COMPLETE-SETUP.md    # دليل WordPress
├── WORDPRESS-CPANEL-GUIDE.md      # دليل cPanel
├── DEPLOYMENT-GUIDE.md            # دليل النشر
└── GITHUB-REPOSITORY-GUIDE.md     # هذا الملف
```

---

## 🚀 البدء السريع

### **المتطلبات:**
- Node.js 18+
- npm أو pnpm
- MySQL 5.7+
- Git

### **التثبيت:**

```bash
# استنساخ المستودع
git clone https://github.com/warzonexd/momeez-watches.git
cd momeez-watches

# تثبيت المتطلبات
pnpm install

# إعداد متغيرات البيئة
cp .env.example .env.local

# تشغيل قاعدة البيانات
pnpm db:push

# بدء خادم التطوير
pnpm dev
```

---

## 📂 هيكل المشروع

```
momeez-watches/
├── client/                 # تطبيق React (Frontend)
├── server/                 # خادم Node.js (Backend)
├── drizzle/               # قاعدة البيانات
├── shared/                # كود مشترك
├── storage/               # إدارة التخزين
├── template-parts/        # أجزاء WordPress
├── css/                   # أنماط CSS
├── .env.example           # متغيرات البيئة (مثال)
├── package.json           # المتطلبات
├── vite.config.ts         # إعدادات Vite
├── vitest.config.ts       # إعدادات الاختبارات
└── README.md              # دليل المشروع
```

---

## 🔧 الأوامر الرئيسية

| الأمر | الوصف |
|------|-------|
| `pnpm dev` | بدء خادم التطوير |
| `pnpm build` | بناء المشروع للإنتاج |
| `pnpm test` | تشغيل الاختبارات |
| `pnpm db:push` | تطبيق تغييرات قاعدة البيانات |
| `pnpm format` | تنسيق الكود |

---

## 📋 الميزات الرئيسية

✅ **إدارة المنتجات**
- إضافة/تعديل/حذف المنتجات
- صور متعددة لكل منتج
- كود المنتج (SKU) فريد
- فئات وتصنيفات

✅ **لوحة التحكم**
- واجهة سهلة الاستخدام
- متجاوبة (Responsive)
- إدارة المستخدمين
- إحصائيات وتقارير

✅ **الواجهة الأمامية**
- معرض صور تفاعلي
- Lightbox لتكبير الصور
- صفحة تفاصيل المنتج
- منتجات مشابهة
- زر WhatsApp للطلب

✅ **المصادقة والأمان**
- OAuth مع Manus
- إدارة الجلسات
- تشفير البيانات

✅ **قاعدة البيانات**
- MySQL مع Drizzle ORM
- ترحيلات تلقائية
- علاقات معرفة جيداً

---

## 🔐 متغيرات البيئة

```env
# قاعدة البيانات
DATABASE_URL=mysql://user:password@localhost:3306/momeez_db

# المصادقة
JWT_SECRET=your_secret_key
OAUTH_SERVER_URL=https://oauth.example.com

# التخزين
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1

# Manus APIs
BUILT_IN_FORGE_API_URL=https://api.manus.com
BUILT_IN_FORGE_API_KEY=your_key
```

---

## 📊 جداول قاعدة البيانات

### **جدول المنتجات (products)**
```sql
- id: رقم فريد
- name: اسم المنتج
- nameAr: الاسم بالعربية
- productCode: كود المنتج
- description: الوصف
- descriptionAr: الوصف بالعربية
- price: السعر الحالي
- originalPrice: السعر الأصلي
- category: الفئة
- image: الصورة الرئيسية
- rating: التقييم
- createdAt: تاريخ الإنشاء
```

### **جدول الصور (product_images)**
```sql
- id: رقم فريد
- productId: رقم المنتج
- imageUrl: رابط الصورة
- isPrimary: هل هي الصورة الرئيسية
- order: ترتيب الصورة
```

### **جدول المستخدمين (users)**
```sql
- id: رقم فريد
- email: البريد الإلكتروني
- name: الاسم
- role: الدور (admin/user)
- createdAt: تاريخ الإنشاء
```

---

## 🧪 الاختبارات

```bash
# تشغيل جميع الاختبارات
pnpm test

# تشغيل اختبار محدد
pnpm test server/products.test.ts

# مراقبة الاختبارات
pnpm test --watch
```

---

## 🌐 النشر

### **على Manus Hosting:**
```bash
# حفظ checkpoint
# انقر Publish من الواجهة
```

### **على cPanel:**
```bash
# اتبع: WORDPRESS-CPANEL-GUIDE.md
```

### **على خادم منفصل:**
```bash
# اتبع: DEPLOYMENT-GUIDE.md
```

---

## 📝 Git Workflow

### **إنشاء فرع جديد:**
```bash
git checkout -b feature/your-feature-name
```

### **إرسال التغييرات:**
```bash
git add .
git commit -m "وصف التغييرات"
git push origin feature/your-feature-name
```

### **دمج الفرع:**
```bash
# أنشئ Pull Request على GitHub
# بعد المراجعة، ادمج الفرع
```

---

## 🐛 استكشاف الأخطاء

### **خطأ: "Cannot find module"**
```bash
pnpm install
```

### **خطأ: "Database connection failed"**
```bash
# تحقق من DATABASE_URL
# تأكد من أن MySQL يعمل
```

### **خطأ: "Port already in use"**
```bash
# غيّر PORT في .env
# أو قتل العملية: lsof -ti:3000 | xargs kill -9
```

---

## 📞 الدعم والمساهمة

### **الإبلاغ عن الأخطاء:**
1. افتح Issue جديد
2. وصّف المشكلة بالتفصيل
3. أرفق لقطة شاشة إن أمكن

### **المساهمة:**
1. Fork المستودع
2. أنشئ فرع جديد
3. أرسل Pull Request

---

## 📚 موارد إضافية

- [React Documentation](https://react.dev)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Drizzle ORM](https://orm.drizzle.team)
- [WordPress.org](https://wordpress.org)
- [GitHub Docs](https://docs.github.com)

---

## 📄 الترخيص

هذا المشروع مرخص تحت MIT License

---

## 👥 الفريق

- **المطور:** Manus Team
- **آخر تحديث:** ديسمبر 2025
- **الإصدار:** 1.0.0

---

**شكراً لاستخدام مميز للساعات! 🎉**

للمزيد من المعلومات، زر: https://github.com/warzonexd/momeez-watches
