# دليل تثبيت WordPress على cPanel - مميز للساعات

## خطوات التثبيت الكاملة

### **الخطوة 1: إنشاء قاعدة بيانات MySQL على cPanel**

1. ادخل إلى لوحة التحكم **cPanel**
2. ابحث عن **MySQL Databases** أو **phpMyAdmin**
3. أنشئ قاعدة بيانات جديدة:
   - **Database Name**: `momeez_watches_db`
   - **Username**: `momeez_user`
   - **Password**: اختر كلمة مرور قوية (احفظها!)

4. اختر جميع الصلاحيات للمستخدم الجديد

---

### **الخطوة 2: استيراد قاعدة البيانات**

1. افتح **phpMyAdmin** من cPanel
2. اختر قاعدة البيانات الجديدة
3. انقر على **Import**
4. اختر الملف: `wordpress-setup.sql`
5. انقر **Go** لاستيراد الجداول

---

### **الخطوة 3: تحميل ملفات WordPress**

#### **الطريقة 1: باستخدام Softaculous (الأسهل)**
1. من cPanel، ابحث عن **Softaculous Apps Installer**
2. اختر **WordPress**
3. انقر **Install**
4. ملأ البيانات:
   - **Domain**: اختر نطاقك
   - **Directory**: اتركه فارغاً (للتثبيت في الجذر)
   - **Database Name**: `momeez_watches_db`
   - **Database Username**: `momeez_user`
   - **Database Password**: الكلمة التي اخترتها
   - **Admin Username**: `admin`
   - **Admin Password**: كلمة مرور قوية
   - **Admin Email**: بريدك الإلكتروني
5. انقر **Install**

#### **الطريقة 2: التحميل اليدوي عبر FTP**
1. حمّل أحدث نسخة من WordPress من [wordpress.org](https://wordpress.org)
2. استخرج الملفات
3. حمّلها عبر FTP إلى مجلد الجذر في cPanel
4. انسخ ملف `wp-config-sample.php` إلى `wp-config.php`
5. عدّل البيانات:
   ```php
   define('DB_NAME', 'momeez_watches_db');
   define('DB_USER', 'momeez_user');
   define('DB_PASSWORD', 'your_password');
   define('DB_HOST', 'localhost');
   ```

---

### **الخطوة 4: تثبيت القالب المخصص**

1. ادخل إلى **لوحة تحكم WordPress** (yoursite.com/wp-admin)
2. اذهب إلى **Appearance > Themes**
3. انقر **Upload Theme**
4. اختر الملف: `momeez-theme.zip`
5. انقر **Install Now**
6. فعّل القالب

---

### **الخطوة 5: تثبيت الإضافات المطلوبة**

1. اذهب إلى **Plugins > Add New**
2. ثبّت هذه الإضافات:
   - **Advanced Custom Fields (ACF)** - لإدارة حقول مخصصة
   - **WooCommerce** (اختياري) - إذا كنت تريد نظام دفع
   - **Elementor** (اختياري) - لتصميم سهل

---

### **الخطوة 6: نقل البيانات**

#### **نقل الفئات:**
1. اذهب إلى **Products > Categories**
2. أضف الفئات يدوياً أو استخدم الاستيراد

#### **نقل المنتجات:**
1. اذهب إلى **Products > Add New**
2. أضف المنتجات يدوياً أو استخدم ملف CSV للاستيراد

#### **نقل الصور:**
1. اذهب إلى **Media > Add New**
2. حمّل الصور من الموقع القديم

---

### **الخطوة 7: تكوين الإعدادات**

1. اذهب إلى **Settings > General**
   - **Site Title**: مميز للساعات
   - **Tagline**: متجر متخصص في بيع الساعات الفاخرة والإسلامية
   - **WordPress Address**: https://yoursite.com
   - **Site Address**: https://yoursite.com

2. اذهب إلى **Settings > Permalink**
   - اختر: **Post name** (/%postname%/)

3. اذهب إلى **Settings > Discussion**
   - فعّل/عطّل التعليقات حسب احتياجك

---

### **الخطوة 8: تفعيل HTTPS (SSL)**

1. من cPanel، اذهب إلى **AutoSSL** أو **SSL/TLS**
2. فعّل شهادة SSL المجانية
3. أعد تحميل الموقع

---

## ملفات مهمة

| الملف | الوصف |
|------|-------|
| `wordpress-setup.sql` | قاعدة البيانات الجاهزة |
| `momeez-theme.zip` | القالب المخصص |
| `wp-config.php` | ملف التكوين (يُنشأ تلقائياً) |

---

## معلومات الوصول

بعد التثبيت، استخدم هذه البيانات:

- **URL الموقع**: `https://yoursite.com`
- **لوحة التحكم**: `https://yoursite.com/wp-admin`
- **اسم المستخدم**: `admin`
- **كلمة المرور**: الكلمة التي اخترتها

---

## استكشاف الأخطاء

### **خطأ: "Error establishing a database connection"**
- تحقق من بيانات قاعدة البيانات في `wp-config.php`
- تأكد من أن المستخدم له صلاحيات كاملة

### **خطأ: "404 Not Found"**
- تأكد من أن ملفات WordPress موجودة في الجذر
- أعد تحميل الصفحة

### **خطأ: "Permission Denied"**
- غيّر صلاحيات الملفات إلى `755`
- غيّر صلاحيات المجلدات إلى `644`

---

## الخطوات التالية

1. **أضف المنتجات**: ابدأ بإضافة المنتجات من لوحة التحكم
2. **خصّص التصميم**: استخدم Elementor لتخصيص المظهر
3. **فعّل النسخ الاحتياطية**: ثبّت إضافة النسخ الاحتياطية
4. **أضف شهادة SSL**: لتأمين الموقع

---

**تم! موقعك جاهز الآن! 🎉**
