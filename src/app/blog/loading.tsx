export default function BlogLoading() {
  return (
    <div className="pt-20">
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="h-12 w-48 bg-muted/50 animate-pulse rounded-lg mx-auto mb-6"></div>
          <div className="h-6 w-96 max-w-full bg-muted/50 animate-pulse rounded-lg mx-auto"></div>
        </div>

        {/* Featured Post Skeleton */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="h-4 w-32 bg-muted/50 animate-pulse rounded-lg mb-2"></div>
              <div className="h-10 w-full bg-muted/50 animate-pulse rounded-lg mb-4"></div>
              <div className="h-10 w-3/4 bg-muted/50 animate-pulse rounded-lg mb-4"></div>
              <div className="h-6 w-full bg-muted/50 animate-pulse rounded-lg mb-6"></div>
              <div className="h-6 w-5/6 bg-muted/50 animate-pulse rounded-lg mb-6"></div>
              <div className="h-10 w-32 bg-muted/50 animate-pulse rounded-lg"></div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-video bg-muted/50 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-card rounded-lg overflow-hidden border border-border">
              <div className="aspect-video bg-muted/50 animate-pulse"></div>
              <div className="p-6">
                <div className="h-4 w-32 bg-muted/50 animate-pulse rounded-lg mb-2"></div>
                <div className="h-8 w-full bg-muted/50 animate-pulse rounded-lg mb-2"></div>
                <div className="h-4 w-full bg-muted/50 animate-pulse rounded-lg mb-2"></div>
                <div className="h-4 w-5/6 bg-muted/50 animate-pulse rounded-lg mb-2"></div>
                <div className="h-4 w-4/6 bg-muted/50 animate-pulse rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 