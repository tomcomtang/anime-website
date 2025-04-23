"use client"

// 直接导入JSON数据
import latestAnimeData from "@/public/json/latest-anime.json"
import AnimeGrid from "@/components/anime-grid"
import { useLanguage } from "@/lib/i18n/language-context"

export default function LatestPage() {
  const { t } = useLanguage()

  // 使用导入的数据并按人气排序
  const animes = [...latestAnimeData].sort((a, b) => b.popularity - a.popularity)

  return (
    <div className="pt-16">
      <AnimeGrid animes={animes} title={t.home.latestAnime} />
    </div>
  )
}
