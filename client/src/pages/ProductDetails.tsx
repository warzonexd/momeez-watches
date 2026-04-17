import { trpc } from "@/lib/trpc";
import { useParams, useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Star, 
  MessageCircle, 
  ArrowRight, 
  Package, 
  Shield, 
  Truck, 
  Clock,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from "lucide-react";
import { useState } from "react";
import ImageLightbox from "@/components/ImageLightbox";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewsList } from "@/components/ReviewsList";
import { RatingDisplay } from "@/components/RatingDisplay";

const WHATSAPP_NUMBER = "905343222221";

export default function ProductDetails() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const productId = parseInt(params.id || "0");

  const { data: product, isLoading } = trpc.products.getById.useQuery({ id: productId });
  const { data: productImages } = trpc.productImages.getByProduct.useQuery(
    { productId },
    { enabled: !!productId }
  );
  const { data: categories } = trpc.categories.list.useQuery();
  const { data: allProducts } = trpc.products.list.useQuery();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل المنتج...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">المنتج غير موجود</h2>
          <Button onClick={() => setLocation("/")}>العودة للرئيسية</Button>
        </div>
      </div>
    );
  }

  // Combine all images
  const allImages = [
    ...(product.imageUrl ? [{ id: 0, imageUrl: product.imageUrl, isPrimary: 1 }] : []),
    ...(productImages || []),
  ];

  const currentImage = allImages[selectedImageIndex];

  // Get similar products from same category
  const similarProducts = allProducts
    ?.filter(p => p.categoryId === product.categoryId && p.id !== product.id && p.isActive)
    ?.slice(0, 4) || [];

  const category = categories?.find(c => c.id === product.categoryId);

  const sendWhatsAppMessage = () => {
    let message = `مرحباً، أرغب في الاستفسار عن:\n\n`;
    message += `📦 ${product.nameAr}\n`;
    if (product.productCode) {
      message += `🔖 الكود: ${product.productCode}\n`;
    }
    message += `💵 السعر: $${product.price}\n`;
    if (product.descriptionAr) {
      message += `📝 الوصف: ${product.descriptionAr}`;
    }
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const openLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-800 to-teal-700 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <img 
                src="/mumayyazwatchأزرق.webp" 
                alt="مميز للساعات" 
                className="h-12 cursor-pointer"
              />
            </Link>
            <Button
              variant="outline"
              onClick={() => setLocation("/")}
              className="bg-white/10 hover:bg-white/20 text-white border-white/30"
            >
              <ArrowRight className="w-4 h-4 ml-2" />
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer" onClick={openLightbox}>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              )}

              {/* Zoom Button */}
              <div className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <ZoomIn className="w-5 h-5" />
              </div>

              {currentImage?.imageUrl ? (
                <img
                  src={currentImage.imageUrl}
                  alt={product.nameAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Package className="w-32 h-32 text-gray-300" />
                </div>
              )}

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(index);
                    }}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      index === selectedImageIndex
                        ? "border-teal-600 ring-2 ring-teal-300"
                        : "border-gray-200 hover:border-teal-400"
                    }`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={`${product.nameAr} - صورة ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <ImageLightbox
              images={allImages}
              initialIndex={selectedImageIndex}
              isOpen={isLightboxOpen}
              onClose={() => setIsLightboxOpen(false)}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            {category && (
              <div className="inline-block">
                <span className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-semibold">
                  {category.nameAr}
                </span>
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-gray-900">{product.nameAr}</h1>

            {/* Product Code */}
            {product.productCode && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">كود المنتج:</span>
                <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded">
                  {product.productCode}
                </span>
              </div>
            )}

            {/* Rating */}
            <div>
              <RatingDisplay productId={productId} size="lg" />
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6">
              {product.originalPrice && product.originalPrice > product.price ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-red-600">
                      ${product.price}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-green-700 font-semibold">
                    وفّر ${product.originalPrice - product.price}!
                  </p>
                </div>
              ) : (
                <span className="text-3xl font-bold text-teal-800">
                  ${product.price}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">الوصف</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.descriptionAr || product.description || "لا يوجد وصف متاح"}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Truck className="w-6 h-6 text-teal-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">شحن سريع</p>
                  <p className="text-sm text-gray-600">توصيل عالمي</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-teal-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">ضمان الجودة</p>
                  <p className="text-sm text-gray-600">منتج أصلي</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-teal-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">دعم 24/7</p>
                  <p className="text-sm text-gray-600">خدمة العملاء</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Package className="w-6 h-6 text-teal-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">تغليف فاخر</p>
                  <p className="text-sm text-gray-600">هدية مثالية</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <Button
              onClick={sendWhatsAppMessage}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-6 h-6 ml-2" />
              اطلب عبر واتساب
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            المراجعات والتقييمات
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ReviewForm productId={productId} />
            </div>
            <div className="lg:col-span-2">
              <ReviewsList productId={productId} />
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              منتجات مشابهة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <Card
                  key={similarProduct.id}
                  className="group hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden hover:border-teal-300 cursor-pointer"
                  onClick={() => setLocation(`/product/${similarProduct.id}`)}
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    {similarProduct.originalPrice && similarProduct.originalPrice > similarProduct.price && (
                      <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        خصم {Math.round(((similarProduct.originalPrice - similarProduct.price) / similarProduct.originalPrice) * 100)}%
                      </div>
                    )}
                    {similarProduct.imageUrl ? (
                      <img
                        src={similarProduct.imageUrl}
                        alt={similarProduct.nameAr}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-24 h-24 text-gray-300" />
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    {similarProduct.productCode && (
                      <div className="text-center mb-2">
                        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {similarProduct.productCode}
                        </span>
                      </div>
                    )}
                    <h3 className="font-bold text-xl text-gray-900 mb-3 text-center line-clamp-1">
                      {similarProduct.nameAr}
                    </h3>

                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (similarProduct.rating || 5)
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="text-center mb-4">
                      {similarProduct.originalPrice && similarProduct.originalPrice > similarProduct.price ? (
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500 line-through">
                            ${similarProduct.originalPrice}
                          </p>
                          <p className="text-2xl font-bold text-red-600">
                            ${similarProduct.price}
                          </p>
                        </div>
                      ) : (
                        <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                          ${similarProduct.price}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-teal-800 to-teal-700 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
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
    </div>
  );
}
