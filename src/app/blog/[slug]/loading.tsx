export default function BlogPostLoading() {
  return (
    <div className="pt-20">
      <article className="container-custom pb-16">
        <div className="mb-8">
          <div className="h-8 w-32 bg-muted/50 animate-pulse rounded-lg"></div>
        </div>
        
        <div className="max-w-[900px] mx-auto">
          <header className="mb-10">
            <div className="h-16 w-full bg-muted/50 animate-pulse rounded-lg mb-6"></div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-6 w-32 bg-muted/50 animate-pulse rounded-lg"></div>
              <div className="h-6 w-2 bg-muted/50 animate-pulse rounded-lg"></div>
              <div className="h-6 w-24 bg-muted/50 animate-pulse rounded-lg"></div>
            </div>
            <div className="relative w-full aspect-[21/9] mb-12 bg-muted/50 animate-pulse rounded-lg"></div>
          </header>

          {/* Article Content Skeleton */}
          <div className="space-y-6">
            <div className="h-8 w-full bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-4 w-full bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-4 w-11/12 bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-4 w-full bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-4 w-10/12 bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-8 w-3/4 bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-4 w-full bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-4 w-11/12 bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-4 w-full bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-4 w-10/12 bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-8 w-2/3 bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-4 w-full bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-4 w-11/12 bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-4 w-full bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-4 w-10/12 bg-muted/50 animate-pulse rounded-lg"></div>
          </div>

          {/* Tags Skeleton */}
          <div className="mt-10 flex flex-wrap gap-2">
            <div className="h-8 w-16 bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-8 w-20 bg-muted/50 animate-pulse rounded-lg"></div>
            <div className="h-8 w-24 bg-muted/50 animate-pulse rounded-lg"></div>
          </div>
        </div>

        {/* Related Posts Skeleton */}
        <div className="mt-20">
          <div className="h-10 w-48 bg-muted/50 animate-pulse rounded-lg mx-auto mb-8"></div>
          <div className="grid md:grid-cols-2 gap-8">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden border border-border">
                <div className="aspect-video bg-muted/50 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-4 w-32 bg-muted/50 animate-pulse rounded-lg mb-2"></div>
                  <div className="h-8 w-full bg-muted/50 animate-pulse rounded-lg mb-2"></div>
                  <div className="h-4 w-full bg-muted/50 animate-pulse rounded-lg mb-2"></div>
                  <div className="h-4 w-5/6 bg-muted/50 animate-pulse rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
} 