export const dynamic = "force-static"

import { NextResponse } from "next/server"
import popularAnimeData from "@/public/json/popular-anime.json"

export async function GET() {
  return NextResponse.json(popularAnimeData)
}
