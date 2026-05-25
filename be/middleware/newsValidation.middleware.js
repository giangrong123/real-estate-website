const validateNews =
  (req, res, next) => {
    const {
      title,
      thumbnail,
      excerpt,
      content,
    } = req.body;

    // ===== TITLE =====

    if (
      !title ||
      title.trim() === ""
    ) {
      return res
        .status(400)
        .json({
          message:
            "Title is required",
        });
    }

    // ===== THUMBNAIL =====

    if (
      !thumbnail ||
      thumbnail.trim() === ""
    ) {
      return res
        .status(400)
        .json({
          message:
            "Thumbnail is required",
        });
    }

    // ===== EXCERPT =====

    if (
      !excerpt ||
      excerpt.trim() === ""
    ) {
      return res
        .status(400)
        .json({
          message:
            "Excerpt is required",
        });
    }

    // ===== CONTENT =====

    if (
      !content ||
      content.trim() === ""
    ) {
      return res
        .status(400)
        .json({
          message:
            "Content is required",
        });
    }

    next();
  };

module.exports =
  validateNews;