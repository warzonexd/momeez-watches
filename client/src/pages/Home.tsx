import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, ShoppingCart, Watch } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { data: products, isLoading: productsLoading } = trpc.products.list.useQuery();
  const { data: categories, isLoading: categoriesLoading } = trpc.categories.list.useQuery();
  const [whatsappNumber] = useState("966500000000"); // Default WhatsApp number

  const isLoading = productsLoading || categoriesLoading;

  const getProductsByCategory = (categoryId: number) => {
    return products?.filter((p) => p.categoryId === categoryId && p.isActive === 1) || [];
  };

  const handleWhatsAppOrder = (product: any) => {
    const message = `مرحباً، أود طلب المنتج التالي:\n\nالاسم: ${product.nameAr}\nالسعر: ${product.price} ريال\n\nالوصف: ${product.descriptionAr || "لا يوجد وصف"}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Watch className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold">مميز للساعات</h1>
                <p className="text-slate-300 text-sm">أفخم تشكيلة ساعات في المملكة</p>
              </div>
            </div>
            <a href="/admin" className="text-sm hover:underline">
              لوحة التحكم
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            اكتشف عالم الساعات الفاخرة
          </h2>
          <p className="text-xl text-amber-50 mb-8">
            تشكيلة متنوعة من الساعات الكلاسيكية والإسلامية والرقمية والنسائية
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => {
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            تصفح المنتجات
          </Button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
            </div>
          ) : (
            <div className="space-y-20">
              {categories?.map((category) => {
                const categoryProducts = getProductsByCategory(category.id);
                if (categoryProducts.length === 0) return null;

                return (
                  <div key={category.id} id={category.slug}>
                    {/* Category Header */}
                    <div className="text-center mb-12">
                      <h2 className="text-4xl font-bold text-slate-900 mb-3">
                        {category.nameAr}
                      </h2>
                      <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {categoryProducts.map((product) => (
                        <Card
                          key={product.id}
                          className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-slate-200"
                        >
                          <div className="aspect-square bg-slate-100 relative overflow-hidden">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.nameAr}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Watch className="w-20 h-20 text-slate-300" />
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">
                              {product.nameAr}
                            </h3>
                            {product.descriptionAr && (
                              <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                                {product.descriptionAr}
                              </p>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-amber-600">
                                {product.price} <span className="text-lg">ريال</span>
                              </span>
                              <Button
                                size="sm"
                                onClick={() => handleWhatsAppOrder(product)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <ShoppingCart className="w-4 h-4 ml-2" />
                                اطلب الآن
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!isLoading && products?.length === 0 && (
            <div className="text-center py-20">
              <Watch className="w-20 h-20 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-700 mb-2">لا توجد منتجات حالياً</h3>
              <p className="text-slate-500">سيتم إضافة المنتجات قريباً</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Watch className="w-6 h-6" />
            <span className="text-xl font-bold">مميز للساعات</span>
          </div>
          <p className="text-slate-400">جميع الحقوق محفوظة © 2024</p>
        </div>
      </footer>
    </div>
  );
}
