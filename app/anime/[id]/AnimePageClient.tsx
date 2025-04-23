"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Play, Calendar, Clock, Star, BarChart } from "lucide-react"
import EpisodeList from "@/components/episode-list"
import { useLanguage } from "@/lib/i18n/language-context"

// 直接导入JSON数据
import latestAnimeData from "@/public/json/latest-anime.json"
import popularAnimeData from "@/public/json/popular-anime.json"
import newReleasesData from "@/public/json/new-releases-anime.json"

// 合并所有动漫数据并去重
const allAnimes = [...latestAnimeData, ...popularAnimeData, ...newReleasesData]
const uniqueAnimes = Array.from(new Map(allAnimes.map((item) => [item.id, item])).values())

export default function AnimePageClient() {
  const { t, language } = useLanguage()
  const params = useParams()
  const [anime, setAnime] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.id) {
      const animeId = Number(params.id)
      const foundAnime = uniqueAnimes.find((a) => a.id === animeId)
      setAnime(foundAnime || null)
      setLoading(false)
    }
  }, [params?.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 pt-32 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/4 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!anime) {
    return (
      <div className="container mx-auto px-4 py-16 pt-32 text-center">
        <h1 className="text-2xl font-bold mb-4">{t.common.notFound}</h1>
        <p className="text-gray-400 mb-8">{t.common.notFoundDesc}</p>
        <Link href="/" className="text-rose-500 hover:underline">
          {t.common.backToHome}
        </Link>
      </div>
    )
  }

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
  const description = anime.description?.replace(/<[^>]*>?/gm, "") || t.common.noData

  // Format date based on language
  const getFormattedDate = () => {
    if (!anime.startDate?.year) return t.common.noData

    if (language === "en") {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      const month = anime.startDate.month ? months[anime.startDate.month - 1] : ""
      const day = anime.startDate.day || ""
      return `${month} ${day}, ${anime.startDate.year}`.trim()
    } else if (language === "ja") {
      return `${anime.startDate.year}年${anime.startDate.month ? `${anime.startDate.month}月` : ""}${anime.startDate.day ? `${anime.startDate.day}日` : ""}`
    } else {
      return `${anime.startDate.year}年${anime.startDate.month ? `${anime.startDate.month}月` : ""}${anime.startDate.day ? `${anime.startDate.day}日` : ""}`
    }
  }

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
    <div className="pt-16">
      {/* Banner */}
      <div className="relative h-[300px] md:h-[400px]">
        {anime.bannerImage ? (
          <Image src={anime.bannerImage || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
        ) : (
          <div className="w-full h-full bg-gray-800"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={anime.coverImage.large || anime.coverImage.medium}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-4 space-y-3">
              <Link
                href={`/watch/${anime.id}/1`}
                className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-md transition-colors w-full"
              >
                <Play className="h-5 w-5" />
                {t.anime.watchNow}
              </Link>
            </div>
          </div>

          {/* Details */}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>

            {anime.title.native && language !== "ja" && (
              <h2 className="text-xl text-gray-400 mb-4">{anime.title.native}</h2>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {anime.genres.map((genre) => (
                <span key={genre} className="text-sm bg-gray-800 px-3 py-1 rounded-full">
                  {genre}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm mb-1">{t.anime.status.releasing}</span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-rose-500" />
                  {getStatusText()}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-400 text-sm mb-1">{t.anime.firstAirDate}</span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-rose-500" />
                  {getFormattedDate()}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-400 text-sm mb-1">{t.anime.score}</span>
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-rose-500" />
                  {anime.averageScore ? `${anime.averageScore / 10} / 10` : t.common.noData}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-400 text-sm mb-1">{t.anime.popularity}</span>
                <span className="flex items-center">
                  <BarChart className="h-4 w-4 mr-1 text-rose-500" />
                  {anime.popularity?.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{t.anime.synopsis}</h3>
              <p className="text-gray-300 whitespace-pre-line">{description}</p>
            </div>

            {/* Studios */}
            {anime.studios && anime.studios.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">{t.anime.studios}</h3>
                <div className="flex flex-wrap gap-2">
                  {anime.studios.map((studio, index) => (
                    <span key={index} className="text-sm bg-gray-800 px-3 py-1 rounded-full">
                      {studio}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Episode List */}
        <EpisodeList animeId={anime.id} episodeCount={anime.episodes} />
      </div>
    </div>
  )
}
