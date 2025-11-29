import Image from "next/image"
import { Camera, Terminal } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { fetchPhotosFromImageKit } from "@/lib/imagekit-server"

export default async function PhotographyPage() {
  const photos = await fetchPhotosFromImageKit();
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <section className="container-custom">
        
        {/* Technical Header */}
        <FadeIn>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-6">
            <Terminal className="w-3 h-3" />
            <span>~/photography</span>
          </div>
       
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border pb-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">
                        Visual_Log<span className="animate-pulse">_</span>
                    </h1>
                    <p className="text-lg text-muted-foreground font-mono max-w-xl">
                        A collection of captured moments. 
                        <span className="block text-xs mt-2 opacity-50">Rendering engine: Bento_Grid v2.0</span>
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-muted/20 rounded border border-border text-xs font-mono text-muted-foreground">
                    <Camera className="w-4 h-4" />
                    <span>{photos.length} FILES FOUND</span>
                </div>
            </div>
        </FadeIn>

        {/* Minimal Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
            {photos.map((photo, index) => (
                <FadeIn 
                    key={photo.id} 
                    delay={index * 0.05} 
                    className={`relative group rounded-lg overflow-hidden bg-muted ${photo.className}`}
                >
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Minimal Date Badge */}
                    <div className="absolute bottom-3 right-3">
                        <span className="bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-mono font-medium px-2 py-1 rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {photo.date}
                        </span>
                    </div>
                </FadeIn>
            ))}
        </div>

      </section>
    </div>
  )
}