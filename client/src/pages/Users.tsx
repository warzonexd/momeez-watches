import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Key } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  createdAt: string;
}

export default function Users() {
  const [, setLocation] = useLocation();
  const [users, setUsers] = useState<User[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "admin",
  });
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    // Check if logged in
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (!isLoggedIn) {
      setLocation("/admin-login");
      return;
    }

    // Load users from localStorage
    const storedUsers = localStorage.getItem("adminUsers");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Initialize with default admin user
      const defaultUsers: User[] = [
        {
          id: 1,
          username: "admin",
          password: "mrahmad",
          role: "admin",
          createdAt: new Date().toISOString(),
        },
      ];
      setUsers(defaultUsers);
      localStorage.setItem("adminUsers", JSON.stringify(defaultUsers));
    }
  }, [setLocation]);

  const saveUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem("adminUsers", JSON.stringify(updatedUsers));
  };

  const handleAddUser = () => {
    if (!newUser.username || !newUser.password) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    // Check if username already exists
    if (users.some((u) => u.username === newUser.username)) {
      toast.error("اسم المستخدم موجود بالفعل");
      return;
    }

    const user: User = {
      id: Date.now(),
      username: newUser.username,
      password: newUser.password,
      role: newUser.role,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, user];
    saveUsers(updatedUsers);
    toast.success("تم إضافة المستخدم بنجاح");
    setIsAddDialogOpen(false);
    setNewUser({ username: "", password: "", role: "admin" });
  };

  const handleEditUser = () => {
    if (!editingUser) return;

    const updatedUsers = users.map((u) =>
      u.id === editingUser.id ? editingUser : u
    );
    saveUsers(updatedUsers);
    toast.success("تم تحديث المستخدم بنجاح");
    setIsEditDialogOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id: number) => {
    if (users.length === 1) {
      toast.error("لا يمكن حذف المستخدم الوحيد");
      return;
    }

    if (!confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;

    const updatedUsers = users.filter((u) => u.id !== id);
    saveUsers(updatedUsers);
    toast.success("تم حذف المستخدم بنجاح");
  };

  const handleChangePassword = () => {
    if (!editingUser || !newPassword) {
      toast.error("يرجى إدخال كلمة المرور الجديدة");
      return;
    }

    const updatedUsers = users.map((u) =>
      u.id === editingUser.id ? { ...u, password: newPassword } : u
    );
    saveUsers(updatedUsers);
    toast.success("تم تغيير كلمة المرور بنجاح");
    setIsPasswordDialogOpen(false);
    setEditingUser(null);
    setNewPassword("");
  };

  return (
    <div className="container py-8" dir="rtl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">إدارة المستخدمين</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-teal-700 hover:bg-teal-800">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة مستخدم جديد
                </Button>
              </DialogTrigger>
              <DialogContent dir="rtl">
                <DialogHeader>
                  <DialogTitle>إضافة مستخدم جديد</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>اسم المستخدم</Label>
                    <Input
                      value={newUser.username}
                      onChange={(e) =>
                        setNewUser({ ...newUser, username: e.target.value })
                      }
                      placeholder="أدخل اسم المستخدم"
                    />
                  </div>
                  <div>
                    <Label>كلمة المرور</Label>
                    <Input
                      type="password"
                      value={newUser.password}
                      onChange={(e) =>
                        setNewUser({ ...newUser, password: e.target.value })
                      }
                      placeholder="أدخل كلمة المرور"
                    />
                  </div>
                  <div>
                    <Label>الدور</Label>
                    <Input
                      value={newUser.role}
                      onChange={(e) =>
                        setNewUser({ ...newUser, role: e.target.value })
                      }
                      placeholder="admin"
                    />
                  </div>
                  <Button
                    onClick={handleAddUser}
                    className="w-full bg-teal-700 hover:bg-teal-800"
                  >
                    إضافة
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">اسم المستخدم</TableHead>
                  <TableHead className="text-right">الدور</TableHead>
                  <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-sm">
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString("ar-EG")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingUser(user);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingUser(user);
                            setIsPasswordDialogOpen(true);
                          }}
                        >
                          <Key className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
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
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>تعديل المستخدم</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <div>
                <Label>اسم المستخدم</Label>
                <Input
                  value={editingUser.username}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, username: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>الدور</Label>
                <Input
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                />
              </div>
              <Button
                onClick={handleEditUser}
                className="w-full bg-teal-700 hover:bg-teal-800"
              >
                حفظ التغييرات
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>تغيير كلمة المرور</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>كلمة المرور الجديدة</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="أدخل كلمة المرور الجديدة"
              />
            </div>
            <Button
              onClick={handleChangePassword}
              className="w-full bg-teal-700 hover:bg-teal-800"
            >
              تغيير كلمة المرور
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
