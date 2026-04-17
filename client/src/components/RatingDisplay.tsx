import { Star } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface RatingDisplayProps {
  productId: number;
  size?: 'sm' | 'md' | 'lg';
}

export function RatingDisplay({ productId, size = 'md' }: RatingDisplayProps) {
  const { data: averageRating } = trpc.reviews.getAverageRating.useQuery({
    productId,
  });
  const { data: reviewCount } = trpc.reviews.getCount.useQuery({
    productId,
  });

  const sizeMap = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  const starSize = sizeMap[size];
  const rating = averageRating || 0;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={starSize}
            className={`${
              star <= Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {rating > 0 ? `${rating.toFixed(1)} (${reviewCount || 0})` : 'لا توجد تقييمات'}
      </span>
    </div>
  );
}
