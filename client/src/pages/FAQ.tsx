import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Package, CreditCard, RefreshCw, Shield, Truck } from "lucide-react";
import { Link } from "wouter";

export default function FAQ() {
  const faqs = [
    {
      category: "الشحن والتوصيل",
      icon: Truck,
      questions: [
        {
          q: "كم تستغرق مدة التوصيل؟",
          a: "نقوم بالتوصيل إلى كافة أنحاء العالم خلال 3-5 أيام عمل من تاريخ تأكيد الطلب."
        },
        {
          q: "هل الشحن مجاني؟",
          a: "نعم، نوفر شحن لجميع الطلبات إلى معظم الدول. قد تطبق رسوم إضافية على الشحن."
        },
        {
          q: "كيف يمكنني تتبع طلبي؟",
          a: "بعد شحن طلبك، سنرسل لك رقم تتبع عبر واتساب لمتابعة حالة الشحنة."
        }
      ]
    },
    {
      category: "الدفع",
      icon: CreditCard,
      questions: [
        {
          q: "ما هي طرق الدفع المتاحة؟",
          a: "نقبل الدفع عند الاستلام، التحويل البنكي، والدفع الإلكتروني عبر بطاقات الائتمان."
        },
        {
          q: "هل معلوماتي المالية آمنة؟",
          a: "نعم، نستخدم أحدث تقنيات التشفير لحماية معلوماتك المالية والشخصية."
        }
      ]
    },

    {
      category: "المنتجات والضمان",
      icon: Shield,
      questions: [
        {
          q: "هل المنتجات أصلية؟",
          a: "نعم، جميع منتجاتنا أصلية 100% ونوفر شهادات الضمان والأصالة مع كل منتج."
        },
        {
          q: "ما هي مدة الضمان؟",
          a: "نوفر ضمان شامل لمدة سنة واحدة على جميع الساعات، ويغطي العيوب الصناعية وأعطال الحركة."
        },
        {
          q: "هل يمكنني معاينة المنتج قبل الشراء؟",
          a: "نعم، نوفر صور عالية الدقة ووصف تفصيلي لكل منتج. يمكنك أيضاً طلب صور إضافية عبر واتساب."
        }
      ]
    },
    {
      category: "الطلب والتواصل",
      icon: Package,
      questions: [
        {
          q: "كيف يمكنني تقديم طلب؟",
          a: "اضغط على زر 'اطلب عبر واتساب' على المنتج المطلوب، وسيتم فتح محادثة واتساب مع تفاصيل المنتج جاهزة."
        },
        {
          q: "هل يمكنني تعديل طلبي بعد تأكيده؟",
          a: "نعم، يمكنك تعديل الطلب خلال 24 ساعة من تأكيده عبر التواصل معنا على واتساب."
        },
        {
          q: "كيف يمكنني التواصل مع خدمة العملاء؟",
          a: "يمكنك التواصل معنا عبر واتساب على الرقم 905343222221 في أي وقت، ونحن متاحون للرد على استفساراتكم."
        }
      ]
    }
  ];

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
          <div className="w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-teal-800 mb-6">الأسئلة الشائعة</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            هنا ستجد إجابات على الأسئلة الأكثر شيوعاً حول منتجاتنا وخدماتنا
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {faqs.map((category, idx) => {
              const IconComponent = category.icon;
              return (
                <div key={idx} className="bg-white rounded-3xl shadow-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{category.category}</h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, qIdx) => (
                      <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`} className="border-b border-gray-200">
                        <AccordionTrigger className="text-right text-lg font-semibold text-gray-800 hover:text-teal-700 py-4">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">لم تجد إجابة لسؤالك؟</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            تواصل معنا مباشرة عبر واتساب وسنكون سعداء بمساعدتك
          </p>
          <Button 
            onClick={() => window.open("https://wa.me/905343222221", "_blank")}
            size="lg" 
            className="bg-white text-teal-800 hover:bg-teal-50 shadow-lg hover:shadow-xl transition-all text-lg px-8 py-6"
          >
            تواصل معنا
          </Button>
        </div>
      </section>
    </div>
  );
}
