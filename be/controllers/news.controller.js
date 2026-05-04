const newsData = require("../temp/news.json");

// GET ALL
const getNews = (req, res) => {
  try {
    if (!newsData || newsData.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(newsData);
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi hệ thống",
    });
  }
};

// GET BY ID
const getNewsById = (req, res) => {
  const { id } = req.params;

  const news = newsData.find(
    (item) => String(item.id) === id
  );

  if (!news) {
    return res.status(404).json({
      message: "Không tìm thấy bài viết",
    });
  }

  return res.status(200).json(news);
};

module.exports = { getNews, getNewsById };