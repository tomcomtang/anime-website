export const dynamic = "force-static"

import { NextResponse } from "next/server"
import latestAnimeData from "@/public/json/latest-anime.json"

export async function GET() {
  return NextResponse.json(latestAnimeData)
}
