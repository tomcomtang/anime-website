"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules"
import { Play, Info } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"

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
  bannerImage: string
  genres: string[]
  episodes: number
  status: string
  season: string
  seasonYear: number
  averageScore: number
  popularity: number
}

export default function HeroCarousel({ animes }: { animes: Anime[] }) {
  const { t, language } = useLanguage()
  const [featuredAnimes, setFeaturedAnimes] = useState<Anime[]>([])

  useEffect(() => {
    // Select 5 random animes from the top 20 for the hero carousel
    if (animes && animes.length > 0) {
      const topAnimes = animes.slice(0, 20)
      const shuffled = [...topAnimes].sort(() => 0.5 - Math.random())
      setFeaturedAnimes(shuffled.slice(0, 5))
    }
  }, [animes])

  if (featuredAnimes.length === 0) {
    return <div className="h-[70vh] bg-gray-800 animate-pulse"></div>
  }

  // 根据当前语言选择合适的标题
  const getTitle = (anime: Anime) => {
    if (language === "ja" && anime.title.native) {
      return anime.title.native
    } else if (language === "en" && anime.title.english) {
      return anime.title.english
    } else {
      return anime.title.english || anime.title.romaji
    }
  }

  return (
    <div className="hero-carousel relative h-[70vh] mt-16">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect={"fade"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="w-full h-full"
      >
        {featuredAnimes.map((anime) => (
          <SwiperSlide key={anime.id} className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>

            {anime.bannerImage ? (
              <Image
                src={anime.bannerImage || "/placeholder.svg"}
                alt={getTitle(anime)}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <Image
                src={anime.coverImage.large || "/placeholder.svg"}
                alt={getTitle(anime)}
                fill
                className="object-cover"
                priority
              />
            )}

            <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-4 pb-16 md:pb-24">
              <div className="max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">{getTitle(anime)}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {anime.genres.slice(0, 3).map((genre) => (
                    <span key={genre} className="text-xs bg-rose-500/20 text-rose-500 px-2 py-1 rounded">
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 line-clamp-3">
                  {anime.description?.replace(/<[^>]*>?/gm, "") || t.common.noData}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/watch/${anime.id}/1`}
                    className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-md transition-colors"
                  >
                    <Play className="h-5 w-5" />
                    {t.home.watchNow}
                  </Link>
                  <Link
                    href={`/anime/${anime.id}`}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-md transition-colors"
                  >
                    <Info className="h-5 w-5" />
                    {t.home.details}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
