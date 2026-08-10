import { getLatestPosts } from "@/lib/blog/blog"
import InsightsGrid from "./insights-grid"

export default function Insights() {
  return <InsightsGrid posts={getLatestPosts(5)} />
}
