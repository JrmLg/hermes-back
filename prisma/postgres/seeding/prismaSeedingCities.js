import seedCities from './seedCities.json' assert { type: 'json' };
import postgresClient from '../../../src/models/postgresClient.js';

async function main() {
  for (const city of seedCities) {
    const cityRecord = await postgresClient.zipCode.upsert({
      where: { code: city.code.toString() },
      create: {
        code: city.code.toString(),
        city: {
          connectOrCreate: {
            where: { name: city.name },
            create: { name: city.name },
          },
        },
      },
      update: {},
    });
  }
}

main().catch((e) => {
  throw e;
});
