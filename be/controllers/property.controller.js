// Dữ liệu giả (Mock Data) để test
const propertiesData = [
  {
    id: 1,
    title: "Nhà phố 3 tầng trung tâm Quận 1",
    thumbnail:
      "https://giahungphong.com/wp-content/uploads/2022/10/z3835310022231_0ca27b5f78828c4bae973748e4effa68-1.jpg",
      images: [
      "https://file4.batdongsan.com.vn/resize/1275x717/2026/02/08/20260208110409-c1ca_wm.jpg",
      "/images/p1-2.jpg",
      "/images/p1-3.jpg",
      "/images/p1-4.jpg",
    ],
    address: "Quận 1, TP. Hồ Chí Minh",
    description:
      "Nhà phố vị trí đẹp, gần chợ và trường học, thích hợp để ở hoặc kinh doanh.",
    price: 8.5,
    area: 120,
    bedrooms: 4,
    bathrooms: 3,
    direction: "Đông",
    legal_status: "Sổ hồng",
    furniture: "Nội thất đầy đủ",
    status: "available",
    is_approved: true,
    is_featured: true,
    expired_at: "2026-12-31T23:59:59",
    user_id: 1,
    type_id: 1,
    approved_by: 10,
    created_at: "2026-02-05T09:00:00",
    updated_at: "2026-02-05T09:00:00",
  },
  {
    id: 2,
    title: "Căn hộ chung cư cao cấp Quận 7",
    thumbnail:
      "https://static.vecteezy.com/system/resources/previews/022/903/424/large_2x/ai-generative-3d-modern-luxury-real-estate-house-for-sale-and-rent-luxury-property-concept-ai-generated-artwork-photo.jpg",
      images: [
      "/images/p1-1.jpg",
      "/images/p1-2.jpg",
      "/images/p1-3.jpg",
      "/images/p1-4.jpg",
    ],
    address: "Quận 7, TP. Hồ Chí Minh",
    description: "Căn hộ view sông, đầy đủ tiện ích nội khu, an ninh 24/7.",
    price: 4.2,
    area: 85,
    bedrooms: 2,
    bathrooms: 2,
    direction: "Nam",
    legal_status: "Hợp đồng mua bán",
    furniture: "Nội thất cơ bản",
    status: "available",
    is_approved: true,
    is_featured: false,
    expired_at: "2026-10-15T23:59:59",
    user_id: 2,
    type_id: 2,
    approved_by: 10,
    created_at: "2026-02-02T10:15:00",
    updated_at: "2026-02-02T10:15:00",
  },
  {
    id: 3,
    title: "Đất nền khu dân cư Bình Chánh",
    thumbnail:
      "https://static.vecteezy.com/system/resources/previews/022/903/409/non_2x/ai-generative-3d-modern-luxury-real-estate-house-for-sale-and-rent-luxury-property-concept-ai-generated-artwork-photo.jpg",
      images: [
      "/images/p1-1.jpg",
      "/images/p1-2.jpg",
      "/images/p1-3.jpg",
      "/images/p1-4.jpg",
    ],
    address: "Bình Chánh, TP. Hồ Chí Minh",
    description: "Đất thổ cư, đường xe hơi, khu dân cư hiện hữu.",
    price: 2.5,
    area: 100,
    bedrooms: 0,
    bathrooms: 0,
    direction: "Tây",
    legal_status: "Sổ đỏ",
    furniture: "Không nội thất",
    status: "available",
    is_approved: false,
    is_featured: false,
    expired_at: "2026-08-30T23:59:59",
    user_id: 3,
    type_id: 3,
    approved_by: null,
    created_at: "2026-02-03T14:30:00",
    updated_at: "2026-02-03T14:30:00",
  },
];

const getProperties = (req, res) => {
  console.log("--- Đang thực hiện lấy danh sách bất động sản ---");

  try {
    // Trong thực tế: const properties = await PropertyModel.find();
    
    // Kiểm tra nếu không có dữ liệu
    if (!propertiesData || propertiesData.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Hiện chưa có bài đăng nào",
        properties: []
      });
    }

    // Trả về danh sách (giống cấu trúc FETCH_SUCCESS bạn đã viết ở Frontend)
    return res.status(200).json(propertiesData);

  } catch (error) {
    console.error("Lỗi Controller:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi hệ thống khi lấy dữ liệu"
    });
  }
};

module.exports = { getProperties };
