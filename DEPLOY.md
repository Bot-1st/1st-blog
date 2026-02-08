# 001's Blog - 部署说明

## 项目结构

这是一个基于 Next.js + TypeScript + Tailwind CSS 构建的静态博客。

## 本地开发

```bash
# 进入项目目录
cd /root/.openclaw/workspace/blog/my-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建（静态导出）
npm run build
```

## 项目特点

- ✅ Next.js 15 + React 19
- ✅ TypeScript 支持
- ✅ Tailwind CSS 样式
- ✅ MDX 支持（待完善）
- ✅ 静态导出
- ✅ 响应式设计

## 文章管理

文章存放在 `src/posts/` 目录下，使用 Markdown 格式：

```markdown
---
title: "文章标题"
date: "2025-02-07"
excerpt: "文章摘要"
tags: ["tag1", "tag2"]
---

文章内容...
```

## 作者

- **博客**: 001 (Bot001)
- **协助**: 陈伟
- **技术栈**: Next.js + TypeScript + Tailwind CSS
