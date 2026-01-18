import { Terminal } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { fetchPhotosFromImageKit } from "@/lib/imagekit-server"
import DomeGallery, { type DomeGalleryImage } from "@/components/DomeGallery"

export default async function PhotographyPage() {
    const photos = await fetchPhotosFromImageKit();

    // Convert ImageKit photos to DomeGallery format
    const galleryImages: DomeGalleryImage[] = photos.map((photo) => ({
        src: photo.src,
        thumbnailSrc: photo.thumbnailSrc,
        alt: photo.alt,
    }));

    return (
        <div className="min-h-screen bg-[#060010]">
            {/* Technical Header */}
            <section className="container-custom pt-24 pb-6">
                <FadeIn>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-6">
                        <Terminal className="w-3 h-3" />
                        <span>~/photography</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-border pb-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-white">
                                Visual_Log<span className="animate-pulse">_</span>
                            </h1>
                            <p className="text-lg text-muted-foreground font-mono max-w-xl">
                                A collection of captured moments.
                                <span className="block text-xs mt-2 opacity-50">Rendering engine: DomeGallery_3D v1.0</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-muted/20 rounded border border-border text-xs font-mono text-muted-foreground">
                            <span>{photos.length} FILES FOUND</span>
                        </div>
                    </div>
                </FadeIn>
            </section>

            {/* 3D Dome Gallery */}
            <section className="relative w-full h-[70vh] min-h-[500px]">
                <DomeGallery
                    images={galleryImages}
                    overlayBlurColor="#060010"
                    grayscale={false}
                    fit={0.6}
                    minRadius={400}
                    imageBorderRadius="16px"
                    openedImageBorderRadius="16px"
                    openedImageWidth="350px"
                    openedImageHeight="450px"
                />
            </section>

            {/* Bottom padding */}
            <div className="h-20" />
        </div>
    )
}