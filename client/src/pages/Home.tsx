import { trpc } from "@/lib/trpc";
import { MessageCircle, Clock, Shield, Truck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const WHATSAPP_NUMBER = "905343222221";

export default function Home() {
  const { data: products, isLoading } = trpc.products.list.useQuery();
  const { data: categories } = trpc.categories.list.useQuery();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const getProductsByCategory = (categoryId: number) => {
    return products?.filter((p) => p.categoryId === categoryId && p.isActive) || [];
  };

  const getFilteredProducts = () => {
    if (selectedCategory === null) return products?.filter(p => p.isActive) || [];
    return getProductsByCategory(selectedCategory);
  };

  const sendWhatsAppMessage = (product: any) => {
    const message = `مرحباً، أرغب في الاستفسار عن:\n\n📦 ${product.name}\n💵 السعر: $${product.price}\n📝 الوصف: ${product.description}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const totalProducts = products?.filter(p => p.isActive).length || 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.webp" alt="مميز للساعات" className="h-12" />
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-teal-700 font-semibold hover:text-teal-900 transition-colors">
                الرئيسية
              </a>
              <a href="#features" className="text-gray-700 hover:text-teal-700 transition-colors">
                المميزات
              </a>
              <a href="#products" className="text-gray-700 hover:text-teal-700 transition-colors">
                المنتجات
              </a>
              <a href="#contact" className="text-gray-700 hover:text-teal-700 transition-colors">
                اتصل بنا
              </a>
            </nav>
            <a
              href="/admin-login"
              className="text-sm text-gray-600 hover:text-teal-700 transition-colors"
            >
              لوحة التحكم
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Right Side - Text */}
            <div className="order-2 md:order-1 text-center md:text-right">
              <h1 className="text-5xl md:text-6xl font-bold text-teal-800 mb-6 leading-tight">
                مميز للساعات المميزة
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                اكتشف مجموعتنا الفريدة من الساعات الإسلامية الفاخرة مع مواقيت الصلاة والتصاميم الأنيقة التي تجمع بين الأصالة والحداثة
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-end">
                <Button
                  onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                  size="lg"
                  className="bg-teal-700 hover:bg-teal-800 text-white shadow-lg text-lg px-8 py-6"
                >
                  تصفح المنتجات
                </Button>
                <Button
                  onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank")}
                  size="lg"
                  variant="outline"
                  className="border-2 border-teal-700 text-teal-700 hover:bg-teal-50 text-lg px-8 py-6"
                >
                  تواصل معنا
                </Button>
              </div>
            </div>

            {/* Left Side - Watch Image */}
            <div className="order-1 md:order-2 relative">
              <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl aspect-square max-w-md mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=800&fit=crop"
                  alt="ساعة فاخرة"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-teal-700 text-white rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-xl">
                <div className="text-4xl font-bold">+{totalProducts}</div>
                <div className="text-sm">موديل متنوع</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">لماذا تختار مميز؟</h2>
            <p className="text-gray-600 text-lg">نقدم لك أفضل الساعات الإسلامية بجودة عالية وخدمة متميزة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: "مواقيت الصلاة الدقيقة",
                desc: "جميع ساعاتنا مزودة بمواقيت الصلاة المبرمجة مسبقاً لجميع المدن",
                color: "bg-amber-100 text-amber-700"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "ضمان الجودة",
                desc: "نقدم ضمان شامل على جميع منتجاتنا مع خدمة ما بعد البيع",
                color: "bg-rose-100 text-rose-700"
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "توصيل سريع",
                desc: "توصيل مجاني لجميع أنحاء المملكة خلال 3-5 أيام عمل",
                color: "bg-blue-100 text-blue-700"
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "تصاميم حصرية",
                desc: "تصاميم إسلامية أنيقة تجمع بين الأصالة والعصرية",
                color: "bg-purple-100 text-purple-700"
              }
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-20 h-20 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">تصفح حسب الفئة</h2>
            <p className="text-gray-600 text-lg">اختر الفئة المناسبة لك</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-8 py-4 rounded-2xl border-2 transition-all ${
                selectedCategory === null
                  ? "bg-teal-700 text-white border-teal-700 shadow-lg"
                  : "bg-white text-gray-700 border-gray-200 hover:border-teal-700"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">🔲</span>
                <span className="font-semibold">الكل</span>
              </div>
            </button>

            {[
              { id: 1, name: "ساعات كلاسيكية", icon: "⌚", color: "bg-blue-50 border-blue-200 hover:border-blue-500" },
              { id: 2, name: "ساعات إسلامية", icon: "🕌", color: "bg-purple-50 border-purple-200 hover:border-purple-500" },
              { id: 3, name: "ساعات رقمية", icon: "📱", color: "bg-green-50 border-green-200 hover:border-green-500" },
              { id: 4, name: "ساعات نسائية", icon: "💎", color: "bg-pink-50 border-pink-200 hover:border-pink-500" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-8 py-4 rounded-2xl border-2 transition-all ${
                  selectedCategory === cat.id
                    ? "bg-teal-700 text-white border-teal-700 shadow-lg"
                    : `${cat.color}`
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="font-semibold">{cat.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-4">منتجاتنا المميزة</h3>
            <p className="text-center text-gray-600 mb-12">اختر من مجموعتنا الحصرية من الساعات الإسلامية</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-teal-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">جاري تحميل المنتجات...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getFilteredProducts().map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-8xl opacity-20">⌚</div>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-3 text-center">{product.name}</h3>
                    
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-amber-600">${product.price}</span>
                    </div>

                    {product.description && (
                      <ul className="text-sm text-gray-600 mb-4 space-y-1">
                        {product.description.split('\n').slice(0, 3).map((line, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-teal-600 mt-1">✓</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Button
                      onClick={() => sendWhatsAppMessage(product)}
                      className="w-full bg-teal-700 hover:bg-teal-800 text-white shadow-md hover:shadow-lg transition-all"
                    >
                      <MessageCircle className="w-4 h-4 ml-2" />
                      اطلب عبر واتساب
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {getFilteredProducts().length === 0 && !isLoading && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-600 text-lg">لا توجد منتجات في هذه الفئة حالياً</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src="/logo.webp" alt="مميز للساعات" className="h-16 drop-shadow-lg" />
          </div>
          <p className="text-teal-100 mb-4 text-lg">تواصل معنا عبر واتساب للطلب والاستفسار</p>
          <Button
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank")}
            className="bg-white text-teal-800 hover:bg-teal-50 shadow-lg hover:shadow-xl transition-all"
          >
            <MessageCircle className="w-4 h-4 ml-2" />
            {WHATSAPP_NUMBER}
          </Button>
          <p className="text-teal-200 mt-8">جميع الحقوق محفوظة © 2024 - مميز للساعات</p>
        </div>
      </footer>
    </div>
  );
}
