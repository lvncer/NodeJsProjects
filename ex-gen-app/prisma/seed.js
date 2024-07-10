const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.vegetable.createMany({
    data: [
      {
        name: "Tomato",
        price: 2.5,
        description: "Fresh red tomatoes",
        stock: 100,
      },
      {
        name: "Cucumber",
        price: 1.75,
        description: "Crunchy cucumbers",
        stock: 150,
      },
      {
        name: "Carrot",
        price: 1.2,
        description: "Organic carrots",
        stock: 200,
      },
      {
        name: "Lettuce",
        price: 1.0,
        description: "Crispy green lettuce",
        stock: 80,
      },
      {
        name: "Bell Pepper",
        price: 2.0,
        description: "Colorful bell peppers",
        stock: 60,
      },
      {
        name: "Broccoli",
        price: 2.25,
        description: "Fresh broccoli heads",
        stock: 70,
      },
      {
        name: "Spinach",
        price: 1.5,
        description: "Healthy spinach leaves",
        stock: 90,
      },
      {
        name: "Potato",
        price: 1.0,
        description: "Versatile potatoes",
        stock: 300,
      },
      {
        name: "Onion",
        price: 1.25,
        description: "Golden onions",
        stock: 120,
      },
      {
        name: "Garlic",
        price: 3.0,
        description: "Aromatic garlic bulbs",
        stock: 50,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
