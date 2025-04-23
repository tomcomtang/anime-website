"use client"

// 直接导入JSON数据
import popularAnimeData from "@/public/json/popular-anime.json"
import AnimeGrid from "@/components/anime-grid"
import { useLanguage } from "@/lib/i18n/language-context"

export default function PopularPage() {
  const { t } = useLanguage()

  // 使用导入的数据
  const animes = popularAnimeData

  return (
    <div className="pt-16">
      <AnimeGrid animes={animes} title={t.home.popularAnime} />
    </div>
  )
}
