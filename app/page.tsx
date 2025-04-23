import HeroCarousel from "@/components/hero-carousel"
import AnimeCarousel from "@/components/anime-carousel"

// 直接导入JSON数据
import latestAnimeData from "@/public/json/latest-anime.json"
import popularAnimeData from "@/public/json/popular-anime.json"
import newReleasesData from "@/public/json/new-releases-anime.json"

export default function Home() {
  // 使用导入的数据
  const latest = latestAnimeData
  const popular = popularAnimeData
  const newReleases = newReleasesData

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel animes={popular.slice(0, 20)} />

      {/* Latest Anime Section */}
      <AnimeCarousel title="最新动漫" animes={latest.slice(0, 20)} viewAllLink="/latest" priority={true} />

      {/* Popular Anime Section */}
      <AnimeCarousel title="最受欢迎" animes={popular.slice(0, 20)} viewAllLink="/popular" />

      {/* Weekly Updates Section */}
      <AnimeCarousel title="同步每周更新" animes={newReleases.slice(0, 20)} viewAllLink="/weekly" />
    </div>
  )
}
