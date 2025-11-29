// app/blog/not-found.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileWarning, ArrowLeft } from "lucide-react"

export default function BlogNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
      <div className="p-6 rounded-full bg-destructive/10 text-destructive mb-6">
        <FileWarning className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-mono font-bold mb-4">Error 404: File Not Found</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        The requested documentation or log entry could not be located in the system directory.
      </p>
      <Button asChild className="gap-2 font-mono">
        <Link href="/blog">
          <ArrowLeft className="w-4 h-4" /> Return to Root
        </Link>
      </Button>
    </div>
  )
}