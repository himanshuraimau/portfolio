import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  getBlogPosts,
  getAllTags,
  getBlogFolders,
  getPostsInFolder,
  postPathFromSlug,
} from "@/lib/blog"
import {
  Terminal,
  Hash,
  Calendar,
  Clock,
  ArrowRight,
  FileText,
  FolderOpen,
  Search,
  ChevronRight,
} from "lucide-react"

interface FolderPageProps {
  params: Promise<{ folder: string }>
}

export async function generateMetadata({
  params,
}: FolderPageProps): Promise<Metadata> {
  const { folder } = await params
  const decoded = decodeURIComponent(folder)
  return {
    title: `${decoded} | Engineering Logs`,
    description: `Posts filed under the ${decoded} collection.`,
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return getBlogFolders(posts).map((folder) => ({ folder }))
}

export default async function FolderPage({ params }: FolderPageProps) {
  const { folder } = await params
  const decoded = decodeURIComponent(folder)

  const allPosts = await getBlogPosts()
  const allTags = await getAllTags()
  const allFolders = getBlogFolders(allPosts)

  const posts = getPostsInFolder(allPosts, decoded).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  if (!posts.length) notFound()

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="container-custom mb-16">
        <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-8">
          <Link href="/blog" className="hover:text-primary transition-colors">
            ~/blog
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary flex items-center gap-1">
            <FolderOpen className="w-3 h-3" />
            {decoded}
          </span>
        </div>

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-6">
            <FolderOpen className="w-3 h-3" />
            <span>./{decoded}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-mono font-bold tracking-tight mb-4">
            {decoded.charAt(0).toUpperCase() + decoded.slice(1)}
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            {posts.length} post{posts.length !== 1 ? "s" : ""} in this
            collection
          </p>
        </div>
      </section>

      <section className="container-custom">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="p-5 border border-border rounded-lg bg-card/50 backdrop-blur-sm sticky top-24 space-y-6">
              {/* All collections */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-sm font-mono text-muted-foreground">
                  <FolderOpen className="w-4 h-4" />
                  <span>Collections</span>
                </div>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/blog"
                    className="text-xs font-mono px-2 py-1.5 rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-all flex items-center gap-1.5"
                  >
                    <Terminal className="w-3 h-3 shrink-0" />
                    ./all
                  </Link>
                  {allFolders.map((f) => (
                    <Link
                      key={f}
                      href={`/blog/folder/${encodeURIComponent(f)}`}
                      className={`text-xs font-mono px-2 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                        f === decoded
                          ? "bg-primary/10 text-primary font-bold border border-primary/20"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                      }`}
                    >
                      <FolderOpen className="w-3 h-3 shrink-0" />
                      ./{f}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-sm font-mono text-muted-foreground">
                  <Search className="w-4 h-4" />
                  <span>Filter by Tag</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${encodeURIComponent(tag)}`}
                      className="text-xs font-mono px-2 py-1 bg-muted text-muted-foreground border border-transparent hover:border-border hover:text-foreground rounded transition-all"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Posts feed */}
          <div className="lg:col-span-9 space-y-6">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={postPathFromSlug(post.slug)}
                className="group block"
              >
                <article className="relative grid md:grid-cols-12 gap-6 p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300">
                  <div className="absolute -right-4 -top-4 opacity-0 group-hover:opacity-10 transition-opacity text-6xl font-mono font-bold select-none">
                    {(index + 1).toString().padStart(2, "0")}
                  </div>

                  <div className="md:col-span-4 lg:col-span-3">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted border border-border relative">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <FileText className="w-8 h-8 opacity-20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-tr from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-xs font-mono text-muted-foreground">
                      <span className="flex items-center gap-1 text-primary">
                        <Terminal className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="w-px h-3 bg-border" />
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="w-px h-3 bg-border" />
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime || 5} min read
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors font-mono tracking-tight">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground"
                          >
                            <Hash className="w-2 h-2" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-mono font-bold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1">
                        Read_File <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
