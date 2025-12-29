# دليل النشر الكامل - مميز للساعات على cPanel

## 📋 ملخص الملفات المرفقة

| الملف | الوصف | الحجم |
|------|-------|-------|
| `wordpress-setup.sql` | قاعدة البيانات الجاهزة مع جميع الجداول | ~50 KB |
| `functions.php` | وظائف WordPress المخصصة | ~15 KB |
| `style.css` | أنماط CSS للقالب | ~10 KB |
| `WORDPRESS-CPANEL-GUIDE.md` | دليل التثبيت التفصيلي | - |
| `DEPLOYMENT-GUIDE.md` | هذا الملف | - |

---

## 🚀 خطوات النشر السريعة

### **المرحلة 1: التحضير (15 دقيقة)**

#### 1.1 جهّز بيانات الوصول
```
اسم النطاق: example.com
اسم المستخدم cPanel: cpanel_user
كلمة المرور cPanel: your_password
```

#### 1.2 احصل على بيانات الخادم
```
Host: example.com أو IP address
FTP/SFTP Port: 21 أو 22
MySQL Host: localhost أو 127.0.0.1
```

---

### **المرحلة 2: إنشاء قاعدة البيانات (10 دقائق)**

#### الخطوة 1: ادخل إلى cPanel
```
1. افتح: https://example.com:2083
2. أدخل اسم المستخدم وكلمة المرور
3. انقر "Log In"
```

#### الخطوة 2: أنشئ قاعدة بيانات
```
1. ابحث عن "MySQL Databases"
2. اسم قاعدة البيانات: momeez_watches_db
3. اسم المستخدم: momeez_user
4. كلمة المرور: اختر كلمة قوية (احفظها!)
5. انقر "Create Database"
```

#### الخطوة 3: أضف صلاحيات المستخدم
```
1. في نفس الصفحة، ابحث عن "Add User to Database"
2. اختر المستخدم والقاعدة
3. اختر جميع الصلاحيات
4. انقر "Add User to Database"
```

#### الخطوة 4: استيراد قاعدة البيانات
```
1. افتح phpMyAdmin من cPanel
2. اختر قاعدة البيانات الجديدة
3. انقر على "Import"
4. اختر الملف: wordpress-setup.sql
5. انقر "Go"
```

---

### **المرحلة 3: تثبيت WordPress (20 دقيقة)**

#### الخيار A: استخدام Softaculous (الأسهل)

```
1. من cPanel، ابحث عن "Softaculous Apps Installer"
2. اختر "WordPress"
3. انقر "Install"
4. ملأ البيانات:
   - Domain: اختر نطاقك
   - Directory: اتركه فارغاً
   - Database Name: momeez_watches_db
   - Database Username: momeez_user
   - Database Password: كلمتك
   - Admin Username: admin
   - Admin Password: كلمة قوية
   - Admin Email: بريدك
5. انقر "Install"
```

#### الخيار B: التثبيت اليدوي عبر FTP

```
1. حمّل WordPress من: https://wordpress.org/download/
2. استخرج الملفات
3. اتصل عبر FTP بـ cPanel
4. حمّل الملفات إلى المجلد الجذر (public_html)
5. افتح: https://example.com/wp-admin/setup-config.php
6. ملأ بيانات قاعدة البيانات
7. اتبع خطوات التثبيت
```

---

### **المرحلة 4: تثبيت القالب (10 دقائق)**

#### 4.1 رفع ملفات القالب
```
1. اتصل عبر FTP
2. انتقل إلى: /wp-content/themes/
3. أنشئ مجلد جديد: momeez-theme
4. حمّل الملفات:
   - functions.php
   - style.css
   - index.php (إنشاء ملف جديد - انظر أدناه)
```

#### 4.2 إنشاء ملف index.php
```php
<?php
/**
 * Main template file for Momeez Theme
 */

get_header();
?>

<main class="container">
    <div class="momeez-products-grid">
        <?php
        if (have_posts()) {
            while (have_posts()) {
                the_post();
                get_template_part('template-parts/content', get_post_type());
            }
        }
        ?>
    </div>
</main>

<?php
get_footer();
```

#### 4.3 تفعيل القالب
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
3. Tagline: متجر متخصص في بيع الساعات
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
4. تحقق من: https://example.com
```

---

### **المرحلة 6: نقل البيانات (30 دقيقة)**

#### 6.1 نقل الفئات
```
1. اذهب إلى: Products > Categories
2. أضف الفئات التالية:
   - ساعات كلاسيكية
   - ساعات إسلامية
   - ساعات رقمية
   - ساعات نسائية
   - غيرها...
```

#### 6.2 نقل المنتجات
```
1. اذهب إلى: Products > Add New
2. أضف كل منتج:
   - Title: اسم المنتج
   - Content: الوصف
   - Featured Image: الصورة الرئيسية
   - Category: الفئة
   - Product Details:
     * Product Code: الكود
     * Price: السعر
     * Original Price: السعر الأصلي (اختياري)
     * Name (Arabic): الاسم بالعربية
     * Rating: التقييم
3. انقر "Publish"
```

#### 6.3 نقل الصور الإضافية
```
1. عند إضافة منتج، انقر "Add Image"
2. اختر الصور الإضافية
3. سيتم حفظها تلقائياً
```

---

## ⚙️ تكوينات متقدمة

### **تفعيل النسخ الاحتياطية**
```
1. ثبّت إضافة: UpdraftPlus
2. اذهب إلى: Settings > UpdraftPlus
3. اختر: Backup Now
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

## 🔍 التحقق من التثبيت

### **قائمة التحقق**
```
☐ قاعدة البيانات تم إنشاؤها بنجاح
☐ WordPress مثبت وقابل للوصول
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
```
الحل:
1. تحقق من بيانات قاعدة البيانات في wp-config.php
2. تأكد من أن المستخدم له صلاحيات كاملة
3. تحقق من أن MySQL يعمل
```

### **خطأ: "404 Not Found"**
```
الحل:
1. تأكد من أن ملفات WordPress موجودة
2. أعد تحميل الصفحة
3. تحقق من إعدادات الروابط الثابتة
```

### **خطأ: "Permission Denied"**
```
الحل:
1. غيّر صلاحيات الملفات إلى 644
2. غيّر صلاحيات المجلدات إلى 755
عبر FTP: انقر كليك يمين > File Permissions
```

### **الصور لا تظهر**
```
الحل:
1. تحقق من أن الصور تم رفعها بشكل صحيح
2. تحقق من مسار الصور في قاعدة البيانات
3. تأكد من صلاحيات مجلد uploads
```

---

## 📞 الدعم والمساعدة

### **معلومات الاتصال**
```
البريد الإلكتروني: support@momeez.com
الهاتف: +966 XX XXX XXXX
الموقع: https://momeez.com/support
```

### **موارد مفيدة**
```
- WordPress.org: https://wordpress.org
- cPanel Documentation: https://cpanel.net/docs/
- MySQL Documentation: https://dev.mysql.com/doc/
```

---

## ✅ الخطوات التالية

بعد التثبيت الناجح:

1. **أضف المنتجات**: ابدأ بإضافة جميع المنتجات
2. **خصّص التصميم**: استخدم Elementor لتخصيص المظهر
3. **فعّل الدفع**: أضف نظام الدفع (WooCommerce)
4. **الترويج**: أضف SEO وتحسينات الأداء
5. **المراقبة**: راقب الإحصائيات والأداء

---

**تم! موقعك جاهز للعمل! 🎉**

آخر تحديث: ديسمبر 2025
