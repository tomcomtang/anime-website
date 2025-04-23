"use client"

import { useState } from "react"
import Link from "next/link"
import { Play } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { formatTranslation } from "@/lib/i18n/translations"

type EpisodeListProps = {
  animeId: number
  episodeCount: number
  currentEpisode?: number
}

export default function EpisodeList({ animeId, episodeCount, currentEpisode }: EpisodeListProps) {
  const { t } = useLanguage()
  const [selectedEpisode, setSelectedEpisode] = useState(currentEpisode || 1)

  // Generate episodes array
  const episodes = Array.from({ length: episodeCount || 12 }, (_, i) => i + 1)

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">{t.anime.episodeList}</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {episodes.map((episode) => (
          <Link
            key={episode}
            href={`/watch/${animeId}/${episode}`}
            className={`episode-card flex items-center justify-between p-3 border rounded-md transition-colors ${
              episode === selectedEpisode ? "active border-rose-500" : "border-gray-700"
            }`}
            onClick={() => setSelectedEpisode(episode)}
          >
            <span className="font-medium">{formatTranslation(t.anime.episode, { number: episode })}</span>
            <Play className="h-4 w-4 text-rose-500" />
          </Link>
        ))}
      </div>
    </div>
  )
}
