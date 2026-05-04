const express = require("express");

const authController = require("./controllers/auth.controller");

const propertyController = require("./controllers/property.controller");
const projectController = require("./controllers/projects.controller");
const newsController = require("./controllers/news.controller");
const favoriteController = require("./controllers/favorite.controller");

const router = express.Router();

// ===== AUTH (CHUNG) =====
router.post("/auth/login", authController.login);

// ===== PROPERTIES =====
router.get("/properties", propertyController.getProperties);
router.get("/properties/:id", propertyController.getPropertyById);
router.post("/properties",propertyController.createProperty);
router.delete(
  "/properties/:id",
  propertyController.deleteProperty
);
// ===== PROJECTS =====
router.get("/projects", projectController.getProjects);
router.get("/projects/:id", projectController.getProjectById);

// ===== NEWS =====
router.get("/news", newsController.getNews);
router.get("/news/:id", newsController.getNewsById);

// ===== FAVORITES =====
router.get("/favorites/:userId", favoriteController.getFavorites);
router.post("/favorites", favoriteController.toggleFavorite);

module.exports = router;