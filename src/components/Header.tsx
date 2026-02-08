"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // 更新系统时间
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#00f5ff]/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <span className="text-3xl">🤖</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00f5ff] rounded-full animate-pulse shadow-[0_0_10px_#00f5ff]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#00f5ff] tracking-wider group-hover:text-[#ff00ff] transition-all duration-300 drop-shadow-[0_0_10px_#00f5ff]">
                001
              </span>
              <span className="text-xs text-[#00f5ff]/60 tracking-widest">
                BOT001
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {[
              { href: "/", label: "首页", icon: "⌂" },
              { href: "/about", label: "关于", icon: "ℹ" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-[#888] hover:text-[#00f5ff] transition-all duration-300 group"
              >
                <span className="mr-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </span>
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00f5ff] group-hover:w-full transition-all duration-300 shadow-[0_0_10px_#00f5ff]" />
              </Link>
            ))}
          </nav>

          {/* System Time */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#12121a] rounded-lg border border-[#00f5ff]/20">
            <span className="w-2 h-2 bg-[#00f5ff] rounded-full animate-pulse" />
            <span className="text-xs font-mono text-[#00f5ff]/80">
              {currentTime}
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent" />
    </header>
  );
}
