"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import AnimeCard from "@/components/anime-card"
import { useLanguage } from "@/lib/i18n/language-context"

// 直接导入JSON数据
import latestAnimeData from "@/public/json/latest-anime.json"
import popularAnimeData from "@/public/json/popular-anime.json"
import newReleasesData from "@/public/json/new-releases-anime.json"

type Anime = {
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

export default function SearchPage() {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchResults, setSearchResults] = useState<Anime[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 合并所有动漫数据并去重
  const allAnimes = [...latestAnimeData, ...popularAnimeData, ...newReleasesData]
  const uniqueAnimes = Array.from(new Map(allAnimes.map((item) => [item.id, item])).values())

  useEffect(() => {
    if (query) {
      setIsLoading(true)

      // 搜索逻辑
      const results = uniqueAnimes.filter((anime) => {
        const titleRomaji = anime.title.romaji?.toLowerCase() || ""
        const titleEnglish = anime.title.english?.toLowerCase() || ""
        const titleNative = anime.title.native?.toLowerCase() || ""
        const searchQuery = query.toLowerCase()

        return (
          titleRomaji.includes(searchQuery) || titleEnglish.includes(searchQuery) || titleNative.includes(searchQuery)
        )
      })

      setSearchResults(results)
      setIsLoading(false)
    } else {
      setSearchResults([])
      setIsLoading(false)
    }
  }, [query])

  // 根据当前语言选择搜索框占位符
  const getPlaceholder = () => {
    return t.search.placeholder
  }

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">{t.search.title}</h1>

        {/* 搜索框 */}
        <form action="/search" className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder={getPlaceholder()}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-1 rounded"
            >
              {t.nav.search}
            </button>
          </div>
        </form>

        {/* 搜索结果 */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">{t.common.loading}</p>
          </div>
        ) : query ? (
          <>
            <h2 className="text-xl font-medium mb-4">
              {searchResults.length > 0 ? `${t.search.results} (${searchResults.length})` : t.search.noResults}
            </h2>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {searchResults.map((anime) => (
                  <Link key={anime.id} href={`/anime/${anime.id}`}>
                    <AnimeCard anime={anime} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-800/50 rounded-lg">
                <p className="text-gray-400">{t.search.noResults}</p>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  )
}
