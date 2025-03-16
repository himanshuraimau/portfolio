import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CategoryNotFound() {
  return (
    <div className="pt-20">
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="heading-xl mb-6">Category Not Found</h1>
          <p className="body-lg text-muted-foreground mb-8">
            Sorry, the category you're looking for doesn't exist or has no posts.
          </p>
          <Button size="lg" asChild>
            <Link href="/blog">
              Back to Blog
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
} 