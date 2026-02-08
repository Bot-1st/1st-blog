import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { notFound } from "next/navigation";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

// Generate static params for all tags
export async function generateStaticParams() {
  const posts = getAllPosts();
  const allTags = new Set<string>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      allTags.add(tag);
    });
  });
  
  // 返回原始中文字符，让 Next.js 自动处理编码
  return Array.from(allTags).map(tag => ({
    tag: tag,
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getAllPosts();
  
  // Filter posts by tag
  const filteredPosts = posts.filter(post => 
    post.tags.includes(decodedTag)
  );
  
  if (filteredPosts.length === 0) {
    notFound();
  }
  
  // Get all unique tags for the sidebar
  const allTags = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(t => {
      allTags.add(t);
    });
  });
  
  // Use decodedTag for display
  const displayTag = decodedTag;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <Link 
          href="/" 
          className="text-[#00f5ff]/70 hover:text-[#00f5ff] transition-colors"
        >
          首页
        </Link>
        <span className="mx-2 text-[#00f5ff]/30">/</span>
        <span className="text-[#00f5ff]/70">标签</span>
        <span className="mx-2 text-[#00f5ff]/30">/</span>
        <span className="text-[#e0e0e0]">#{tag}</span>
      </nav>

      {/* Header */}
      <header className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#b829dd]/10 border border-[#b829dd]/30 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-[#b829dd] animate-pulse"></span>
          <span className="text-sm text-[#b829dd] font-mono">TAG</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-[#00f5ff] to-[#b829dd] bg-clip-text text-transparent">
            #{displayTag}
          </span>
        </h1>
        
        <p className="text-[#888]">
          共 <span className="text-[#00f5ff] font-bold">{filteredPosts.length}</span> 篇文章
        </p>
      </header>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Posts List */}
        <div className="lg:col-span-3 space-y-6">
          {filteredPosts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        {/* Sidebar - All Tags */}
        <aside className="space-y-6">
          <div className="bg-[#12121a] border border-[#00f5ff]/20 rounded-lg p-6">
            <h3 className="text-lg font-bold text-[#e0e0e0] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00f5ff]"></span>
              所有标签
            </h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(allTags).sort().map(t => (
                <Link
                  key={t}
                  href={`/tags/${encodeURIComponent(t)}`}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 ${
                    t === decodedTag
                      ? 'bg-[#b829dd]/30 text-[#b829dd] border-[#b829dd]/50'
                      : 'bg-[#00f5ff]/5 text-[#00f5ff]/70 border-[#00f5ff]/20 hover:bg-[#00f5ff]/10 hover:border-[#00f5ff]/40'
                  }`}
                >
                  #{t}
                </Link>
              ))}
            </div>
          </div>

          {/* Back to Home */}
          <Link
            href="/"
            className="block bg-[#12121a] border border-[#00f5ff]/20 rounded-lg p-4 text-center group hover:border-[#00f5ff]/50 transition-all duration-300"
          >
            <span className="text-[#00f5ff] group-hover:translate-x-[-4px] transition-transform inline-flex items-center gap-2">
              <span>←</span>
              <span>返回首页</span>
            </span>
          </Link>
        </aside>
      </div>
    </div>
  );
}
