// controllers/auth.controller.js

const login = (req, res) => {
  // 1. Lấy dữ liệu trực tiếp từ request body
  const { email, password } = req.body;

  console.log("--- Đang thực hiện so sánh dữ liệu từ Body ---");

  // 2. Kiểm tra nếu người dùng gửi thiếu dữ liệu
  if (!email || !password) {
    return res.status(400).json({
      isAuthenticated: false,
      message: "Vui lòng nhập đầy đủ thông tin"
    });
  }

  // 3 so sánh
  if (email === "giang@gmail.com" && password === "123456") {
    // Nếu các giá trị trong body khớp với điều kiện
    return res.status(200).json({
      isAuthenticated: true,
      message: "Dữ liệu khớp - Đăng nhập thành công",
      user: {
      email: email, 
      name: "Giang"
    }
    });
  } else {
    // Nếu các giá trị trong body KHÔNG khớp
    return res.status(401).json({
      isAuthenticated: false,
      message: "Dữ liệu không khớp - Email hoặc mật khẩu sai"
    });
  }
};

module.exports = { login };