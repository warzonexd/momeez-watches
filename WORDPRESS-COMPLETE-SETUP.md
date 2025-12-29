# دليل الإعداد الكامل لـ WordPress - مميز للساعات

## 📦 الملفات المتضمنة

```
momeez-watches/
├── wordpress-setup.sql              # قاعدة البيانات الجاهزة
├── functions.php                    # وظائف القالب المخصصة
├── style.css                        # أنماط CSS الرئيسية
├── header.php                       # رأس الموقع
├── footer.php                       # تذييل الموقع
├── index.php                        # الصفحة الرئيسية
├── single-momeez_product.php        # صفحة المنتج الفردي
├── woocommerce-integration.php      # تكامل WooCommerce (اختياري)
├── css/
│   └── woocommerce.css              # أنماط WooCommerce
├── template-parts/
│   ├── content-product.php          # بطاقة المنتج
│   ├── content.php                  # محتوى المنشور
│   ├── content-none.php             # رسالة عدم وجود محتوى
│   └── hero.php                     # قسم البطل
├── WORDPRESS-CPANEL-GUIDE.md        # دليل cPanel
├── DEPLOYMENT-GUIDE.md              # دليل النشر
└── WORDPRESS-COMPLETE-SETUP.md      # هذا الملف
```

---

## 🚀 خطوات الإعداد السريعة

### **المرحلة 1: التحضير (5 دقائق)**

1. **احصل على بيانات cPanel:**
   - عنوان الخادم (Host)
   - اسم المستخدم
   - كلمة المرور
   - رقم المنفذ (عادة 2083 أو 2087)

2. **جهّز الملفات:**
   - احفظ جميع الملفات في مجلد واحد
   - تأكد من أن جميع الملفات موجودة

---

### **المرحلة 2: إنشاء قاعدة البيانات (10 دقائق)**

#### الخطوة 1: ادخل إلى cPanel
```
URL: https://example.com:2083
Username: your_cpanel_username
Password: your_cpanel_password
```

#### الخطوة 2: أنشئ قاعدة بيانات
```
1. ابحث عن "MySQL Databases"
2. اسم قاعدة البيانات: momeez_watches_db
3. اسم المستخدم: momeez_user
4. كلمة المرور: استخدم كلمة قوية (احفظها!)
5. انقر "Create Database"
```

#### الخطوة 3: أضف صلاحيات المستخدم
```
1. في نفس الصفحة، ابحث عن "Add User to Database"
2. اختر المستخدم والقاعدة
3. اختر جميع الصلاحيات
4. انقر "Add User to Database"
```

#### الخطوة 4: استيرد قاعدة البيانات
```
1. افتح phpMyAdmin من cPanel
2. اختر قاعدة البيانات الجديدة
3. انقر على "Import"
4. اختر الملف: wordpress-setup.sql
5. انقر "Go"
```

---

### **المرحلة 3: تثبيت WordPress (15 دقيقة)**

#### الطريقة الأولى: استخدام Softaculous (الأسهل)

```
1. من cPanel، ابحث عن "Softaculous Apps Installer"
2. اختر "WordPress"
3. انقر "Install"
4. ملأ البيانات:
   
   Domain:                    اختر نطاقك (example.com)
   Directory:                 اتركه فارغاً
   Database Name:             momeez_watches_db
   Database Username:         momeez_user
   Database Password:         كلمتك
   Admin Username:            admin
   Admin Password:            كلمة قوية (احفظها!)
   Admin Email:               your-email@example.com
   Site Name:                 مميز للساعات
   Site Description:          متجر متخصص في بيع الساعات
   
5. انقر "Install"
```

#### الطريقة الثانية: التثبيت اليدوي

```
1. حمّل WordPress من: https://wordpress.org/download/
2. استخرج الملفات
3. اتصل عبر FTP بـ cPanel
4. حمّل الملفات إلى public_html
5. افتح: https://example.com/wp-admin/setup-config.php
6. اتبع خطوات التثبيت
```

---

### **المرحلة 4: رفع ملفات القالب (10 دقائق)**

#### الخطوة 1: اتصل عبر FTP
```
Host: example.com
Username: your_cpanel_username
Password: your_cpanel_password
Port: 21 (FTP) أو 22 (SFTP)
```

#### الخطوة 2: أنشئ مجلد القالب
```
1. انتقل إلى: /public_html/wp-content/themes/
2. أنشئ مجلد جديد: momeez-theme
```

#### الخطوة 3: حمّل ملفات القالب
```
حمّل الملفات التالية إلى momeez-theme/:
- functions.php
- style.css
- header.php
- footer.php
- index.php
- single-momeez_product.php
- woocommerce-integration.php (اختياري)

أنشئ مجلد: css/
حمّل: css/woocommerce.css

أنشئ مجلد: template-parts/
حمّل:
- template-parts/content-product.php
- template-parts/content.php
- template-parts/content-none.php
- template-parts/hero.php
```

#### الخطوة 4: تفعيل القالب
```
1. ادخل إلى: wp-admin/
2. اذهب إلى: Appearance > Themes
3. ابحث عن: Momeez Theme
4. انقر: "Activate"
```

---

### **المرحلة 5: تكوين الموقع (15 دقيقة)**

#### 5.1 الإعدادات الأساسية
```
1. اذهب إلى: Settings > General
2. Site Title: مميز للساعات
3. Tagline: متجر متخصص في بيع الساعات الفاخرة والإسلامية
4. WordPress Address: https://example.com
5. Site Address: https://example.com
6. Timezone: Asia/Riyadh
7. انقر "Save Changes"
```

#### 5.2 إعدادات الروابط الثابتة
```
1. اذهب إلى: Settings > Permalinks
2. اختر: Post name (/%postname%/)
3. انقر "Save Changes"
```

#### 5.3 تفعيل HTTPS
```
1. من cPanel، اذهب إلى: AutoSSL
2. انقر "Run AutoSSL"
3. انتظر التفعيل (قد يستغرق 15 دقيقة)
```

---

### **المرحلة 6: إعداد المنتجات (30 دقيقة)**

#### 6.1 أنشئ الفئات
```
1. اذهب إلى: Products > Categories
2. أضف الفئات:
   - ساعات كلاسيكية
   - ساعات إسلامية
   - ساعات رقمية
   - ساعات نسائية
   - ساعات رياضية
```

#### 6.2 أضف المنتجات
```
1. اذهب إلى: Products > Add New
2. ملأ البيانات:
   
   Title:                     اسم المنتج
   Description:               الوصف الكامل
   Featured Image:            الصورة الرئيسية
   Product Details:
   - Product Code:            الكود (مثل: WATCH-001)
   - Price:                   السعر الحالي
   - Original Price:          السعر الأصلي (اختياري)
   - Name (Arabic):           الاسم بالعربية
   - Description (Arabic):    الوصف بالعربية
   - Rating:                  التقييم (1-5)
   
3. انقر "Publish"
```

#### 6.3 أضف صور إضافية
```
1. عند إضافة منتج، انقر "Add Image"
2. اختر صور إضافية
3. سيتم حفظها تلقائياً
```

---

## ⚙️ الإعدادات المتقدمة

### **تثبيت WooCommerce (اختياري)**

```
1. اذهب إلى: Plugins > Add New
2. ابحث عن: WooCommerce
3. انقر: "Install Now"
4. انقر: "Activate"
5. اتبع معالج الإعداد
```

### **تفعيل النسخ الاحتياطية**

```
1. ثبّت إضافة: UpdraftPlus
2. اذهب إلى: Settings > UpdraftPlus
3. انقر: "Backup Now"
4. جدول النسخ الاحتياطية: يومياً
```

### **تحسين الأداء**

```
1. ثبّت إضافة: WP Super Cache
2. فعّلها من: Settings > WP Super Cache
3. انقر: "Caching ON"
```

### **الأمان**

```
1. ثبّت إضافة: Wordfence Security
2. فعّلها من: Plugins
3. اذهب إلى: Wordfence > Firewall
4. فعّل: Firewall Protection
```

---

## 🔍 قائمة التحقق

```
☐ قاعدة البيانات تم إنشاؤها بنجاح
☐ WordPress مثبت وقابل للوصول
☐ ملفات القالب تم رفعها
☐ القالب مفعّل
☐ HTTPS يعمل بشكل صحيح
☐ الفئات تم إضافتها
☐ المنتجات الأولى تم إضافتها
☐ الصور تظهر بشكل صحيح
☐ لوحة التحكم تعمل
☐ النسخ الاحتياطية مفعّلة
```

---

## 🆘 استكشاف الأخطاء

### **خطأ: "Error establishing a database connection"**

**الحل:**
```
1. تحقق من بيانات قاعدة البيانات في wp-config.php
2. تأكد من أن المستخدم له صلاحيات كاملة
3. تحقق من أن MySQL يعمل
4. تأكد من أن اسم قاعدة البيانات صحيح
```

### **خطأ: "404 Not Found"**

**الحل:**
```
1. تأكد من أن ملفات WordPress موجودة
2. أعد تحميل الصفحة
3. تحقق من إعدادات الروابط الثابتة
4. تأكد من أن .htaccess موجود
```

### **خطأ: "Permission Denied"**

**الحل:**
```
1. غيّر صلاحيات الملفات إلى 644
2. غيّر صلاحيات المجلدات إلى 755
3. استخدم FTP: انقر كليك يمين > File Permissions
```

### **الصور لا تظهر**

**الحل:**
```
1. تحقق من أن الصور تم رفعها بشكل صحيح
2. تحقق من مسار الصور في قاعدة البيانات
3. تأكد من صلاحيات مجلد uploads (755)
4. تحقق من أن مجلد uploads موجود
```

### **الموقع بطيء جداً**

**الحل:**
```
1. ثبّت إضافة WP Super Cache
2. قلل عدد المنشورات في الصفحة الرئيسية
3. قلل حجم الصور
4. فعّل Gzip compression من cPanel
```

---

## 📞 معلومات الدعم

| الموضوع | الرابط |
|--------|--------|
| WordPress.org | https://wordpress.org |
| cPanel Documentation | https://cpanel.net/docs/ |
| MySQL Documentation | https://dev.mysql.com/doc/ |
| WooCommerce | https://woocommerce.com |

---

## ✅ الخطوات التالية

بعد التثبيت الناجح:

1. **أضف المنتجات**: ابدأ بإضافة جميع المنتجات
2. **خصّص التصميم**: استخدم Elementor لتخصيص المظهر
3. **فعّل الدفع**: أضف نظام الدفع (WooCommerce)
4. **الترويج**: أضف SEO وتحسينات الأداء
5. **المراقبة**: راقب الإحصائيات والأداء

---

## 📋 معلومات الوصول بعد التثبيت

```
URL الموقع:        https://example.com
لوحة التحكم:       https://example.com/wp-admin
اسم المستخدم:     admin
كلمة المرور:       الكلمة التي اخترتها
البريد الإلكتروني: your-email@example.com

قاعدة البيانات:    momeez_watches_db
مستخدم قاعدة البيانات: momeez_user
كلمة المرور:       الكلمة التي اخترتها
```

---

**تم! موقعك جاهز للعمل! 🎉**

آخر تحديث: ديسمبر 2025
الإصدار: 1.0
