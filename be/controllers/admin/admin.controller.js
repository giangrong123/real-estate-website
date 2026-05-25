const prisma = require("../../libs/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================ Dashboard =================
const getDashboard = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalProperties = await prisma.property.count();
    const totalProjects = await prisma.project.count();
    const totalNews = await prisma.news.count();
    const pendingProperties = await prisma.property.count({
      where: {
        isApproved: false,
      },
    });
    const approvedProperties = await prisma.property.count({
      where: {
        isApproved: true,
      },
    });

    return res.status(200).json({
      success: true,

      data: {
        totalUsers,
        totalProperties,
        totalProjects,
        totalNews,
        pendingProperties,
        approvedProperties,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};


const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(401).json({
        message: "Email không tồn tại",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Sai mật khẩu",
      });
    }

    const { password: _, ...safeAdmin } = admin;

    const token = jwt.sign(
      {
        adminId: admin.id,
        type: "ADMIN",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      admin: safeAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

module.exports = { adminLogin };

// ===== GET USERS =====
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

// const getAdminProperties = async (
//   req,
//   res
// ) => {
//   try {
//     const properties =
//       await prisma.property.findMany({
//         orderBy: {
//           createdAt: "desc",
//         },
//       });

//     return res.status(200).json({
//       success: true,
//       data: properties,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//     });
//   }
// };

const getAdminProperties = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    const status = req.query.status;
    const approved = req.query.approved;

    let properties = [];
    let total = 0;

    // ĐANG BÁN
    if (status === "AVAILABLE") {
      properties = await prisma.property.findMany({
        where: { status: "AVAILABLE" },
        skip,
        take: limit,
        orderBy: { createdAt: "asc" },
      });

      total = await prisma.property.count({
        where: { status: "AVAILABLE" },
      });
    }

    // ĐÃ BÁN
    else if (status === "SOLD") {
      properties = await prisma.property.findMany({
        where: { status: "SOLD" },
        skip,
        take: limit,
        orderBy: { createdAt: "asc" },
      });

      total = await prisma.property.count({
        where: { status: "SOLD" },
      });
    }

    // CHỜ DUYỆT
    else if (approved === "false") {
      properties = await prisma.property.findMany({
        where: { isApproved: false },
        skip,
        take: limit,
        orderBy: { createdAt: "asc" },
      });

      total = await prisma.property.count({
        where: { isApproved: false },
      });
    }

    // TẤT CẢ
    else {
      properties = await prisma.property.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "asc" },
      });

      total = await prisma.property.count();
    }

    return res.status(200).json({
      success: true,
      data: properties,
      pagination: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
    });
  }
};

const approveProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await prisma.property.update({
      where: {
        id: Number(id),
      },

      data: {
        isApproved: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Approve thất bại",
    });
  }
};

module.exports = {
  getDashboard,
  adminLogin,
  getUsers,
  getAdminProperties,
  approveProperty,
};
