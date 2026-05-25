const validateCreateProperty = (req, res, next) => {
  const { title, address, description, price, area, typeId } = req.body;

  // ===== TITLE =====
  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  // ===== ADDRESS =====
  if (!address || address.trim() === "") {
    return res.status(400).json({ message: "Address is required" });
  }

  // ===== DESCRIPTION =====
  if (!description || description.trim() === "") {
    return res.status(400).json({ message: "Description is required" });
  }

  // ===== PRICE =====
  if (!price || price <= 0) {
    return res.status(400).json({ message: "Price must be greater than 0" });
  }

  // ===== AREA =====
  if (!area || area <= 0) {
    return res.status(400).json({ message: "Area must be greater than 0" });
  }

  // ===== TYPE =====
  if (!typeId) {
    return res.status(400).json({ message: "Type is required" });
  }

  next();
};

module.exports = validateCreateProperty;
