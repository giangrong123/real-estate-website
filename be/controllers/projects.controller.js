const prisma = require("../libs/prisma");

// CREATE PROJECT
const createProject = async (
  req,
  res
) => {
  try {
    const data = req.body;

    const project =
      await prisma.project.create({
        data: {
          thumbnail:
            data.thumbnail,

          name: data.name,

          description:
            data.description,

          investor:
            data.investor,

          status: data.status,

          address:
            data.address,

          contactPhone:
            data.contactPhone,

          createdBy: req.admin.id,
        },
      });

    return res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Tạo dự án thất bại",
    });
  }
};

// GET PROJECTS
const getProjects = async (req, res) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 6;

    const skip =
      (page - 1) * limit;

    // total items
    const totalProjects =
      await prisma.project.count();

    // data
    const projects =
      await prisma.project.findMany({
        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },
      });

    return res.json({
      success: true,

      data: projects,

      pagination: {
        page,
        limit,
        totalProjects,

        totalPages: Math.ceil(
          totalProjects / limit
        ),
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
    });
  }
};

// GET PROJECT DETAIL
const getProjectById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const project =
      await prisma.project.findUnique({
        where: {
          id: Number(id),
        },

        include: {
          admin: true,
          projectImages: true,
        },
      });

    return res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
    });
  }
};

// UPDATE PROJECT
const updateProject = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const data = req.body;

    const updated =
      await prisma.project.update({
        where: {
          id: Number(id),
        },

        data: {
          thumbnail:
            data.thumbnail,

          name: data.name,

          description:
            data.description,

          investor:
            data.investor,

          status: data.status,

          address:
            data.address,

          contactPhone:
            data.contactPhone,
        },
      });

    return res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
    });
  }
};

// DELETE PROJECT
const deleteProject = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};