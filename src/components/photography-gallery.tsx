"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

type Photo = {
  id: number
  src: string
  alt: string
  category: string
}

type PhotographyGalleryProps = {
  className?: string
}

// Sample photography data
const photos: Photo[] = [
  {
    id: 1,
    src: "/photography/img1.jpeg",
    alt: "Landscape photography of framland",
    category: "Landscape",
  },
  {
    id: 2,
    src: "/photography/img2.jpeg",
    alt: "Fighter jet in the parking",
    category: "Aviation",
  },
  {
    id: 3,
    src: "/photography/img3.jpeg",
    alt: "Nature photography of moutain and sun",
    category: "Landscape",
  },
  {
    id: 4,
    src: "/photography/img4.jpeg",
    alt: "Landscape photography of a Temple",
    category: "Landscape",
  },
  {
    id: 5,
    src: "/photography/img5.jpeg",
    alt: "Architecture photography of a building",
    category: "Architecture",
  },
  {
    id: 6,
    src: "/photography/img6.jpeg",
    alt: "Solana Event NFT Art",
    category: "NFT",
  },
  {
    id: 7,
    src: "/photography/img7.jpeg",
    alt: "Landscape photography of a sky from a flight",
    category: "Aviation",
  },
  {
    id: 8,
    src: "/photography/img8.jpeg",
    alt: "Travel photography of a Ganga River in Varanasi",
    category: "Travel",
  },
  {
    id: 9,
    src: "/photography/img9.jpeg",
    alt: "Travel photography of Buildings in Coorg",
    category: "Travel",
  }
]

const categories = ["All", ...Array.from(new Set(photos.map((photo) => photo.category)))]

export function PhotographyGallery({ className }: PhotographyGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const filteredPhotos =
    selectedCategory === "All" ? photos : photos.filter((photo) => photo.category === selectedCategory)

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo)
  }

  const handleClose = () => {
    setSelectedPhoto(null)
  }

  const handleNext = () => {
    if (!selectedPhoto) return
    const currentIndex = filteredPhotos.findIndex((photo) => photo.id === selectedPhoto.id)
    const nextIndex = (currentIndex + 1) % filteredPhotos.length
    setSelectedPhoto(filteredPhotos[nextIndex])
  }

  const handlePrev = () => {
    if (!selectedPhoto) return
    const currentIndex = filteredPhotos.findIndex((photo) => photo.id === selectedPhoto.id)
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    setSelectedPhoto(filteredPhotos[prevIndex])
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Photo Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" layout>
        <AnimatePresence>
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="aspect-[4/3] bg-muted rounded-lg overflow-hidden cursor-pointer group relative"
              onClick={() => handlePhotoClick(photo)}
            >
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                width={100}
                height={100}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
              />
              <div className="absolute inset-0 bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="text-white h-8 w-8" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm">{photo.alt}</p>
                <span className="text-amber-100 text-xs">{photo.category}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gray-900/90 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-3xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.alt}
                width={1200}
                height={800}
                className="w-full h-full object-contain max-h-[70vh]"
              />

              <button
                className="absolute top-4 right-4 text-white bg-gray-800/50 p-2 rounded-full hover:bg-gray-800/70 transition-colors"
                onClick={handleClose}
              >
                <X className="h-6 w-6" />
              </button>

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-gray-800/50 p-2 rounded-full hover:bg-gray-800/70 transition-colors"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-gray-800/50 p-2 rounded-full hover:bg-gray-800/70 transition-colors"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-gray-800/50 p-2">
                <p className="text-lg font-medium">{selectedPhoto.alt}</p>
                <p className="text-sm text-amber-100">{selectedPhoto.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

