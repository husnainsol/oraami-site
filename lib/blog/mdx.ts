import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import rehypeSlug from "rehype-slug"
import rehypePrism from "rehype-prism-plus"
import remarkGfm from "remark-gfm"
import type { PluggableList } from "unified"
import type { BlogPost } from "./blog"

const contentPath = path.join(process.cwd(), "content/blog")

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm] as PluggableList,
    rehypePlugins: [rehypeSlug, [rehypePrism, { showLineNumbers: false }]] as PluggableList,
  },
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(contentPath)) return []
  return fs.readdirSync(contentPath).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
}

export async function getPostBySlug(slug: string): Promise<{ frontMatter: BlogPost; content: string }> {
  const realSlug = slug.replace(/\.mdx?$/, "")
  let fullPath = path.join(contentPath, `${realSlug}.mdx`)
  if (!fs.existsSync(fullPath)) fullPath = path.join(contentPath, `${realSlug}.md`)

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    frontMatter: {
      slug: realSlug,
      title: data.title || "",
      description: data.description || "",
      excerpt: data.excerpt || data.description || "",
      date: data.date || "",
      category: data.category || "Article",
      readingTime: readingTime(content).text,
      featured: Boolean(data.featured),
    } as BlogPost,
    content,
  }
}
