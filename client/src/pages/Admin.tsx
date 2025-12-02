import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [isSimpleAuthChecked, setIsSimpleAuthChecked] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Fetch data - MUST be before any conditional returns
  const { data: products, isLoading: productsLoading, refetch: refetchProducts } = trpc.products.list.useQuery();
  const { data: categories, isLoading: categoriesLoading } = trpc.categories.list.useQuery();

  // Mutations - MUST be before any conditional returns
  const createMutation = trpc.products.create.useMutation({
    onSuccess: () => {
      toast.success("تم إضافة المنتج بنجاح");
      setIsAddDialogOpen(false);
      refetchProducts();
    },
    onError: (error) => {
      toast.error("فشل في إضافة المنتج: " + error.message);
    },
  });

  const updateMutation = trpc.products.update.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث المنتج بنجاح");
      setIsEditDialogOpen(false);
      setEditingProduct(null);
      refetchProducts();
    },
    onError: (error) => {
      toast.error("فشل في تحديث المنتج: " + error.message);
    },
  });

  const deleteMutation = trpc.products.delete.useMutation({
    onSuccess: () => {
      toast.success("تم حذف المنتج بنجاح");
      refetchProducts();
    },
    onError: (error) => {
      toast.error("فشل في حذف المنتج: " + error.message);
    },
  });

  const uploadImageMutation = trpc.products.uploadImage.useMutation({
    onError: (error) => {
      toast.error("فشل في رفع الصورة: " + error.message);
    },
  });

  // Check authentication - useEffect AFTER all hooks
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (!isLoggedIn) {
      setLocation("/admin-login");
    } else {
      setIsSimpleAuthChecked(true);
    }
  }, [setLocation]);

  // Conditional returns AFTER all hooks
  if (!isSimpleAuthChecked || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setLocation("/admin-login");
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      try {
        const result = await uploadImageMutation.mutateAsync({
          base64Data,
          mimeType: file.type,
        });
        callback(result.url);
        toast.success("تم رفع الصورة بنجاح");
      } catch (error) {
        // Error already handled by mutation
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const originalPriceStr = formData.get("originalPrice") as string;
    
    createMutation.mutate({
      name: formData.get("name") as string,
      nameAr: formData.get("nameAr") as string,
      description: formData.get("description") as string,
      descriptionAr: formData.get("descriptionAr") as string,
      price: parseInt(formData.get("price") as string),
      originalPrice: originalPriceStr ? parseInt(originalPriceStr) : undefined,
      categoryId: parseInt(formData.get("categoryId") as string),
      imageUrl: formData.get("imageUrl") as string,
    });
  };

  const handleEditProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const originalPriceStr = formData.get("originalPrice") as string;
    
    updateMutation.mutate({
      id: editingProduct.id,
      name: formData.get("name") as string,
      nameAr: formData.get("nameAr") as string,
      description: formData.get("description") as string,
      descriptionAr: formData.get("descriptionAr") as string,
      price: parseInt(formData.get("price") as string),
      originalPrice: originalPriceStr ? parseInt(originalPriceStr) : undefined,
      categoryId: parseInt(formData.get("categoryId") as string),
      imageUrl: formData.get("imageUrl") as string,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      deleteMutation.mutate({ id });
    }
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories?.find((c) => c.id === categoryId);
    return category?.nameAr || "غير معروف";
  };

  return (
    <DashboardLayout>
      <div className="container py-4 md:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">إدارة المنتجات</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={handleLogout} className="flex-1 sm:flex-none">
              تسجيل الخروج
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 sm:flex-none">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة منتج
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>إضافة منتج جديد</DialogTitle>
                </DialogHeader>
                <ProductForm
                  onSubmit={handleAddProduct}
                  categories={categories || []}
                  onImageUpload={handleImageUpload}
                  isLoading={createMutation.isPending}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {productsLoading || categoriesLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الصورة</TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead>الفئة</TableHead>
                    <TableHead>السعر</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products?.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.nameAr}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center text-xs">
                            لا توجد صورة
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{product.nameAr}</TableCell>
                      <TableCell>{getCategoryName(product.categoryId)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {product.originalPrice && product.originalPrice > product.price ? (
                            <>
                              <span className="text-sm line-through text-muted-foreground">
                                ${product.originalPrice}
                              </span>
                              <span className="font-semibold text-red-600">
                                ${product.price}
                              </span>
                            </>
                          ) : (
                            <span className="font-semibold">${product.price}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingProduct(product);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {products?.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.nameAr}
                          className="w-20 h-20 object-cover rounded flex-shrink-0"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-muted rounded flex items-center justify-center text-xs flex-shrink-0">
                          لا توجد صورة
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">{product.nameAr}</h3>
                        <p className="text-sm text-muted-foreground">{getCategoryName(product.categoryId)}</p>
                        <div className="mt-2">
                          {product.originalPrice && product.originalPrice > product.price ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm line-through text-muted-foreground">
                                ${product.originalPrice}
                              </span>
                              <span className="font-semibold text-red-600">
                                ${product.price}
                              </span>
                            </div>
                          ) : (
                            <span className="font-semibold">${product.price}</span>
                          )}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingProduct(product);
                              setIsEditDialogOpen(true);
                            }}
                            className="flex-1"
                          >
                            <Pencil className="w-4 h-4 ml-1" />
                            تعديل
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                            className="flex-1"
                          >
                            <Trash2 className="w-4 h-4 ml-1" />
                            حذف
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>تعديل المنتج</DialogTitle>
            </DialogHeader>
            {editingProduct && (
              <ProductForm
                onSubmit={handleEditProduct}
                categories={categories || []}
                onImageUpload={handleImageUpload}
                isLoading={updateMutation.isPending}
                initialData={editingProduct}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

function ProductForm({
  onSubmit,
  categories,
  onImageUpload,
  isLoading,
  initialData,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  categories: any[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => void;
  isLoading: boolean;
  initialData?: any;
}) {
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">الاسم (English)</Label>
          <Input
            id="name"
            name="name"
            required
            defaultValue={initialData?.name}
          />
        </div>
        <div>
          <Label htmlFor="nameAr">الاسم (عربي)</Label>
          <Input
            id="nameAr"
            name="nameAr"
            required
            defaultValue={initialData?.nameAr}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="description">الوصف (English)</Label>
          <Textarea
            id="description"
            name="description"
            required
            defaultValue={initialData?.description}
          />
        </div>
        <div>
          <Label htmlFor="descriptionAr">الوصف (عربي)</Label>
          <Textarea
            id="descriptionAr"
            name="descriptionAr"
            required
            defaultValue={initialData?.descriptionAr}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="price">السعر الحالي ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            required
            defaultValue={initialData?.price}
          />
        </div>
        <div>
          <Label htmlFor="originalPrice">السعر الأصلي (اختياري) ($)</Label>
          <Input
            id="originalPrice"
            name="originalPrice"
            type="number"
            defaultValue={initialData?.originalPrice || ""}
          />
        </div>
        <div>
          <Label htmlFor="categoryId">الفئة</Label>
          <Select name="categoryId" defaultValue={initialData?.categoryId?.toString()} required>
            <SelectTrigger>
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.nameAr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="image">صورة المنتج</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => onImageUpload(e, setImageUrl)}
        />
        {imageUrl && (
          <div className="mt-2">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded"
            />
          </div>
        )}
        <input type="hidden" name="imageUrl" value={imageUrl} />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 ml-2 animate-spin" />
            جاري الحفظ...
          </>
        ) : (
          "حفظ"
        )}
      </Button>
    </form>
  );
}
