//file connect database trung tâm
//Sau này toàn bộ controller đều dùng lại.

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;