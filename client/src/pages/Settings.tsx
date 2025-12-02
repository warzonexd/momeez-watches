import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Settings() {
  const { user, loading: authLoading } = useAuth();
  const [whatsappNumber, setWhatsappNumber] = useState("966500000000");
  const [isSaving, setIsSaving] = useState(false);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">غير مصرح</h1>
          <p className="text-muted-foreground">ليس لديك صلاحية للوصول إلى هذه الصفحة</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setIsSaving(true);
    // In a real implementation, this would save to database
    setTimeout(() => {
      toast.success("تم حفظ الإعدادات بنجاح");
      setIsSaving(false);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="container py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">الإعدادات</h1>

        <Card>
          <CardHeader>
            <CardTitle>إعدادات واتساب</CardTitle>
            <CardDescription>
              قم بتعيين رقم واتساب الذي سيتم استخدامه لاستقبال طلبات العملاء
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="whatsapp">رقم واتساب (بصيغة دولية)</Label>
              <Input
                id="whatsapp"
                type="text"
                placeholder="966500000000"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                dir="ltr"
              />
              <p className="text-sm text-muted-foreground mt-2">
                مثال: 966500000000 (بدون + أو 00)
              </p>
            </div>

            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                "حفظ التغييرات"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>ملاحظة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              حالياً، رقم واتساب مضمن في الكود. لتفعيل حفظ الرقم في قاعدة البيانات، يمكن
              إضافة جدول للإعدادات في المستقبل.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
