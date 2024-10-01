import { PrismaClient, TransactionType } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.create({
    data: {
      id: "cm1pyyzil0000imegsnxjnsgj",
      login: "hulio",
      password: "$2b$10$84NMCHbbUnLheR6yD3EPre12HJ5U4lfnRLMh77qj9GWKVX/U/afAi",
      balance: 500,
    },
  });

  await prisma.item.create({
    data: {
      id: "cm1pz1q420000hz9f5ps2flm2",
      title: "Item 1",
      price: 100,
      ownerId: null,
    },
  });

  await prisma.transaction.create({
    data: {
      id: "cm1pz1q420000hz9f5ps2fdm2",
      type: TransactionType.DEPOSIT,
      value: 500,
      userId: "cm1pyyzil0000imegsnxjnsgj",
    },
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
