import AnimePageClient from "./AnimePageClient"

// 直接导入JSON数据
import latestAnimeData from "@/public/json/latest-anime.json"
import popularAnimeData from "@/public/json/popular-anime.json"
import newReleasesData from "@/public/json/new-releases-anime.json"

// 合并所有动漫数据并去重
const allAnimes = [...latestAnimeData, ...popularAnimeData, ...newReleasesData]

// 添加generateStaticParams函数，为所有动漫ID生成静态路径
export function generateStaticParams() {
  // 从导入的数据中提取所有唯一的动漫ID
  const uniqueIds = Array.from(new Set(allAnimes.map((anime) => anime.id)))

  // 返回所有ID的参数对象数组
  return uniqueIds.map((id) => ({
    id: id.toString(),
  }))
}

export default function AnimePage() {
  return <AnimePageClient />
}
