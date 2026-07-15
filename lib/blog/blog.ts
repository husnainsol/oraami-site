import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

export interface BlogPost {
  slug: string
  title: string
  description: string
  excerpt: string
  date: string
  category: string
  readingTime: string
  featured: boolean
}

const postsDirectory = path.join(process.cwd(), "content/blog")

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return []

  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, "")
      const fileContents = fs.readFileSync(path.join(postsDirectory, fileName), "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || "",
        description: data.description || "",
        excerpt: data.excerpt || data.description || `${content.slice(0, 160).trim()}…`,
        date: data.date || "",
        category: data.category || "Article",
        readingTime: readingTime(content).text,
        featured: Boolean(data.featured),
      } as BlogPost
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function formatDate(iso: string): string {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}
