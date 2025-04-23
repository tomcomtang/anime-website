"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"
import EpisodeList from "@/components/episode-list"
import { useLanguage } from "@/lib/i18n/language-context"
import { formatTranslation } from "@/lib/i18n/translations"

// 直接导入JSON数据
import latestAnimeData from "@/public/json/latest-anime.json"
import popularAnimeData from "@/public/json/popular-anime.json"
import newReleasesData from "@/public/json/new-releases-anime.json"

// 合并所有动漫数据并去重
const allAnimes = [...latestAnimeData, ...popularAnimeData, ...newReleasesData]
const uniqueAnimes = Array.from(new Map(allAnimes.map((item) => [item.id, item])).values())

export default function WatchPageClient() {
  const { t, language } = useLanguage()
  const params = useParams()
  const [anime, setAnime] = useState(null)
  const [episodeNumber, setEpisodeNumber] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.id && params?.episode) {
      const animeId = Number(params.id)
      const episode = Number(params.episode)

      const foundAnime = uniqueAnimes.find((a) => a.id === animeId)
      setAnime(foundAnime || null)
      setEpisodeNumber(episode)
      setLoading(false)
    }
  }, [params?.id, params?.episode])

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
  const maxEpisode = anime.episodes || 12
  const prevEpisode = episodeNumber > 1 ? episodeNumber - 1 : null
  const nextEpisode = episodeNumber < maxEpisode ? episodeNumber + 1 : null

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold truncate">
            {title} - {formatTranslation(t.watch.episode, { number: episodeNumber })}
          </h1>

          <Link href={`/anime/${anime.id}`} className="flex items-center text-sm text-gray-400 hover:text-white">
            <Info className="h-4 w-4 mr-1" />
            {t.watch.details}
          </Link>
        </div>

        {/* Video Player (Placeholder) */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 mb-2">{t.watch.videoPlaceholder}</p>
              <p className="text-sm text-gray-500">{t.watch.videoPlaceholderDesc}</p>
            </div>
          </div>

          {/* Fallback image */}
          {anime.bannerImage && (
            <Image src={anime.bannerImage || "/placeholder.svg"} alt={title} fill className="object-cover opacity-30" />
          )}
        </div>

        {/* Episode Navigation */}
        <div className="flex justify-between mb-8">
          {prevEpisode ? (
            <Link
              href={`/watch/${anime.id}/${prevEpisode}`}
              className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              {t.watch.previousEpisode}
            </Link>
          ) : (
            <div></div>
          )}

          {nextEpisode ? (
            <Link
              href={`/watch/${anime.id}/${nextEpisode}`}
              className="flex items-center px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-md transition-colors"
            >
              {t.watch.nextEpisode}
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          ) : (
            <div></div>
          )}
        </div>

        {/* Episode List */}
        <EpisodeList animeId={anime.id} episodeCount={maxEpisode} currentEpisode={episodeNumber} />
      </div>
    </div>
  )
}
