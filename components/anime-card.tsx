"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Star } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

type AnimeCardProps = {
  anime: {
    id: number
    title: {
      romaji: string
      english: string
      native: string
    }
    description: string
    coverImage: {
      large: string
      medium: string
    }
    genres: string[]
    episodes: number
    status: string
    season: string
    seasonYear: number
    averageScore: number
    popularity: number
    startDate: {
      year: number
      month: number
      day: number
    }
  }
  priority?: boolean
}

export default function AnimeCard({ anime, priority = false }: AnimeCardProps) {
  const { t, language } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)

  // 根据当前语言选择合适的标题
  const getTitle = () => {
    if (language === "ja" && anime.title.native) {
      return anime.title.native
    } else if (language === "en" && anime.title.english) {
      return anime.title.english
    } else {
      return anime.title.english || anime.title.romaji
    }
  }

  const title = getTitle()

  // 格式化日期
  const formattedDate = anime.startDate?.year
    ? language === "en"
      ? `${anime.startDate.year}${anime.startDate.month ? `-${anime.startDate.month}` : ""}`
      : language === "ja"
        ? `${anime.startDate.year}年${anime.startDate.month || ""}月`
        : `${anime.startDate.year}年${anime.startDate.month || ""}月`
    : t.common.noData

  // 获取状态文本
  const getStatusText = () => {
    switch (anime.status) {
      case "RELEASING":
        return t.anime.status.releasing
      case "FINISHED":
        return t.anime.status.finished
      case "NOT_YET_RELEASED":
        return t.anime.status.notYetReleased
      default:
        return t.anime.status.unknown
    }
  }

  return (
    <div
      className="relative anime-card-hover rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-gray-800">
        <Image
          src={anime.coverImage.large || anime.coverImage.medium}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
        />

        {/* Score Badge */}
        {anime.averageScore && (
          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
            <Star className="h-3 w-3 text-yellow-400 mr-1" />
            {anime.averageScore / 10}
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 right-2 bg-rose-600 text-white text-xs px-2 py-1 rounded">{getStatusText()}</div>

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/70 flex flex-col p-4 transition-opacity duration-300">
            <h3 className="font-bold text-sm mb-1 line-clamp-2">{title}</h3>

            <div className="text-xs text-gray-300 mb-2">
              {formattedDate} · {anime.episodes ? `${anime.episodes} ${t.anime.episodes}` : t.common.noData}
            </div>

            <p className="text-xs text-gray-300 line-clamp-3 mb-auto">
              {anime.description?.replace(/<[^>]*>?/gm, "") || t.common.noData}
            </p>

            <div className="mt-2 flex gap-2">
              <Link
                href={`/watch/${anime.id}/1`}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-xs py-2 rounded flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Play className="h-3 w-3 mr-1" />
                {t.home.watchNow}
              </Link>

              <Link
                href={`/anime/${anime.id}`}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-xs py-2 rounded flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {t.home.details}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Title (visible when not hovered) */}
      <div className="p-2">
        <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
        <div className="text-xs text-gray-400">
          {anime.episodes ? `${anime.episodes} ${t.anime.episodes}` : t.common.noData}
        </div>
      </div>
    </div>
  )
}
