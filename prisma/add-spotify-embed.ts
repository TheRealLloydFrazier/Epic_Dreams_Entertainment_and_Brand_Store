import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get Lloyd Frazier's current record
  const lloydFrazier = await prisma.artist.findUnique({
    where: { slug: 'lloyd-frazier' }
  });

  if (!lloydFrazier) {
    console.log('Lloyd Frazier artist not found');
    return;
  }

  // Update socials to include spotifyEmbed
  const currentSocials = (lloydFrazier.socials as Record<string, string>) || {};
  const updatedSocials = {
    ...currentSocials,
    spotifyEmbed: 'https://open.spotify.com/embed/artist/2KXWFz3CD7BXxrPfTk0xTw?utm_source=generator'
  };

  await prisma.artist.update({
    where: { slug: 'lloyd-frazier' },
    data: { socials: updatedSocials }
  });

  console.log('Successfully added Spotify embed to Lloyd Frazier profile');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
