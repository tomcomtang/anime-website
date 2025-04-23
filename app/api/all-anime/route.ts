export const dynamic = "force-static"

import { NextResponse } from "next/server"

// 直接导入JSON数据
import latestAnimeData from "@/public/json/latest-anime.json"
import popularAnimeData from "@/public/json/popular-anime.json"
import newReleasesData from "@/public/json/new-releases-anime.json"

// 返回所有数据的组合
export async function GET() {
  const data = {
    latest: latestAnimeData,
    popular: popularAnimeData,
    newReleases: newReleasesData,
    generatedAt: new Date().toISOString(),
  }

  return NextResponse.json(data)
}
