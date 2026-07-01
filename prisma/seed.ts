// prisma/seeds/categories.seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  "Eating out",
  "Drinking"
];

async function seedCategories() {
  for (const name of categories) {
    await prisma.categories.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
        authorId: null,
      },
    });
  }

  console.log(`Seeded ${categories.length} categories`);
}

seedCategories()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });