const prisma =
  require("../libs/prisma");

const {
  extractToken,
  verifyToken,
} = require("../utils/auth");

const authAll = async (
  req,
  res,
  next
) => {
  const token =
    extractToken(req);

  if (!token) {
    return res.status(401).json({
      message:
        "Chưa đăng nhập",
    });
  }

  try {
    const decoded =
      verifyToken(token);

    // ===== USER =====
    if (decoded.userId) {
      const user =
        await prisma.user.findUnique(
          {
            where: {
              id: decoded.userId,
            },
          }
        );

      if (!user) {
        return res.status(403).json({
          message:
            "User không tồn tại",
        });
      }

      req.user = user;

      req.role = "USER";

      return next();
    }

    // ===== ADMIN =====
    if (decoded.adminId) {
      const admin =
        await prisma.adminUser.findUnique(
          {
            where: {
              id: decoded.adminId,
            },
          }
        );

      if (!admin) {
        return res.status(403).json({
          message:
            "Admin không tồn tại",
        });
      }

      req.admin = admin;

      req.role = "ADMIN";

      return next();
    }

    return res.status(401).json({
      message:
        "Unauthorized",
    });
  } catch {
    return res.status(401).json({
      message:
        "Token không hợp lệ",
    });
  }
};

module.exports = authAll;