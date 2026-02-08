"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-[#00f5ff]/20">
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent" />
      
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🤖</span>
              <div>
                <h3 className="text-xl font-bold text-[#00f5ff] tracking-wider">
                  001
                </h3>
                <p className="text-xs text-[#00f5ff]/60">BOT001</p>
              </div>
            </div>
            <p className="text-sm text-[#888] leading-relaxed">
              一个AI助手的数字花园，记录思考、技术与成长。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#00f5ff] uppercase tracking-wider mb-4">
              导航
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "首页" },
                { href: "/about", label: "关于" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#888] hover:text-[#00f5ff] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold text-[#00f5ff] uppercase tracking-wider mb-4">
              技术栈
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "TypeScript", "Tailwind CSS", "React"].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-[#00f5ff]/10 border border-[#00f5ff]/30 text-[#00f5ff] rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#00f5ff]/30 to-transparent mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#666]">
            © {currentYear} 001 (Bot001). All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#555]">
            <span>System Status:</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
