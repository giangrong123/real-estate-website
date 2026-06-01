const express = require("express");

const authController = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const adminController = require("./controllers/admin/admin.controller");
const propertyController = require("./controllers/property.controller");
const projectController = require("./controllers/projects.controller");
const newsController = require("./controllers/news.controller");
const favoriteController = require("./controllers/favorite.controller");

const auth = require("./middleware/auth.middleware");

const adminAuth = require("./middleware/adminAuth.middleware");

const authAll = require("./middleware/authAll")

const validateCreateProperty = require("./middleware/propertyValidation.middleware");

const validateProject = require("./middleware/projectValidation.middleware");

const validateNews = require("./middleware/newsValidation.middleware");

const {validateRegister, validateLogin,} = require("./middleware/authValidation.middleware");

const upload = require(
  "./middleware/upload.middleware"
);

const router = express.Router();

// ===== AUTH (CHUNG) =====
router.post("/auth/login",validateLogin, authController.login);
router.post("/auth/register",validateRegister, authController.register);

// ===== USER =====
router.get("/user/me",auth, userController.getMe);
router.put("/user/me",auth, userController.updateMe);
router.put("/user/change-password",auth, userController.changePassword);

// ===== ADMIN =====
router.get("/admin/dashboard",adminAuth, adminController.getDashboard);
router.post("/admin/login", adminController.adminLogin);
router.get("/admin/users",adminAuth, adminController.getUsers);
router.get("/admin/properties",adminAuth, adminController.getAdminProperties);
router.put("/admin/properties/:id/approve",adminAuth, adminController.approveProperty);
router.post("/admin/projects",adminAuth, validateProject, projectController.createProject);
router.put("/admin/projects/:id",adminAuth, projectController.updateProject);
router.delete("/admin/projects/:id",adminAuth, projectController.deleteProject);
router.post("/admin/news",adminAuth,validateNews, newsController.createNews);
router.put("/admin/news/:id",adminAuth, newsController.updateNews);
router.delete("/admin/news/:id",adminAuth, newsController.deleteNews);

// ===== PROPERTIES =====
router.put("/properties/:id",authAll, propertyController.updateProperty);
router.delete("/properties/:id",auth, propertyController.deleteProperty);
router.post("/properties",auth, validateCreateProperty, propertyController.createProperty);

// ===== UPLOAD =====

router.post(
  "/upload",

  auth,

  upload.array("images", 10),

  (req, res) => {
    try {
      const imageUrls =
        req.files.map(
          (file) =>
            `http://localhost:5000/uploads/${file.filename}`
        );

      res.json({
        images: imageUrls,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Upload failed",
      });
    }
  }
);

router.get("/properties", propertyController.getPublicProperties);
router.get("/properties/:id", propertyController.getPropertyById);

// ===== PROJECTS =====
router.get("/projects", projectController.getProjects);
router.get("/projects/:id", projectController.getProjectById);

// ===== NEWS =====
router.get("/news", newsController.getNews);
router.get("/news/:id", newsController.getNewsById);

// ===== FAVORITES =====
router.get("/favorites/:userId",auth, favoriteController.getFavorites);
router.post("/favorites",auth, favoriteController.toggleFavorite);

router.get("/profile", auth, (req, res) => {
  console.log(req.user);

  res.json({
    user: req.user,
  });
});

router.get(
  "/admin/test",
  adminAuth,
  (req, res) => {

    res.json({
      success: true,
      message: "ADMIN OK",
      admin: req.admin,
    });

  }
);

module.exports = router;
