import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  description: string;
  slug: string;
  category: string;
  image?: string;
}

export function BlogCard({ title, description, slug, category, image }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
    >
      {image && (
        <div className="aspect-video bg-muted overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={600}
            height={340}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
          />
        </div>
      )}
      <div className="p-6">
        <div className="text-sm font-medium text-muted-foreground mb-2">
          {category}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-muted-foreground line-clamp-3">
          {description}
        </p>
      </div>
    </Link>
  );
} 