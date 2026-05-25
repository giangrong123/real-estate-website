const prisma = require("../libs/prisma");

// ==============================
// GET FAVORITES
// ==============================
const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: Number(userId),
      },
    });

    // chỉ lấy propertyId
    const favoriteIds = favorites.map((item) =>
      String(item.propertyId)
    );

    return res.status(200).json({
  message: "Success",
  data: favoriteIds,
});
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Lỗi lấy favorites",
    });
  }
};

// ==============================
// TOGGLE FAVORITE
// ==============================
const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id;

  const { propertyId } = req.body;

    // kiểm tra đã tồn tại chưa
    const exists = await prisma.favorite.findFirst({
      where: {
        userId: Number(userId),
        propertyId: Number(propertyId),
      },
    });

    // nếu đã có -> xoá
    if (exists) {
      await prisma.favorite.delete({
        where: {
          id: exists.id,
        },
      });
    } else {
      // chưa có -> thêm mới
      await prisma.favorite.create({
        data: {
          userId: Number(userId),
          propertyId: Number(propertyId),
        },
      });
    }

    // lấy lại danh sách mới
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: Number(userId),
      },
    });

    const favoriteIds = favorites.map((item) =>
      String(item.propertyId)
    );

    return res.status(200).json({
      message: "Updated",
      data: favoriteIds,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Lỗi toggle favorite",
    });
  }
};

module.exports = {
  getFavorites,
  toggleFavorite,
};