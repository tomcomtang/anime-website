import WatchPageClient from "./WatchPageClient"

// 直接导入JSON数据
import latestAnimeData from "@/public/json/latest-anime.json"
import popularAnimeData from "@/public/json/popular-anime.json"
import newReleasesData from "@/public/json/new-releases-anime.json"

// 合并所有动漫数据并去重
const allAnimes = [...latestAnimeData, ...popularAnimeData, ...newReleasesData]
const uniqueAnimes = Array.from(new Map(allAnimes.map((item) => [item.id, item])).values())

// 添加generateStaticParams函数，为所有动漫的前3集生成静态路径
export function generateStaticParams() {
  const params = []

  // 为每个动漫生成前3集的参数
  for (const anime of uniqueAnimes) {
    const episodeCount = anime.episodes || 12
    const maxEpisodesToGenerate = Math.min(episodeCount, 3) // 限制每个动漫最多生成3集

    for (let i = 1; i <= maxEpisodesToGenerate; i++) {
      params.push({
        id: anime.id.toString(),
        episode: i.toString(),
      })
    }
  }

  return params
}

export default function WatchPage() {
  return <WatchPageClient />
}
