const propertiesData = require("../temp/property.json");

const usersData = require("../temp/users.json");

//
// GET ALL
//
const getProperties = (req, res) => {
  try {
    const search = req.query.search;

    if (!propertiesData || propertiesData.length === 0) {
      return res.status(200).json([]);
    }

    if (search) {
      const query = search.toLowerCase();

      const result = propertiesData.filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        );
      });

      return res.status(200).json(result);
    }

    return res.status(200).json(propertiesData);
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi hệ thống",
    });
  }
};

//
// GET BY ID
//
const getPropertyById = (req, res) => {
  const { id } = req.params;

  const property = propertiesData.find((item) => String(item.id) === id);

  if (!property) {
    return res.status(404).json({
      message: "Không tìm thấy bất động sản",
    });
  }

  const user = usersData.find((u) => u.id === property.user_id);

  return res.status(200).json({
    ...property,

    user,
  });
};

//
// CREATE PROPERTY
//
const createProperty = (req, res) => {
  try {
    const newProperty = req.body;

    propertiesData.unshift(newProperty);

    return res.status(201).json(newProperty);
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

const deleteProperty = (req, res) => {
  const { id } = req.params;

  const index = propertiesData.findIndex((item) => String(item.id) === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Không tìm thấy bài viết",
    });
  }

  propertiesData.splice(index, 1);

  return res.status(200).json({
    message: "Xóa thành công",
  });
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  deleteProperty,
};
