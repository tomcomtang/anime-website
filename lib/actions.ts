"use server"

// This file is kept for reference but is not used in the build process
// All data fetching is now done in scripts/fetch-anime-data.js during build

import fs from "fs"
import path from "path"

// AniList GraphQL API endpoint
const ANILIST_API = "https://graphql.anilist.co"

// GraphQL query for latest anime (recently updated)
const LATEST_ANIME_QUERY = `
  query {
    Page(page: 1, perPage: 50) {
      media(type: ANIME, sort: UPDATED_AT_DESC, status_not: NOT_YET_RELEASED) {
        id
        title {
          romaji
          english
          native
        }
        description
        coverImage {
          large
          medium
        }
        bannerImage
        genres
        episodes
        status
        season
        seasonYear
        format
        averageScore
        popularity
        studios {
          nodes {
            name
          }
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    }
  }
`

// GraphQL query for popular anime
const POPULAR_ANIME_QUERY = `
  query {
    Page(page: 1, perPage: 50) {
      media(type: ANIME, sort: POPULARITY_DESC, status_not: NOT_YET_RELEASED) {
        id
        title {
          romaji
          english
          native
        }
        description
        coverImage {
          large
          medium
        }
        bannerImage
        genres
        episodes
        status
        season
        seasonYear
        format
        averageScore
        popularity
        studios {
          nodes {
            name
          }
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    }
  }
`

// GraphQL query for new releases (recently started airing)
const NEW_RELEASES_QUERY = `
  query {
    Page(page: 1, perPage: 50) {
      media(type: ANIME, sort: START_DATE_DESC, status: RELEASING) {
        id
        title {
          romaji
          english
          native
        }
        description
        coverImage {
          large
          medium
        }
        bannerImage
        genres
        episodes
        status
        season
        seasonYear
        format
        averageScore
        popularity
        studios {
          nodes {
            name
          }
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    }
  }
`

// Function to fetch data from AniList GraphQL API
async function fetchFromAniList(query: string) {
  try {
    const response = await fetch(ANILIST_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching from AniList:", error)
    throw error
  }
}

// Function to transform anime data into a cleaner format
function transformAnimeData(data: any) {
  if (!data || !data.data || !data.data.Page || !data.data.Page.media) {
    return []
  }

  return data.data.Page.media.map((anime: any) => ({
    id: anime.id,
    title: {
      romaji: anime.title.romaji,
      english: anime.title.english,
      native: anime.title.native,
    },
    description: anime.description,
    coverImage: {
      large: anime.coverImage.large,
      medium: anime.coverImage.medium,
    },
    bannerImage: anime.bannerImage,
    genres: anime.genres,
    episodes: anime.episodes,
    status: anime.status,
    season: anime.season,
    seasonYear: anime.seasonYear,
    format: anime.format,
    averageScore: anime.averageScore,
    popularity: anime.popularity,
    studios: anime.studios.nodes.map((studio: any) => studio.name),
    startDate: anime.startDate,
    endDate: anime.endDate,
    nextAiringEpisode: anime.nextAiringEpisode,
  }))
}

// Server action to fetch latest anime
export async function fetchLatestAnime() {
  const data = await fetchFromAniList(LATEST_ANIME_QUERY)
  return transformAnimeData(data)
}

// Server action to fetch popular anime
export async function fetchPopularAnime() {
  const data = await fetchFromAniList(POPULAR_ANIME_QUERY)
  return transformAnimeData(data)
}

// Server action to fetch new releases
export async function fetchNewReleases() {
  const data = await fetchFromAniList(NEW_RELEASES_QUERY)
  return transformAnimeData(data)
}

// Server action to generate JSON files
export async function generateJsonFiles(
  data: {
    latest: any[] | null
    popular: any[] | null
    newReleases: any[] | null
  },
  outputDir = "public/json",
) {
  const jsonDir = path.join(process.cwd(), outputDir)

  // Create directory if it doesn't exist
  try {
    if (!fs.existsSync(jsonDir)) {
      fs.mkdirSync(jsonDir, { recursive: true })
    }
  } catch (error) {
    console.error("Error creating directory:", error)
    throw new Error(`Failed to create JSON directory: ${jsonDir}`)
  }

  const generatedFiles = []

  // Generate latest anime JSON file
  if (data.latest && data.latest.length > 0) {
    const latestFilePath = path.join(jsonDir, "latest-anime.json")
    fs.writeFileSync(latestFilePath, JSON.stringify(data.latest, null, 2))
    generatedFiles.push("latest-anime.json")
  }

  // Generate popular anime JSON file
  if (data.popular && data.popular.length > 0) {
    const popularFilePath = path.join(jsonDir, "popular-anime.json")
    fs.writeFileSync(popularFilePath, JSON.stringify(data.popular, null, 2))
    generatedFiles.push("popular-anime.json")
  }

  // Generate new releases JSON file
  if (data.newReleases && data.newReleases.length > 0) {
    const newReleasesFilePath = path.join(jsonDir, "new-releases-anime.json")
    fs.writeFileSync(newReleasesFilePath, JSON.stringify(data.newReleases, null, 2))
    generatedFiles.push("new-releases-anime.json")
  }

  // Generate combined data JSON file
  if (
    (data.latest && data.latest.length > 0) ||
    (data.popular && data.popular.length > 0) ||
    (data.newReleases && data.newReleases.length > 0)
  ) {
    const combinedData = {
      latest: data.latest || [],
      popular: data.popular || [],
      newReleases: data.newReleases || [],
      generatedAt: new Date().toISOString(),
    }

    const combinedFilePath = path.join(jsonDir, "anime-data.json")
    fs.writeFileSync(combinedFilePath, JSON.stringify(combinedData, null, 2))
    generatedFiles.push("anime-data.json")
  }

  return generatedFiles.map((file) => `${outputDir}/${file}`)
}

// Function to fetch all anime data and generate JSON files
export async function fetchAllAndGenerateJson(outputDir = "public/json") {
  console.log("Fetching anime data from AniList API...")

  try {
    // Fetch all data types in parallel
    const [latest, popular, newReleases] = await Promise.all([
      fetchLatestAnime(),
      fetchPopularAnime(),
      fetchNewReleases(),
    ])

    console.log(`Fetched ${latest.length} latest anime`)
    console.log(`Fetched ${popular.length} popular anime`)
    console.log(`Fetched ${newReleases.length} new releases`)

    // Generate JSON files
    const files = await generateJsonFiles({ latest, popular, newReleases }, outputDir)

    console.log("Generated JSON files:")
    files.forEach((file) => console.log(`- ${file}`))

    return files
  } catch (error) {
    console.error("Error fetching and generating JSON:", error)
    throw error
  }
}
