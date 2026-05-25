const prisma = require("../libs/prisma");

// ================= GET ALL NEWS =================

const getNews = async (
  req,
  res
) => {
  try {
    const page =
      Number(req.query.page) ||
      1;

    const limit =
      Number(
        req.query.limit
      ) || 6;

    const skip =
      (page - 1) * limit;

    // total
    const total =
      await prisma.news.count();

    // data
    const news =
      await prisma.news.findMany({
        skip,
        take: limit,

        orderBy: {
          createdAt:
            "desc",
        },
      });

    return res.json({
      success: true,

      data: news,

      pagination: {
        page,
        total,
        totalPages:
          Math.ceil(
            total / limit
          ),
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Server error",
    });
  }
};

// ================= GET DETAIL =================

const getNewsById = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    const news =
      await prisma.news.findUnique({
        where: {
          id: Number(id),
        },
      });

    if (!news) {
      return res.status(404).json({
        success: false,
        message:
          "Not found",
      });
    }

    return res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
};

// ================= CREATE =================

const createNews = async (
  req,
  res
) => {
  try {
    const {
      title,
      thumbnail,
      excerpt,
      content,
    } = req.body;

    // validate
    if (
      !title ||
      !thumbnail ||
      !excerpt ||
      !content
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Thiếu dữ liệu",
      });
    }

    const news =
      await prisma.news.create({
        data: {
          title,
          thumbnail,
          excerpt,
          content,

          // fake admin
          authorId: req.admin.id,
        },
      });

    return res.status(201).json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Server error",
    });
  }
};

// ================= UPDATE =================

const updateNews = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    const {
      title,
      thumbnail,
      excerpt,
      content,
    } = req.body;

    const news =
      await prisma.news.update({
        where: {
          id: Number(id),
        },

        data: {
          title,
          thumbnail,
          excerpt,
          content,
        },
      });

    return res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
};

// ================= DELETE =================

const deleteNews = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    await prisma.news.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
};

// ================= EXPORT =================

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};