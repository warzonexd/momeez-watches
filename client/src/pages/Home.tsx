import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, ShoppingCart, Watch } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { data: products, isLoading: productsLoading } = trpc.products.list.useQuery();
  const { data: categories, isLoading: categoriesLoading } = trpc.categories.list.useQuery();
  const [whatsappNumber] = useState("905343222221"); // WhatsApp number

  const isLoading = productsLoading || categoriesLoading;

  const getProductsByCategory = (categoryId: number) => {
    return products?.filter((p) => p.categoryId === categoryId && p.isActive === 1) || [];
  };

  const handleWhatsAppOrder = (product: any) => {
    const message = `مرحباً، أود طلب المنتج التالي:\n\nالاسم: ${product.nameAr}\nالسعر: $${product.price}\n\nالوصف: ${product.descriptionAr || "لا يوجد وصف"}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-900 to-green-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.webp" alt="مميز للساعات" className="h-16" />
            </div>
            <a href="/admin-login" className="text-sm hover:underline">
              لوحة التحكم
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            اكتشف عالم الساعات الفاخرة
          </h2>
          <p className="text-xl text-green-50 mb-8">
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
              <Loader2 className="w-12 h-12 animate-spin text-green-700" />
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
                      <div className="w-24 h-1 bg-green-600 mx-auto"></div>
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
                              <span className="text-2xl font-bold text-green-700">
                                ${product.price}
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
      <footer className="bg-green-900 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/logo.webp" alt="مميز للساعات" className="h-12" />
          </div>
          <p className="text-green-200">جميع الحقوق محفوظة © 2024</p>
        </div>
      </footer>
    </div>
  );
}
