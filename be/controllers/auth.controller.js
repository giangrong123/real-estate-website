const users = require("../temp/users.json");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      isAuthenticated: false,
      message: "Thiếu email hoặc password"
    });
  }

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      isAuthenticated: false,
      message: "Sai tài khoản hoặc mật khẩu"
    });
  }

  return res.status(200).json({
    isAuthenticated: true,
    token: "token-" + user.id,
    user
  });
};

module.exports = { login };