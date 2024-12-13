import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Photo {
  id: number
  src: string
  alt: string
}

interface PhotoGalleryProps {
  photos: Photo[]
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [showAll, setShowAll] = useState(false)

  const openPhoto = (photo: Photo) => setSelectedPhoto(photo)
  const closePhoto = () => setSelectedPhoto(null)

  const goToPrevious = () => {
    const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto?.id)
    const previousIndex = (currentIndex - 1 + photos.length) % photos.length
    setSelectedPhoto(photos[previousIndex])
  }

  const goToNext = () => {
    const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto?.id)
    const nextIndex = (currentIndex + 1) % photos.length
    setSelectedPhoto(photos[nextIndex])
  }

  const displayedPhotos = showAll ? photos : photos.slice(0, 6)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {displayedPhotos.map((photo) => (
          <div key={photo.id} className="aspect-square overflow-hidden rounded-lg cursor-pointer photobox">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={300}
              height={300}
              className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
              onClick={() => openPhoto(photo)}
            />
          </div>
        ))}
      </div>

      {photos.length > 6 && !showAll && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="
    bg-white text-black border-2 border-[#2eb055] px-6 py-2 rounded-full 
    shadow-sm shadow-[#2eb055]
    hover:bg-[#f0f0f0] 
    dark:bg-black dark:text-white dark:border-2 dark:border-[#2eb055] dark:shadow-sm dark:shadow-[#2eb055]
    transition-colors font-rubik "
          >
            Show All
          </button>
        </div>
      )}

      {showAll && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(false)}
             className="
            bg-white text-black border-2 border-[#2eb055] px-6 py-2 rounded-full font-rubik
            shadow-sm shadow-[#2eb055]
            hover:bg-[#f0f0f0] 
            dark:bg-black dark:text-white dark:border-2 dark:border-[#2eb055] dark:shadow-sm dark:shadow-[#2eb055]
            transition-colors"
          >
            Close All
          </button>
        </div>
      )}

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-full w-full">
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              width={800}
              height={800}
              className="max-w-full max-h-[90vh] object-contain mx-auto"
            />
            <button
              onClick={closePhoto}
              className="absolute top-2 right-12 text-white hover:text-[#2eb055] transition-colors z-10"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#2eb055]  transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#2eb055]  transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight size={36} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
