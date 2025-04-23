// This script fetches anime data and generates JSON files during the build process

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Determine if we're in production build
const isProduction = process.env.NODE_ENV === "production"

// Output directory - use 'out' for production builds, 'public/json' for development
const outputDir = isProduction ? "out/json" : "public/json"

console.log(`Starting anime data build process (${isProduction ? "production" : "development"} mode)`)
console.log(`Output directory: ${outputDir}`)

// Create the output directory if it doesn't exist
if (!fs.existsSync(path.join(process.cwd(), outputDir))) {
  fs.mkdirSync(path.join(process.cwd(), outputDir), { recursive: true })
  console.log(`Created output directory: ${outputDir}`)
}

// Create a temporary file that will call our server action
const tempFile = path.join(process.cwd(), "scripts", "temp-fetch.js")

// Write the temporary file content
fs.writeFileSync(
  tempFile,
  `
// This is a temporary file to execute the server action during build
import { fetchAllAndGenerateJson } from '../lib/actions';

async function main() {
  try {
    console.log('Fetching anime data...');
    await fetchAllAndGenerateJson('${outputDir}');
    console.log('Successfully generated anime data JSON files');
    process.exit(0);
  } catch (error) {
    console.error('Error generating anime data:', error);
    process.exit(1);
  }
}

main();
`,
)

try {
  // Execute the temporary file with Node.js
  console.log("Executing data fetch script...")
  execSync(
    `node --experimental-modules --experimental-specifier-resolution=node --loader ts-node/esm scripts/temp-fetch.mjs`,
    {
      stdio: "inherit",
    },
  )

  console.log("Anime data build completed successfully")
} catch (error) {
  console.error("Error during anime data build:", error)
  process.exit(1)
} finally {
  // Clean up the temporary file
  if (fs.existsSync(tempFile)) {
    fs.unlinkSync(tempFile)
  }
}
