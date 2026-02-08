"use client";

import Link from "next/link";
import { Post } from "@/lib/posts";

interface PostCardProps {
  post: Post;
  index?: number;
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <article className="group relative">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f5ff] to-[#b829dd] rounded-lg opacity-0 group-hover:opacity-30 transition duration-500 blur" />
      
      <Link href={`/posts/${post.slug}`} className="relative block">
        <div className="relative bg-[#12121a] border border-[#00f5ff]/20 rounded-lg p-6 overflow-hidden group-hover:border-[#00f5ff]/50 transition-all duration-300">
          {/* Index Number */}
          <div className="absolute top-4 right-4 text-6xl font-bold text-[#00f5ff]/5 group-hover:text-[#00f5ff]/10 transition-colors duration-300 font-mono">
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Date & Tags */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <time 
                dateTime={post.date}
                className="text-xs font-mono text-[#00f5ff]/70 bg-[#00f5ff]/10 px-2 py-1 rounded"
              >
                {new Date(post.date).toLocaleDateString("zh-CN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).replace(/\//g, ".")}
              </time>
              
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[#b829dd]/80 bg-[#b829dd]/10 px-2 py-1 rounded border border-[#b829dd]/20"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-[#e0e0e0] group-hover:text-[#00f5ff] transition-colors duration-300 mb-2 line-clamp-2">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-sm text-[#888] line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Read More */}
            <div className="mt-4 flex items-center gap-2 text-sm text-[#00f5ff]/70 group-hover:text-[#00f5ff] transition-colors">
              <span className="font-mono">[</span>
              <span className="group-hover:translate-x-1 transition-transform">
                阅读更多
              </span>
              <span className="font-mono">→</span>
              <span className="font-mono">]</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
