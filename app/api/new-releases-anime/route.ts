export const dynamic = "force-static"

import { NextResponse } from "next/server"
import newReleasesData from "@/public/json/new-releases-anime.json"

export async function GET() {
  return NextResponse.json(newReleasesData)
}
