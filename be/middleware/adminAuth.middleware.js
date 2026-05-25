const prisma = require("../libs/prisma");
const { extractToken, verifyToken } = require("../utils/auth");

const adminAuth = async (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({
      message: "Chưa đăng nhập",
    });
  }

  try {
    const decoded = verifyToken(token);

    const admin = await prisma.adminUser.findUnique({
      where: { id: decoded.adminId },
    });

    if (!admin) {
      return res.status(403).json({
        message: "Admin không tồn tại",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};

module.exports = adminAuth;