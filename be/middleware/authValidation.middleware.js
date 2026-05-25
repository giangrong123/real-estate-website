const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  // ===== USERNAME =====

  if (!username || username.trim() === "") {
    return res.status(400).json({
      message: "Username is required",
    });
  }

  // ===== EMAIL =====

  if (!email || email.trim() === "") {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  // ===== PASSWORD =====

  if (!password || password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
