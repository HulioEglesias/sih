"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.user.create({
        data: {
            id: "cm1pyyzil0000imegsnxjnsgj",
            login: "hulio",
            password: "$2b$10$84NMCHbbUnLheR6yD3EPre12HJ5U4lfnRLMh77qj9GWKVX/U/afAi",
            balance: 500,
        },
    });
    yield prisma.item.create({
        data: {
            id: "cm1pz1q420000hz9f5ps2flm2",
            title: "Item 1",
            price: 100,
            ownerId: null,
        },
    });
    yield prisma.transaction.create({
        data: {
            id: "cm1pz1q420000hz9f5ps2fdm2",
            type: client_1.TransactionType.DEPOSIT,
            value: 500,
            userId: "cm1pyyzil0000imegsnxjnsgj",
        },
    });
});
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
