import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: `${post.title} | 001's Blog`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Header />
      <main className="flex-1 pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <article className="relative">
            {/* Decorative Corner Brackets */}
            <div className="absolute -left-4 -top-4 text-2xl text-[#00f5ff]/20">┌</div>
            <div className="absolute -right-4 -bottom-4 text-2xl text-[#00f5ff]/20">┘</div>

            {/* Article Header */}
            <header className="mb-8 pb-8 border-b border-[#00f5ff]/20 relative">
              {/* Date Badge */}
              <div className="inline-flex items-center gap-2 mb-6 bg-[#00f5ff]/10 border border-[#00f5ff]/30 rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-[#00f5ff] rounded-full animate-pulse" />
                <time
                  dateTime={post.date}
                  className="text-xs font-mono text-[#00f5ff]"
                >
                  {new Date(post.date).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).replace(/\//g, ".")}
                </time>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-[#e0e0e0] mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="px-3 py-1 text-xs font-mono text-[#b829dd] bg-[#b829dd]/10 border border-[#b829dd]/30 rounded hover:bg-[#b829dd]/20 hover:text-[#b829dd] transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="relative">
              {/* Content Terminal Box */}
              <div className="relative bg-[#12121a] border border-[#00f5ff]/20 rounded-lg overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0f] border-b border-[#00f5ff]/10">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/50" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <span className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-xs text-[#555] font-mono flex-1 text-center">
                    post_{post.slug}.md
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-6 prose prose-invert max-w-none">
                  {/* TODO: Render MDX content */}
                  <pre className="bg-[#0a0a0f] p-4 rounded border border-[#00f5ff]/10 overflow-auto whitespace-pre-wrap text-sm text-[#a0a0a0] font-mono leading-relaxed">
                    {post.content}
                  </pre>
                </div>
              </div>
            </div>

            {/* Back Navigation */}
            <div className="mt-12 pt-8 border-t border-[#00f5ff]/20">
              <a
                href="/"
                className="group inline-flex items-center gap-2 text-[#00f5ff]/70 hover:text-[#00f5ff] transition-colors font-mono"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                <span>返回首页</span>
              </a>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
