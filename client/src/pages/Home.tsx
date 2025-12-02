import { trpc } from "@/lib/trpc";
import { MessageCircle, Clock, Shield, Truck, Sparkles, Watch, Gem, Smartphone, Crown, LayoutGrid, Menu, X, Sparkle, Star, Facebook, Send, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import ImageLightbox from "@/components/ImageLightbox";

const WHATSAPP_NUMBER = "905343222221";

export default function Home() {
  const { data: products, isLoading } = trpc.products.list.useQuery();
  const { data: categories } = trpc.categories.list.useQuery();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getProductsByCategory = (categoryId: number) => {
    return products?.filter((p) => p.categoryId === categoryId && p.isActive) || [];
  };

  const getFilteredProducts = () => {
    let filtered = products?.filter(p => p.isActive) || [];
    
    // Filter by category
    if (selectedCategory !== null) {
      filtered = filtered.filter(p => p.categoryId === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.nameAr.toLowerCase().includes(query) || 
        p.name.toLowerCase().includes(query) ||
        (p.descriptionAr && p.descriptionAr.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  const sendWhatsAppMessage = (product: any) => {
    let message = `مرحباً، أرغب في الاستفسار عن:

`;
    message += `📦 ${product.nameAr}
`;
    if (product.productCode) {
      message += `🔖 الكود: ${product.productCode}
`;
    }
    message += `💵 السعر: $${product.price}
`;
    if (product.descriptionAr) {
      message += `📝 الوصف: ${product.descriptionAr}`;
    }
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const totalProducts = products?.filter(p => p.isActive).length || 0;

  const categoryIcons = [
    { 
      id: 1, 
      name: "ساعات كلاسيكية", 
      icon: Watch, 
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200 hover:border-blue-400"
    },
    { 
      id: 2, 
      name: "ساعات إسلامية", 
      icon: Crown, 
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200 hover:border-purple-400"
    },
    { 
      id: 3, 
      name: "ساعات رقمية", 
      icon: Smartphone, 
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200 hover:border-green-400"
    },
    { 
      id: 4, 
      name: "ساعات نسائية", 
      icon: Gem, 
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-rose-50 to-pink-50",
      borderColor: "border-rose-200 hover:border-rose-400"
    },
    { 
      id: 5, 
      name: "خواتم إسلامية", 
      icon: Sparkle, 
      gradient: "from-amber-500 to-yellow-500",
      bgGradient: "from-amber-50 to-yellow-50",
      borderColor: "border-amber-200 hover:border-amber-400"
    }
  ];

  const navItems = [
    { href: "#", label: "الرئيسية", active: true, isExternal: false },
    { href: "#features", label: "المميزات", active: false, isExternal: false },
    { href: "#products", label: "المنتجات", active: false, isExternal: false },
    { href: "/about", label: "من نحن", active: false, isExternal: true },
    { href: "/faq", label: "الأسئلة الشائعة", active: false, isExternal: true },
    { href: "#contact", label: "اتصل بنا", active: false, isExternal: false }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm backdrop-blur-lg bg-white/90">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.webp" alt="مميز للساعات" className="h-12" />
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <Input
                type="search"
                placeholder="ابحث عن منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                item.isExternal ? (
                  <Link key={item.href} href={item.href}>
                    <span className="text-gray-700 hover:text-teal-700 transition-colors cursor-pointer">
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className={item.active ? "text-teal-700 font-semibold hover:text-teal-900 transition-colors" : "text-gray-700 hover:text-teal-700 transition-colors"}
                  >
                    {item.label}
                  </a>
                )
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                item.isExternal ? (
                  <Link key={item.href} href={item.href}>
                    <span
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors rounded-lg cursor-pointer"
                    >
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors rounded-lg"
                  >
                    {item.label}
                  </a>
                )
              ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-teal-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Right Side - Text */}
            <div className="order-2 md:order-1 text-center md:text-right">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-800 to-teal-600 bg-clip-text text-transparent mb-6 leading-tight">
                مميز للساعات المميزة
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                اكتشف مجموعتنا الفريدة من الساعات الإسلامية الفاخرة مع مواقيت الصلاة والتصاميم الأنيقة التي تجمع بين الأصالة والحداثة
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button
                  onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                  size="lg"
                  className="bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 text-white shadow-lg text-lg px-8 py-6"
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
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl aspect-square max-w-md mx-auto ring-4 ring-teal-500/20">
                <img
                  src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=800&fit=crop"
                  alt="ساعة فاخرة"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-teal-700 to-teal-600 text-white rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-2xl ring-4 ring-white">
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
                icon: Clock,
                title: "مواقيت الصلاة الدقيقة",
                desc: "جميع ساعاتنا مزودة بمواقيت الصلاة المبرمجة مسبقاً لجميع المدن",
                gradient: "from-amber-500 to-orange-500",
                bg: "from-amber-50 to-orange-50"
              },
              {
                icon: Shield,
                title: "ضمان الجودة",
                desc: "نقدم ضمان شامل على جميع منتجاتنا مع خدمة ما بعد البيع",
                gradient: "from-rose-500 to-red-500",
                bg: "from-rose-50 to-red-50"
              },
              {
                icon: Truck,
                title: "توصيل سريع",
                desc: "توصيل إلى كافة أنحاء العالم خلال 3-5 أيام عمل",
                gradient: "from-blue-500 to-cyan-500",
                bg: "from-blue-50 to-cyan-50"
              },
              {
                icon: Sparkles,
                title: "تصاميم حصرية",
                desc: "تصاميم إسلامية أنيقة تجمع بين الأصالة والعصرية",
                gradient: "from-purple-500 to-pink-500",
                bg: "from-purple-50 to-pink-50"
              }
            ].map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div key={idx} className="text-center group">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section id="products" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">تصفح حسب الفئة</h2>
            <p className="text-gray-600 text-lg">اختر الفئة المناسبة لك</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-8 py-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-gradient-to-r from-teal-700 to-teal-600 text-white border-teal-700 shadow-lg scale-105"
                  : "bg-white text-gray-700 border-gray-200 hover:border-teal-500 hover:shadow-md"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <LayoutGrid className="w-8 h-8" />
                <span className="font-semibold">الكل</span>
              </div>
            </button>

            {categoryIcons.map((cat) => {
              const IconComponent = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-8 py-4 rounded-2xl border-2 transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-teal-700 to-teal-600 text-white border-teal-700 shadow-lg scale-105"
                      : `bg-gradient-to-br ${cat.bgGradient} ${cat.borderColor} hover:shadow-md`
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`${isSelected ? '' : `bg-gradient-to-br ${cat.gradient} bg-clip-text text-transparent`}`}>
                      <IconComponent className={`w-8 h-8 ${isSelected ? 'text-white' : ''}`} style={!isSelected ? {stroke: 'url(#gradient)'} : {}} />
                    </div>
                    <span className="font-semibold">{cat.name}</span>
                  </div>
                </button>
              );
            })}
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
                  className="group hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden hover:border-teal-300 cursor-pointer"
                  onClick={() => window.location.href = `/product/${product.id}`}
                >
                  <ProductImageGallery product={product} />

                  <CardContent className="p-6">
                    {product.productCode && (
                      <div className="text-center mb-2">
                        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {product.productCode}
                        </span>
                      </div>
                    )}
                    <h3 className="font-bold text-xl text-gray-900 mb-3 text-center line-clamp-1">{product.nameAr}</h3>
                    
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < (product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    
                    <div className="text-center mb-4">
                      {product.originalPrice && product.originalPrice > product.price ? (
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                          <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">${product.price}</span>
                        </div>
                      ) : (
                        <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">${product.price}</span>
                      )}
                    </div>

                    {product.descriptionAr && (
                      <p className="text-sm text-gray-600 mb-4 text-center line-clamp-2">{product.descriptionAr}</p>
                    )}

                    <Button
                      onClick={() => sendWhatsAppMessage(product)}
                      className="w-full bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      اطلب عبر واتساب
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {getFilteredProducts().length === 0 && !isLoading && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-10 h-10 text-gray-400" />
              </div>
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
          <p className="text-teal-100 mb-6 text-lg">تواصل معنا عبر واتساب للطلب والاستفسار</p>
          <Button
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank")}
            className="bg-white text-teal-800 hover:bg-teal-50 shadow-lg hover:shadow-xl transition-all mb-8"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {WHATSAPP_NUMBER}
          </Button>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <a href="https://www.facebook.com/mumyazwatchs" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://www.tiktok.com/@mumayyaz_watches" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
            <a href="https://chat.whatsapp.com/ISgQOEO5USa4SF3hBEPDYP" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
              <MessageCircle className="w-6 h-6" />
            </a>
            <a href="https://t.me/MUMAYYAZ_WATCHES" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
              <Send className="w-6 h-6" />
            </a>
          </div>
          
          <p className="text-teal-200">جميع الحقوق محفوظة © 2024 - مميز للساعات</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all hover:scale-110 animate-bounce"
        aria-label="تواصل عبر واتساب"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </a>

      {/* SVG Gradients for Icons */}
      <svg width="0" height="0" style={{position: 'absolute'}}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" />
            <stop offset="100%" stopColor="currentColor" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ProductImageGallery({ product }: { product: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const { data: productImages } = trpc.productImages.getByProduct.useQuery(
    { productId: product.id },
    { enabled: !!product.id }
  );

  // Combine primary image with additional images
  const allImages = [
    ...(product.imageUrl ? [{ id: 0, imageUrl: product.imageUrl, isPrimary: 1 }] : []),
    ...(productImages || []),
  ];

  const hasMultipleImages = allImages.length > 1;

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const openLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLightboxOpen(true);
  };

  const currentImage = allImages[currentImageIndex];

  return (
    <>
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 group">
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}

        {/* Zoom Button */}
        <button
          onClick={openLightbox}
          className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          aria-label="تكبير الصورة"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {currentImage?.imageUrl ? (
          <img
            src={currentImage.imageUrl}
            alt={product.nameAr}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Watch className="w-24 h-24 text-gray-300" />
          </div>
        )}

      {hasMultipleImages && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="الصورة السابقة"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
          <button
            onClick={nextImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="الصورة التالية"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`الصورة ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
      </div>

      <ImageLightbox
        images={allImages}
        initialIndex={currentImageIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}
