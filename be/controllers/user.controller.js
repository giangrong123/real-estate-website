const prisma = require("../libs/prisma");
const bcrypt = require("bcrypt");

// ==============================
// GET ME
// ==============================
const getMe = async (req, res) => {
  try {
    const user = req.user;

    const { password, ...safeUser } =
      user;

    return res.status(200).json({
      user: safeUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

// ==============================
// UPDATE PROFILE
// ==============================
const updateMe = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
    } = req.body;

    const updatedUser =
      await prisma.user.update({
        where: {
          id: req.user.id,
        },

        data: {
          name,
          email,
          phone,
        },
      });

    const {
      password,
      ...safeUser
    } = updatedUser;

    return res.status(200).json({
      message: "Update success",
      user: safeUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

// ==============================
// CHANGE PASSWORD
// ==============================
const changePassword = async (
  req,
  res
) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = req.user;

    // check current password
    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Mật khẩu hiện tại không đúng",
      });
    }

    // hash new password
    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    // update password
    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        password:
          hashedPassword,
      },
    });

    return res.status(200).json({
      message:
        "Đổi mật khẩu thành công",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

module.exports = {
  getMe,
  updateMe,
  changePassword,
};