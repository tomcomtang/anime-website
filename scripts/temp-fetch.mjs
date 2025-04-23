// This is a temporary file to execute the server action during build
import { fetchAllAndGenerateJson } from '../lib/actions.ts';

async function main() {
  try {
    console.log('Fetching anime data...');
    await fetchAllAndGenerateJson('out/json');
    console.log('Successfully generated anime data JSON files');
    process.exit(0);
  } catch (error) {
    console.error('Error generating anime data:', error);
    process.exit(1);
  }
}

main();
