import seedCities from "./seedCities.json" assert { type: 'json' };
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

for (const city of seedCities){
    const cityRecord = await prisma.zipCode.upsert({
      where: { code: city.code.toString() },
      create: {
        code: city.code.toString(),
        city: {
          connectOrCreate: {
            where: { name: city.name },
            create: { name: city.name },
          }
        }
      },
      update: {},
    })
  }

}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });