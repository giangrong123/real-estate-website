import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import properties from "./data/properties.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // =========================
  // 1. HASH PASSWORD
  // =========================
  const hashedPassword = await bcrypt.hash("123456", 10);

  // =========================
  // 2. CREATE USERS
  // =========================
  await prisma.user.createMany({
    data: [
      {
        name: "User 1",
        email: "user1@gmail.com",
        password: hashedPassword,
      },
      {
        name: "User 2",
        email: "user2@gmail.com",
        password: hashedPassword,
      },
      {
        name: "User 3",
        email: "user3@gmail.com",
        password: hashedPassword,
      },
      {
        name: "User 4",
        email: "user4@gmail.com",
        password: hashedPassword,
      },
      {
        name: "User 5",
        email: "user5@gmail.com",
        password: hashedPassword,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Users created");

  // =========================
  // 3. CREATE ADMINS
  // =========================
  await prisma.adminUser.createMany({
    data: [
      {
        name: "Admin 1",
        email: "admin1@gmail.com",
        password: hashedPassword,
      },
      {
        name: "Admin 2",
        email: "admin2@gmail.com",
        password: hashedPassword,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Admins created");

  // =========================
  // 4. PROPERTY TYPES
  // =========================
  await prisma.propertyType.createMany({
  data: [
    { name: "Nhà phố" },
    { name: "Chung cư" },
    { name: "Đất nền" },
    { name: "Biệt thự" },
  ],
  skipDuplicates: true,
});

  console.log("✅ Property types created");

  // =========================
  // 5. CREATE PROPERTIES + IMAGES
  // =========================
  for (const item of properties) {
    const property = await prisma.property.create({
      data: {
        title: item.title,
        thumbnail: item.thumbnail,
        description: item.description,
        address: item.address,
        price: item.price,
        area: item.area,
        bedrooms: item.bedrooms,
        bathrooms: item.bathrooms,
        direction: item.direction,
        legalStatus: item.legalStatus,
        furniture: item.furniture,
        status: item.status,
        isApproved: item.isApproved,
        isFeatured: item.isFeatured,
        expiredAt: item.expiredAt ? new Date(item.expiredAt) : null,

        userId: item.userId,
        typeId: item.typeId,
        approvedBy: item.approvedBy,
      },
    });

    // create images
    if (item.images && item.images.length > 0) {
      await prisma.propertyImage.createMany({
        data: item.images.map((image) => ({
          propertyId: property.id,
          imageUrl: image,
        })),
      });
    }
  }

  console.log("✅ Properties + Images created");

  console.log("🎉 SEED DONE SUCCESSFULLY!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });