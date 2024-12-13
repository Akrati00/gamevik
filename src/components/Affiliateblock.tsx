import React from 'react';
import Image from 'next/image';

type AffiliateBlockProps = {
  title: string;
  imageUrls: string[];
  rating: number;
  buttonText: string;
  buttonUrl: string;
};

const AffiliateBlock: React.FC<AffiliateBlockProps> = ({
  title,
  imageUrls,
  rating,
  buttonText,
  buttonUrl,
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < rating ? '#FFD700' : '#ddd' }}>★</span>
  ));

  return (
    <div className="flex flex-col sm:flex-row items-start border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 shadow-md w-full my-8 space-x-3 mt-8 max-w-7xl mx-auto p-4">
      {/* Left side - Image */}
      <div className="flex-shrink-0 w-full sm:w-2/5 h-44 relative">
        {imageUrls[0] && (
          <Image
            src={imageUrls[0]}
            alt={`${title} image`}
            layout="fill" // Ensure the image fills the container
            className="rounded-lg object-cover"
          />
        )}
      </div>

      {/* Right side - Text, Stars, and Button */}
      <div className="flex flex-col justify-between w-full sm:w-3/5">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h2>
          <div className="flex space-x-2 my-2 text-yellow-500">
            {stars}
          </div>
        </div>

        <a
          href={buttonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-4 py-2 text-center text-green-600 border border-green-600 hover:bg-green-600 hover:text-white rounded-lg transition-colors duration-300 w-full sm:w-auto"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default AffiliateBlock;
