const validateProject =
  (req, res, next) => {
    const {
      thumbnail,
      name,
      description,
      investor,
      status,
      address,
      contactPhone,
    } = req.body;

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

    // ===== NAME =====

    if (
      !name ||
      name.trim() === ""
    ) {
      return res
        .status(400)
        .json({
          message:
            "Name is required",
        });
    }

    // ===== DESCRIPTION =====

    if (
      !description ||
      description.trim() === ""
    ) {
      return res
        .status(400)
        .json({
          message:
            "Description is required",
        });
    }

    // ===== INVESTOR =====

    if (
      !investor ||
      investor.trim() === ""
    ) {
      return res
        .status(400)
        .json({
          message:
            "Investor is required",
        });
    }

    // ===== STATUS =====

    if (
      !status ||
      status.trim() === ""
    ) {
      return res
        .status(400)
        .json({
          message:
            "Status is required",
        });
    }

    // ===== ADDRESS =====

    if (
      !address ||
      address.trim() === ""
    ) {
      return res
        .status(400)
        .json({
          message:
            "Address is required",
        });
    }

    // ===== CONTACT PHONE =====

    if (
      !contactPhone ||
      contactPhone.trim() === ""
    ) {
      return res
        .status(400)
        .json({
          message:
            "Contact phone is required",
        });
    }

    next();
  };

module.exports =
  validateProject;