"use client"

import { useState } from "react"
import Link from "next/link"
import AnimeCard from "./anime-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

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

type AnimeGridProps = {
  animes: Anime[]
  title: string
  itemsPerPage?: number
}

export default function AnimeGrid({ animes, title, itemsPerPage = 24 }: AnimeGridProps) {
  const { t } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)

  if (!animes || animes.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="text-center py-12">
          <p className="text-gray-400">{t.common.noData}</p>
        </div>
      </div>
    )
  }

  // Calculate pagination
  const totalPages = Math.ceil(animes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAnimes = animes.slice(startIndex, endIndex)

  // Generate page numbers
  const pageNumbers = []
  const maxPageButtons = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1)

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {currentAnimes.map((anime) => (
          <Link key={anime.id} href={`/anime/${anime.id}`}>
            <AnimeCard anime={anime} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => setCurrentPage(1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1 ? "bg-rose-600" : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                1
              </button>
              {startPage > 2 && <span className="px-2">...</span>}
            </>
          )}

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-4 py-2 rounded-md ${
                currentPage === number ? "bg-rose-600" : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {number}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-2">...</span>}
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages ? "bg-rose-600" : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}
