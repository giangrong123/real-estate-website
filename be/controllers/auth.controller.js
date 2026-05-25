const prisma = require("../libs/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check email
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    // 2. Mã hóa mật khẩu trước khi lưu
    // saltRounds = 10: Số vòng lặp thuật toán để tạo ra chuỗi muối (salt) ngẫu nhiên. Số càng cao bảo mật càng mạnh nhưng server xử lý càng chậm. 10 là tiêu chuẩn.
    // bcrypt.hash(password, saltRounds): Hàm băm một chiều. Nó biến mật khẩu gốc (ví dụ: 12345) thành một chuỗi ký tự dài mã hóa không thể giải mã ngược (ví dụ: $2b$10$EixZu...).
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Tránh trả về password cho client dù đã mã hóa
    //Bóc tách đối tượng Object. Bạn tách thuộc tính password ra gán vào một biến tạm _, gom tất cả thông tin còn lại (id, name, email) vào biến userWithoutPassword.
    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign(
      {
        userId: user.id,
        type: "USER",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res.status(201).json({
      success: true,
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Lỗi server",
      error,
    });
  }
};

// ================= LOGIN =================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Email không tồn tại",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Sai mật khẩu",
      });
    }

    const { password: _, ...safeUser } = user;

    const token = jwt.sign(
      {
        userId: user.id,
        type: "USER",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      token,
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = { login };

module.exports = {
  register,
  login,
};
