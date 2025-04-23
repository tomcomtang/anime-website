// This script fetches anime data from AniList API and generates JSON files
// It's designed to be run manually before building the site

const fs = require("fs")
const path = require("path")
const https = require("https")

// AniList GraphQL API endpoint
const ANILIST_API = "https://graphql.anilist.co"

// Output directory - always use public/json
const outputDir = "public/json"
console.log(`Anime data will be saved to: ${outputDir}`)

// Create the output directory if it doesn't exist
const fullOutputPath = path.join(process.cwd(), outputDir)
if (!fs.existsSync(fullOutputPath)) {
  fs.mkdirSync(fullOutputPath, { recursive: true })
  console.log(`Created output directory: ${fullOutputPath}`)
}

// GraphQL queries
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
function fetchFromAniList(query) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }

    const req = https.request(ANILIST_API, requestOptions, (res) => {
      let data = ""

      res.on("data", (chunk) => {
        data += chunk
      })

      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsedData = JSON.parse(data)
            resolve(parsedData)
          } catch (error) {
            reject(new Error(`Failed to parse response: ${error.message}`))
          }
        } else {
          reject(new Error(`API request failed with status ${res.statusCode}`))
        }
      })
    })

    req.on("error", (error) => {
      reject(error)
    })

    req.write(JSON.stringify({ query }))
    req.end()
  })
}

// Function to transform anime data into a cleaner format
function transformAnimeData(data) {
  if (!data || !data.data || !data.data.Page || !data.data.Page.media) {
    return []
  }

  return data.data.Page.media.map((anime) => ({
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
    studios: anime.studios.nodes.map((studio) => studio.name),
    startDate: anime.startDate,
    endDate: anime.endDate,
    nextAiringEpisode: anime.nextAiringEpisode,
  }))
}

// Function to generate JSON files
function generateJsonFiles(data) {
  const generatedFiles = []

  // Generate latest anime JSON file
  if (data.latest && data.latest.length > 0) {
    const latestFilePath = path.join(fullOutputPath, "latest-anime.json")
    fs.writeFileSync(latestFilePath, JSON.stringify(data.latest, null, 2))
    generatedFiles.push("latest-anime.json")
  }

  // Generate popular anime JSON file
  if (data.popular && data.popular.length > 0) {
    const popularFilePath = path.join(fullOutputPath, "popular-anime.json")
    fs.writeFileSync(popularFilePath, JSON.stringify(data.popular, null, 2))
    generatedFiles.push("popular-anime.json")
  }

  // Generate new releases JSON file
  if (data.newReleases && data.newReleases.length > 0) {
    const newReleasesFilePath = path.join(fullOutputPath, "new-releases-anime.json")
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

    const combinedFilePath = path.join(fullOutputPath, "anime-data.json")
    fs.writeFileSync(combinedFilePath, JSON.stringify(combinedData, null, 2))
    generatedFiles.push("anime-data.json")
  }

  return generatedFiles
}

// Main function to fetch all data and generate JSON files
async function fetchAllAndGenerateJson() {
  console.log("Fetching anime data from AniList API...")

  try {
    // Fetch all data types
    console.log("Fetching latest anime...")
    const latestData = await fetchFromAniList(LATEST_ANIME_QUERY)
    const latest = transformAnimeData(latestData)
    console.log(`Fetched ${latest.length} latest anime`)

    console.log("Fetching popular anime...")
    const popularData = await fetchFromAniList(POPULAR_ANIME_QUERY)
    const popular = transformAnimeData(popularData)
    console.log(`Fetched ${popular.length} popular anime`)

    console.log("Fetching new releases...")
    const newReleasesData = await fetchFromAniList(NEW_RELEASES_QUERY)
    const newReleases = transformAnimeData(newReleasesData)
    console.log(`Fetched ${newReleases.length} new releases`)

    // Generate JSON files
    console.log("Generating JSON files...")
    const files = generateJsonFiles({ latest, popular, newReleases })

    console.log("Generated JSON files:")
    files.forEach((file) => console.log(`- ${outputDir}/${file}`))

    // Create a metadata file with generation timestamp
    const metadataPath = path.join(fullOutputPath, "metadata.json")
    fs.writeFileSync(
      metadataPath,
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          totalAnime: latest.length + popular.length + newReleases.length,
          files: files,
        },
        null,
        2,
      ),
    )
    console.log(`- ${outputDir}/metadata.json`)

    console.log("Anime data generation completed successfully!")
    return true
  } catch (error) {
    console.error("Error fetching and generating JSON:", error)
    process.exit(1)
  }
}

// Execute the main function
fetchAllAndGenerateJson()
