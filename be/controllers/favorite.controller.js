const favoritesData = require("../temp/favorites.json");

// GET FAVORITES
const getFavorites = (req, res) => {
  const { userId } = req.params;

  const userFav = favoritesData.find(
    (item) => item.user_id === userId
  );

  if (!userFav) {
    return res.status(200).json([]);
  }

  return res.status(200).json(userFav.property_ids);
};

// TOGGLE FAVORITE
const toggleFavorite = (req, res) => {
  const { userId, propertyId } = req.body;

  let userFav = favoritesData.find(
    (item) => item.user_id === userId
  );

  // nếu chưa có user -> tạo mới
  if (!userFav) {
    userFav = {
      user_id: userId,
      property_ids: [propertyId],
    };
    favoritesData.push(userFav);
  } else {
    const exists = userFav.property_ids.includes(propertyId);

    if (exists) {
      userFav.property_ids = userFav.property_ids.filter(
        (id) => id !== propertyId
      );
    } else {
      userFav.property_ids.push(propertyId);
    }
  }

  return res.status(200).json({
    message: "Updated",
    data: userFav.property_ids,
  });
};

module.exports = { getFavorites, toggleFavorite };