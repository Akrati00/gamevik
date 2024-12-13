import { supabase } from '@/lib/supabaseclient'; // Adjust the path as needed
import { useState, useEffect } from 'react';
import Script from 'next/script';

const emojis = [
  { label: 'Very Dissatisfied', symbol: '😡', rating: 1 },
  { label: 'Dissatisfied', symbol: '😠', rating: 2 },
  { label: 'Neutral', symbol: '😐', rating: 3 },
  { label: 'Satisfied', symbol: '😊', rating: 4 },
  { label: 'Very Satisfied', symbol: '😍', rating: 5 },
];

export default function ResponsiveEmojiRating({ postId }) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  useEffect(() => {
    const savedRating = localStorage.getItem(`userRating-${postId}`);
    if (savedRating) {
      setSelectedRating(Number(savedRating));
    }
  }, [postId]);

  const handleEmojiClick = async (index: number) => {
    const rating = index + 1;
    setSelectedRating(rating);
    localStorage.setItem(`userRating-${postId}`, rating.toString());

    // Save the rating to Supabase
    const { error } = await supabase
      .from('ratings')
      .insert([
        {
          post_id: postId,
          rating,
        },
      ]);

    if (error) {
      console.error('Error saving rating:', error.message);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 md:p-8 max-w-md mx-auto">
      <div className="w-full h-12 rounded-full flex items-center justify-center bg-green-100 border-green-700 border-2 p-2">
        <p className="text_wrapper text-gray-900 text-sm">Was this helpful?</p>
        <div className="flex items-center ml-4 space-x-2">
          {emojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleEmojiClick(index)}
              className={`text-2xl cursor-pointer transition-transform transform-gpu ${
                selectedRating === index + 1 ? 'scale-125 text-yellow-500 filter-none' : 'text-gray-700 grayscale'
              } hover:scale-125 hover:filter-none hover:transition-transform hover:duration-300`}
              aria-label={`Select ${emoji.label} emoji`}
              role="radio"
              aria-checked={selectedRating === index + 1}
              type="button"
              title={emoji.label}
            >
              {emoji.symbol}
            </button>
          ))}
        </div>
      </div>

      {selectedRating && (
        <Script
          id="rating-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              'name': 'Your Product Name',
              'aggregateRating': {
                '@type': 'AggregateRating',
                'ratingValue': selectedRating,
                'bestRating': '5',
                'worstRating': '1',
                'ratingCount': '1',
              },
            }),
          }}
        />
      )}
    </div>
  );
}
