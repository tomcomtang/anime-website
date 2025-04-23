"use client"

// 直接导入JSON数据
import newReleasesData from "@/public/json/new-releases-anime.json"
import AnimeGrid from "@/components/anime-grid"
import { useLanguage } from "@/lib/i18n/language-context"

export default function WeeklyPage() {
  const { t } = useLanguage()

  // 使用导入的数据并按下一集播出时间排序
  const animes = [...newReleasesData].sort((a, b) => {
    if (a.nextAiringEpisode && b.nextAiringEpisode) {
      return a.nextAiringEpisode.timeUntilAiring - b.nextAiringEpisode.timeUntilAiring
    }
    return 0
  })

  return (
    <div className="pt-16">
      <AnimeGrid animes={animes} title={t.home.weeklyUpdates} />
    </div>
  )
}
