import { Star, User } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface ReviewsListProps {
  productId: number;
}

export function ReviewsList({ productId }: ReviewsListProps) {
  const { data: reviews, isLoading } = trpc.reviews.getByProduct.useQuery({
    productId,
  });

  if (isLoading) {
    return <div className="text-center py-8">جاري تحميل المراجعات...</div>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        لا توجد مراجعات حتى الآن. كن أول من يترك مراجعة!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          {/* Header with name and rating */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">{review.userName}</p>
                <p className="text-xs text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString('ar-SA')}
                </p>
              </div>
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={`${
                    star <= review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Title */}
          {review.title && (
            <p className="font-semibold text-gray-800 mb-2 text-right">{review.title}</p>
          )}

          {/* Comment */}
          <p className="text-gray-700 text-right">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
