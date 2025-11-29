export default function BlogPostLoading() {
  return (
    <div className="min-h-screen pt-24 pb-20 container-custom max-w-4xl">
      
      {/* Terminal Header Loading */}
      <div className="mb-12 space-y-4">
         <div className="h-4 w-48 bg-muted/50 rounded animate-pulse" />
         <div className="h-12 w-3/4 bg-muted/50 rounded animate-pulse" />
         <div className="h-12 w-1/2 bg-muted/50 rounded animate-pulse" />
      </div>

      {/* Metadata Bar Loading */}
      <div className="flex gap-8 py-4 border-y border-border/50 mb-12">
        <div className="h-4 w-24 bg-muted/50 rounded animate-pulse" />
        <div className="h-4 w-24 bg-muted/50 rounded animate-pulse" />
        <div className="h-4 w-24 bg-muted/50 rounded animate-pulse" />
      </div>

      {/* Content Loading */}
      <div className="space-y-6">
         {Array.from({ length: 6 }).map((_, i) => (
           <div 
             key={i} 
             className="h-4 bg-muted/30 rounded animate-pulse" 
             style={{ width: `${Math.random() * 40 + 60}%` }} 
           />
         ))}
      </div>
      
      <div className="mt-12 p-4 border border-dashed border-border rounded flex items-center justify-center text-muted-foreground font-mono text-sm animate-pulse">
        Fetching data stream...
      </div>
    </div>
  )
}