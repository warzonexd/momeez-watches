import { Button } from "@/components/ui/button";
import { Clock, Target, Eye, Heart } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 text-white py-6 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <img src="/logo.webp" alt="مميز للساعات" className="h-12 cursor-pointer drop-shadow-lg" />
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                العودة للرئيسية
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-teal-50 to-cyan-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-teal-800 mb-6">من نحن</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            مرحباً بكم في **مميز للساعات** - وجهتكم المثالية للساعات الإسلامية الفاخرة والتصاميم العصرية التي تجمع بين الأصالة والحداثة
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-10 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">قصتنا</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                بدأت رحلتنا من شغف عميق بالساعات الفاخرة والتصاميم الإسلامية الأنيقة. أردنا أن نقدم للعالم العربي والإسلامي مجموعة متميزة من الساعات التي تعكس هويتنا وثقافتنا، مع الحفاظ على أعلى معايير الجودة والأناقة.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                اليوم، نفخر بتقديم مجموعة واسعة من الساعات الكلاسيكية، الإسلامية، الرقمية، والنسائية، بالإضافة إلى الخواتم الإسلامية المميزة. كل قطعة نقدمها تم اختيارها بعناية فائقة لتلبي توقعات عملائنا الكرام.
              </p>
            </div>

            {/* Vision & Mission */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">رؤيتنا</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  أن نكون الوجهة الأولى في العالم العربي للساعات الإسلامية الفاخرة والتصاميم العصرية، ونشر ثقافة الأناقة الإسلامية في كل بيت.
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">رسالتنا</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  تقديم منتجات عالية الجودة بأسعار منافسة، مع خدمة عملاء متميزة وتوصيل سريع إلى جميع أنحاء العالم، لنكون شركاء النجاح في كل مناسبة.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="bg-white rounded-3xl shadow-xl p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">قيمنا</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl">
                  <h4 className="font-bold text-xl text-teal-800 mb-2">الجودة</h4>
                  <p className="text-gray-600">نلتزم بأعلى معايير الجودة في كل منتج نقدمه</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl">
                  <h4 className="font-bold text-xl text-amber-800 mb-2">الأمانة</h4>
                  <p className="text-gray-600">الصدق والشفافية في التعامل مع عملائنا</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl">
                  <h4 className="font-bold text-xl text-rose-800 mb-2">التميز</h4>
                  <p className="text-gray-600">نسعى دائماً لتقديم الأفضل والأجمل</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">هل أنت مستعد لاكتشاف مجموعتنا؟</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            تصفح مجموعتنا الواسعة من الساعات والخواتم الإسلامية المميزة
          </p>
          <Link href="/">
            <Button size="lg" className="bg-white text-teal-800 hover:bg-teal-50 shadow-lg hover:shadow-xl transition-all text-lg px-8 py-6">
              تصفح المنتجات
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
