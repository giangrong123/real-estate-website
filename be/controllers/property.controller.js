const prisma = require("../libs/prisma");
const { Prisma } = require("@prisma/client");

// const getPublicProperties =
//   async (req, res) => {
//     try {
//       // QUERY
//       const page =
//         Number(
//           req.query.page
//         ) || 1;

//       const limit =
//         Number(
//           req.query.limit
//         ) || 10;

//       const search =
//         req.query.search ||
//         "";

//       const minPrice =
//         req.query.minPrice
//           ? Number(
//               req.query
//                 .minPrice
//             )
//           : undefined;

//       const maxPrice =
//         req.query.maxPrice
//           ? Number(
//               req.query
//                 .maxPrice
//             )
//           : undefined;

//       const minArea =
//         req.query.minArea
//           ? Number(
//               req.query
//                 .minArea
//             )
//           : undefined;

//       const maxArea =
//         req.query.maxArea
//           ? Number(
//               req.query
//                 .maxArea
//             )
//           : undefined;

//       const sort =
//         req.query.sort ||
//         "newest";

//       const skip =
//         (page - 1) *
//         limit;

//       // WHERE
//       const where = {
//         isApproved: true,

//         AND: [
//           // SEARCH
//           search
//             ? {
//                 OR: [
//                   {
//                     title:
//                       {
//                         contains:
//                           search,

//                         mode:
//                           "insensitive",
//                       },
//                   },

//                   {
//                     address:
//                       {
//                         contains:
//                           search,

//                         mode:
//                           "insensitive",
//                       },
//                   },
//                 ],
//               }
//             : {},

//           // PRICE
//           minPrice ||
//           maxPrice
//             ? {
//                 price: {
//                   ...(minPrice && {
//                     gte: minPrice,
//                   }),

//                   ...(maxPrice && {
//                     lte: maxPrice,
//                   }),
//                 },
//               }
//             : {},

//           // AREA
//           minArea ||
//           maxArea
//             ? {
//                 area: {
//                   ...(minArea && {
//                     gte: minArea,
//                   }),

//                   ...(maxArea && {
//                     lte: maxArea,
//                   }),
//                 },
//               }
//             : {},
//         ],
//       };

//       // SORT
//       let orderBy = {
//         createdAt:
//           "desc",
//       };

//       if (
//         sort ===
//         "price_asc"
//       ) {
//         orderBy = {
//           price: "asc",
//         };
//       }

//       if (
//         sort ===
//         "price_desc"
//       ) {
//         orderBy = {
//           price: "desc",
//         };
//       }

//       if (
//         sort ===
//         "area_asc"
//       ) {
//         orderBy = {
//           area: "asc",
//         };
//       }

//       if (
//         sort ===
//         "area_desc"
//       ) {
//         orderBy = {
//           area: "desc",
//         };
//       }

//       // TOTAL
//       const total =
//         await prisma.property.count(
//           {
//             where,
//           }
//         );

//       // DATA
//       const properties =
//         await prisma.property.findMany(
//           {
//             where,

//             skip,

//             take: limit,

//             orderBy,
//           }
//         );

//       return res
//         .status(200)
//         .json({
//           data: properties,

//           pagination:
//             {
//               total,

//               currentPage:
//                 page,

//               totalPages:
//                 Math.ceil(
//                   total /
//                     limit
//                 ),

//               limit,
//             },
//         });
//     } catch (error) {
//       console.log(
//         error
//       );

//       return res
//         .status(500)
//         .json({
//           message:
//             "Lỗi server",
//         });
//     }
//   };

const getPublicProperties = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // ================= SAFE NUMBER =================
    const safeNumber = (value) => {
      if (value === undefined || value === null || value === "")
        return undefined;

      const num = Number(value);
      if (isNaN(num)) return undefined;

      return num;
    };

    // ================= SEARCH =================
    const search = (req.query.search || "").trim();

    // ================= FILTERS =================
    const minPrice = safeNumber(req.query.minPrice);
    const maxPrice = safeNumber(req.query.maxPrice);

    const minArea = safeNumber(req.query.minArea);
    const maxArea = safeNumber(req.query.maxArea);

    const typeId = safeNumber(req.query.typeId);
    const bedrooms = safeNumber(req.query.bedrooms);

    const direction = req.query.direction || undefined;
    const furniture = req.query.furniture || undefined;

    // const isFeatured = req.query.isFeatured === "true";
    const legalStatus = req.query.legalStatus || undefined;

    const sort = req.query.sort || "newest";

    // ================= CONDITIONS =================
    const andConditions = [];

    // 🔎 SEARCH (FIX PRISMA MODE ISSUE)
    // if (search) {
    //   const keyword = search.trim();

    //   andConditions.push({
    //     OR: [
    //       {
    //         title: {
    //           contains: keyword,
    //         },
    //       },

    //       {
    //         address: {
    //           contains: keyword,
    //         },
    //       },

    //       {
    //         description: {
    //           contains: keyword,
    //         },
    //       },
    //     ],
    //   });
    // }

    // SEARCH (FIX PRO)
    if (search) {
      const keyword = search.trim();

      andConditions.push({
        OR: [
          { title: { contains: keyword } },
          { address: { contains: keyword } },
          { description: { contains: keyword } },
          { direction: { contains: keyword } },
          { furniture: { contains: keyword } },
          { legalStatus: { contains: keyword } },
        ],
      });
    }

    // 💰 PRICE FILTER
    if (minPrice !== undefined || maxPrice !== undefined) {
      andConditions.push({
        price: {
          ...(minPrice !== undefined ? { gte: minPrice } : {}),
          ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
        },
      });
    }

    // 📐 AREA FILTER
    if (minArea !== undefined || maxArea !== undefined) {
      andConditions.push({
        area: {
          ...(minArea !== undefined ? { gte: minArea } : {}),
          ...(maxArea !== undefined ? { lte: maxArea } : {}),
        },
      });
    }

    // 🏠 TYPE FILTER
    if (typeId !== undefined) {
      andConditions.push({ typeId });
    }

    // 🛏 BEDROOMS
    if (bedrooms !== undefined) {
      andConditions.push({
        bedrooms: { gte: bedrooms },
      });
    }

    // 🧭 DIRECTION
    if (direction) {
      andConditions.push({ direction });
    }

    // 🪑 FURNITURE
    if (furniture) {
      andConditions.push({ furniture });
    }

    // 📜 LEGAL STATUS
    if (legalStatus) {
      andConditions.push({
        legalStatus,
      });
    }

    // ================= SORT =================
    let orderBy = { createdAt: "desc" };

    if (sort === "price_asc") orderBy = { price: "asc" };
    if (sort === "price_desc") orderBy = { price: "desc" };
    if (sort === "area_asc") orderBy = { area: "asc" };
    if (sort === "area_desc") orderBy = { area: "desc" };

    // ================= WHERE =================
    const where = {
      isApproved: true,
      ...(andConditions.length > 0 ? { AND: andConditions } : {}),
    };

    //     console.log("🔥 SEARCH:", search);
    // console.log("🔥 WHERE:", JSON.stringify(where, null, 2));
    // ================= QUERY =================
    const [total, properties] = await Promise.all([
      prisma.property.count({ where }),
      prisma.property.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
    ]);

    return res.status(200).json({
      data: properties,
      pagination: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    console.log("🔥 GET_PROPERTIES_ERROR:", error);

    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await prisma.property.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        propertyImages: true,
        user: true,
        type: true,
        approvedAdmin: true,
      },
    });

    console.log(property);

    if (!property) {
      return res.status(404).json({
        message: "Không tìm thấy bất động sản",
      });
    }

    //1. Lọc dữ liệu
    // bỏ field không cần
    // 2. Format lại
    // images: ["a.jpg", "b.jpg"]
    // 3. Bảo mật
    // phoneMasked: "***"
    // 🔥 MAP DATA CHO FE DỄ DÙNG
    const result = {
      id: property.id,
      title: property.title,
      slug: property.slug,
      thumbnail: property.thumbnail,
      description: property.description,
      address: property.address,
      price: property.price,
      area: property.area,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      direction: property.direction,
      legalStatus: property.legalStatus,
      furniture: property.furniture,
      status: property.status,
      isApproved: property.isApproved,
      isFeatured: property.isFeatured,
      createdAt: property.createdAt,
      expiredAt: property.expiredAt,

      // 🔥 convert images -> string[]
      images: property.propertyImages.map((img) => img.imageUrl),

      // safe user
      user: property.user
        ? {
            id: property.user.id,
            name: property.user.name,
            email: property.user.email,
            avatar: property.user.avatar,
            phone: property.user.phone,
            phoneMasked: property.user.phone
              ? property.user.phone.replace(/(\d{6})\d{3}/, "$1***")
              : "***",
          }
        : null,
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

const createProperty = async (req, res) => {
  try {
    const data = req.body;

    console.log("🔥 DATA RECEIVED:", data);

    const property = await prisma.property.create({
      data: {
        title: data.title,
        thumbnail: data.thumbnail,
        description: data.description,
        address: data.address,

        price: new Prisma.Decimal(data.price), // 🔥 FIX QUAN TRỌNG
        area: Number(data.area),

        bedrooms: Number(data.bedrooms || 0),
        bathrooms: Number(data.bathrooms || 0),

        direction: data.direction,
        legalStatus: data.legalStatus,
        furniture: data.furniture,

        status: data.status || "AVAILABLE",

        isApproved: false,
        isFeatured: false,

        expiredAt: data.expiredAt ? new Date(data.expiredAt) : null,

        userId: Number(data.userId),
        typeId: Number(data.typeId),
      },
    });

    if (Array.isArray(data.images)) {
      await prisma.propertyImage.createMany({
        data: data.images.map((img) => ({
          propertyId: property.id,
          imageUrl: img,
        })),
      });
    }

    return res.status(201).json(property);
  } catch (error) {
    console.log("🔥 PRISMA ERROR FULL:", error); // 🔥 QUAN TRỌNG NHẤT

    return res.status(500).json({
      message: "Lỗi tạo property",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// const updateProperty = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const data = req.body;

//     const property = await prisma.property.update({
//       where: {
//         id: Number(id),
//       },
//       data: {
//         title: data.title,
//         slug: data.slug,
//         thumbnail: data.thumbnail,
//         description: data.description,
//         address: data.address,
//         price: data.price,
//         area: data.area,
//         bedrooms: data.bedrooms,
//         bathrooms: data.bathrooms,
//         direction: data.direction,
//         legalStatus: data.legalStatus,
//         furniture: data.furniture,
//         status: data.status,
//         isFeatured: data.isFeatured,
//         isApproved: data.isApproved,
//       },
//     });

//     res.status(200).json(property);
//   } catch (error) {
//     res.status(500).json({
//       message: "Lỗi update property",
//       error,
//     });
//   }
// };

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const data = req.body;

    // ===== FIND PROPERTY =====

    const existingProperty = await prisma.property.findUnique({
      where: {
        id: Number(id),
      },
    });

    // ===== NOT FOUND =====

    if (!existingProperty) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // ===== CURRENT USER =====

    const currentUserId = req.user?.id;

    const isAdmin = !!req.admin;

    // ===== OWNERSHIP CHECK =====

    if (existingProperty.userId !== currentUserId && !isAdmin) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    // ===== UPDATE =====

    const property = await prisma.property.update({
      where: {
        id: Number(id),
      },

      data: {
        title: data.title,

        slug: data.slug,

        thumbnail: data.thumbnail,

        description: data.description,

        address: data.address,

        price: data.price,

        area: data.area,

        bedrooms: data.bedrooms,

        bathrooms: data.bathrooms,

        direction: data.direction,

        legalStatus: data.legalStatus,

        furniture: data.furniture,

        status: data.status,

        isFeatured: data.isFeatured,

        isApproved: data.isApproved,
      },
    });

    res.status(200).json(property);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Lỗi update property",

      error,
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // xoá images trước (nếu có relation FK)
    await prisma.propertyImage.deleteMany({
      where: {
        propertyId: Number(id),
      },
    });

    await prisma.property.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Xóa thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi delete property",
      error,
    });
  }
};

module.exports = {
  getPublicProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
