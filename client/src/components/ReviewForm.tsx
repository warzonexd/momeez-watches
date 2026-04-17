import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { trpc } from '@/lib/trpc';

interface ReviewFormProps {
  productId: number;
  onReviewAdded?: () => void;
}

export function ReviewForm({ productId, onReviewAdded }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const createReviewMutation = trpc.reviews.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createReviewMutation.mutateAsync({
        productId,
        userName,
        userEmail,
        rating,
        title: title || undefined,
        comment,
      });

      setSuccessMessage('شكراً! تم إرسال مراجعتك بنجاح. سيتم عرضها بعد الموافقة عليها.');
      setUserName('');
      setUserEmail('');
      setTitle('');
      setComment('');
      setRating(5);

      setTimeout(() => {
        setSuccessMessage('');
        onReviewAdded?.();
      }, 3000);
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h3 className="text-xl font-bold mb-4 text-right">أضف مراجعتك</h3>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating Stars */}
        <div className="flex justify-end items-center gap-2">
          <span className="text-sm text-gray-600">التقييم:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  size={24}
                  className={`${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
            اسمك
          </label>
          <Input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="أدخل اسمك"
            required
            className="text-right"
            dir="rtl"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
            بريدك الإلكتروني
          </label>
          <Input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="text-right"
            dir="rtl"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
            عنوان المراجعة (اختياري)
          </label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان قصير للمراجعة"
            className="text-right"
            dir="rtl"
          />
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
            المراجعة
          </label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="شارك رأيك حول هذا المنتج..."
            required
            minLength={10}
            className="text-right"
            dir="rtl"
            rows={4}
          />
          <p className="text-xs text-gray-500 mt-1 text-right">
            الحد الأدنى 10 أحرف
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            {isSubmitting ? 'جاري الإرسال...' : 'إرسال المراجعة'}
          </Button>
        </div>
      </form>
    </div>
  );
}
