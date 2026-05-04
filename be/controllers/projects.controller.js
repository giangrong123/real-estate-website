const projectsData = require("../temp/project.json");
const usersData = require("../temp/users.json");

// GET ALL + SEARCH
const getProjects = (req, res) => {
  try {
    const search = req.query.search;

    if (!projectsData || projectsData.length === 0) {
      return res.status(200).json([]);
    }

    // SEARCH
    if (search) {
      const query = search.toLowerCase();

      const result = projectsData.filter((item) => {
        return (
          item.name?.toLowerCase().includes(query) ||
          item.address?.toLowerCase().includes(query)
        );
      });

      return res.status(200).json(result);
    }

    // ALL
    return res.status(200).json(projectsData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi hệ thống",
    });
  }
};

// GET DETAIL
const getProjectById = (req, res) => {
  const { id } = req.params;

  const project = projectsData.find((item) => String(item.id) === id);

  if (!project) {
    return res.status(404).json({
      message: "Không tìm thấy dự án",
    });
  }

  const user = usersData?.find((u) => u.id === project.created_by);

  return res.status(200).json({
    ...project,
    user,
  });
};

module.exports = {
  getProjects,
  getProjectById,
};
