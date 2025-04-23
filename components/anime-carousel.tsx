"use client"

import { useRef } from "react"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { ChevronRight } from "lucide-react"
import AnimeCard from "./anime-card"
import { useLanguage } from "@/lib/i18n/language-context"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"

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

type AnimeCarouselProps = {
  title: string
  animes: Anime[]
  viewAllLink: string
  priority?: boolean
}

export default function AnimeCarousel({ title, animes, viewAllLink, priority = false }: AnimeCarouselProps) {
  const { t } = useLanguage()
  const swiperRef = useRef(null)

  if (!animes || animes.length === 0) {
    return null
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Link
            href={viewAllLink}
            className="flex items-center text-sm text-rose-500 hover:text-rose-400 transition-colors"
          >
            {t.home.viewAll}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="anime-carousel relative">
          <Swiper
            ref={swiperRef}
            slidesPerView={2}
            spaceBetween={16}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 24,
              },
            }}
            className="w-full"
          >
            {animes.map((anime) => (
              <SwiperSlide key={anime.id}>
                <Link href={`/anime/${anime.id}`}>
                  <AnimeCard anime={anime} priority={priority} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
