// import { PropertyStatus } from "@prisma/client";

// const properties = [
//   {
//     title: "Nhà phố 3 tầng trung tâm Quận 1",

//     slug: "nha-pho-3-tang-trung-tam-quan-1",

//     thumbnail:
//       "https://giahungphong.com/wp-content/uploads/2022/10/z3835310022231_0ca27b5f78828c4bae973748e4effa68-1.jpg",

//     description:
//       "Nhà phố vị trí đẹp, gần chợ và trường học, thích hợp để ở hoặc kinh doanh.",

//     address: "Quận 1, TP. Hồ Chí Minh",

//     price: 8.5,

//     area: 120,

//     bedrooms: 4,

//     bathrooms: 3,

//     direction: "Đông",

//     legalStatus: "Sổ hồng",

//     furniture: "Nội thất đầy đủ",

//     status: PropertyStatus.AVAILABLE,

//     isApproved: true,

//     isFeatured: true,

//     expiredAt: new Date("2026-12-31T23:59:59"),

//     userId: 1,

//     typeId: 1,

//     approvedBy: null,

//     images: [
//       "https://file4.batdongsan.com.vn/resize/1275x717/2026/02/08/20260208110409-c1ca_wm.jpg",
//       "/images/p1-2.jpg",
//       "/images/p1-3.jpg",
//       "/images/p1-4.jpg",
//     ],
//   },

//   {
//     title: "Căn hộ chung cư cao cấp Quận 7",

//     slug: "can-ho-chung-cu-cao-cap-quan-7",

//     thumbnail:
//       "https://static.vecteezy.com/system/resources/previews/022/903/424/large_2x/ai-generative-3d-modern-luxury-real-estate-house-for-sale-and-rent-luxury-property-concept-ai-generated-artwork-photo.jpg",

//     description:
//       "Căn hộ view sông, đầy đủ tiện ích nội khu, an ninh 24/7.",

//     address: "Quận 7, TP. Hồ Chí Minh",

//     price: 4.2,

//     area: 85,

//     bedrooms: 2,

//     bathrooms: 2,

//     direction: "Nam",

//     legalStatus: "Hợp đồng mua bán",

//     furniture: "Nội thất cơ bản",

//     status: PropertyStatus.AVAILABLE,

//     isApproved: true,

//     isFeatured: false,

//     expiredAt: new Date("2026-10-15T23:59:59"),

//     userId: 2,

//     typeId: 2,

//     approvedBy: null,

//     images: [
//       "/images/p1-1.jpg",
//       "/images/p1-2.jpg",
//       "/images/p1-3.jpg",
//       "/images/p1-4.jpg",
//     ],
//   },

//   {
//     title: "Đất nền khu dân cư Bình Chánh",

//     slug: "dat-nen-khu-dan-cu-binh-chanh",

//     thumbnail:
//       "https://static.vecteezy.com/system/resources/previews/022/903/409/non_2x/ai-generative-3d-modern-luxury-real-estate-house-for-sale-and-rent-luxury-property-concept-ai-generated-artwork-photo.jpg",

//     description: "Đất thổ cư, đường xe hơi, khu dân cư hiện hữu.",

//     address: "Bình Chánh, TP. Hồ Chí Minh",

//     price: 2.5,

//     area: 100,

//     bedrooms: 0,

//     bathrooms: 0,

//     direction: "Tây",

//     legalStatus: "Sổ đỏ",

//     furniture: "Không nội thất",

//     status: PropertyStatus.AVAILABLE,

//     isApproved: false,

//     isFeatured: false,

//     expiredAt: new Date("2026-08-30T23:59:59"),

//     userId: 3,

//     typeId: 3,

//     approvedBy: null,

//     images: [
//       "/images/p1-1.jpg",
//       "/images/p1-2.jpg",
//       "/images/p1-3.jpg",
//       "/images/p1-4.jpg",
//     ],
//   },

//   {
//     title: "Biệt thự nghỉ dưỡng ven biển Vũng Tàu",

//     slug: "biet-thu-nghi-duong-ven-bien-vung-tau",

//     thumbnail:
//       "https://static.vecteezy.com/system/resources/previews/022/903/177/large_2x/ai-generative-3d-modern-luxury-real-estate-house-for-sale-and-rent-luxury-property-concept-photo.jpg",

//     description:
//       "Biệt thự view biển, có hồ bơi riêng, phù hợp nghỉ dưỡng hoặc đầu tư.",

//     address: "TP. Vũng Tàu, Bà Rịa - Vũng Tàu",

//     price: 1.4,

//     area: 300,

//     bedrooms: 5,

//     bathrooms: 5,

//     direction: "Đông Nam",

//     legalStatus: "Sổ hồng",

//     furniture: "Nội thất cao cấp",

//     status: PropertyStatus.AVAILABLE,

//     isApproved: true,

//     isFeatured: true,

//     expiredAt: new Date("2027-01-01T23:59:59"),

//     userId: 4,

//     typeId: 4,

//     approvedBy: null,

//     images: [
//       "/images/p1-1.jpg",
//       "/images/p1-2.jpg",
//       "/images/p1-3.jpg",
//       "/images/p1-4.jpg",
//     ],
//   },

//   {
//     title: "Nhà cấp 4 hẻm xe máy Quận 12",

//     slug: "nha-cap-4-hem-xe-may-quan-12-1",

//     thumbnail:
//       "https://torontocaribbean.com/wp-content/uploads/2021/02/Depositphotos_81607554_l-2015.jpg",

//     description:
//       "Nhà giá rẻ, phù hợp gia đình nhỏ, khu vực yên tĩnh.",

//     address: "Quận 12, TP. Hồ Chí Minh",

//     price: 1.65,

//     area: 60,

//     bedrooms: 2,

//     bathrooms: 1,

//     direction: "Bắc",

//     legalStatus: "Giấy tay",

//     furniture: "Không nội thất",

//     status: PropertyStatus.SOLD,

//     isApproved: true,

//     isFeatured: false,

//     expiredAt: new Date("2026-06-30T23:59:59"),

//     userId: 5,

//     typeId: 1,

//     approvedBy: null,

//     images: [
//       "/images/p1-1.jpg",
//       "/images/p1-2.jpg",
//       "/images/p1-3.jpg",
//       "/images/p1-4.jpg",
//     ],
//   },

//   {
//     title: "Nhà phố hiện đại Thủ Đức",

//     slug: "nha-pho-hien-dai-thu-duc-6",

//     thumbnail:
//       "https://images.unsplash.com/photo-1600585154526-990dced4db0d",

//     description:
//       "Nhà phố thiết kế hiện đại, khu dân cư an ninh.",

//     address: "Thủ Đức, TP. Hồ Chí Minh",

//     price: 5.8,

//     area: 110,

//     bedrooms: 3,

//     bathrooms: 3,

//     direction: "Đông",

//     legalStatus: "Sổ hồng",

//     furniture: "Nội thất đầy đủ",

//     status: PropertyStatus.AVAILABLE,

//     isApproved: true,

//     isFeatured: true,

//     expiredAt: new Date("2026-12-01T23:59:59"),

//     userId: 2,

//     typeId: 1,

//     approvedBy: null,

//     images: [
//       "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
//       "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
//       "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
//       "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
//     ],
//   },

//   {
//     title: "Căn hộ cao cấp Landmark 81",

//     slug: "can-ho-cao-cap-landmark-81-7",

//     thumbnail:
//       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",

//     description:
//       "Căn hộ view thành phố cực đẹp, đầy đủ tiện ích.",

//     address: "Bình Thạnh, TP. Hồ Chí Minh",

//     price: 9.2,

//     area: 130,

//     bedrooms: 3,

//     bathrooms: 2,

//     direction: "Nam",

//     legalStatus: "Sổ hồng",

//     furniture: "Full nội thất",

//     status: PropertyStatus.AVAILABLE,

//     isApproved: true,

//     isFeatured: true,

//     expiredAt: new Date("2026-11-10T23:59:59"),

//     userId: 2,

//     typeId: 2,

//     approvedBy: null,

//     images: [
//       "https://images.unsplash.com/photo-1494526585095-c41746248156",
//       "https://images.unsplash.com/photo-1484154218962-a197022b5858",
//       "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
//       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
//     ],
//   },

//   {
//   title: "Căn hộ mini trung tâm Hà Đông",

//   slug: "can-ho-mini-trung-tam-ha-dong-8",

//   thumbnail:
//     "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",

//   description:
//     "Căn hộ nhỏ gọn, gần trung tâm thương mại và trường học.",

//   address: "Hà Đông, Hà Nội",

//   price: 2.9,

//   area: 55,

//   bedrooms: 2,

//   bathrooms: 1,

//   direction: "Đông Bắc",

//   legalStatus: "Sổ hồng",

//   furniture: "Nội thất cơ bản",

//   status: PropertyStatus.AVAILABLE,

//   isApproved: true,

//   isFeatured: false,

//   expiredAt: new Date("2026-09-10T23:59:59"),

//   userId: 4,

//   typeId: 2,

//   approvedBy: null,

//   images: [
//     "https://images.unsplash.com/photo-1494526585095-c41746248156",
//     "https://images.unsplash.com/photo-1484154218962-a197022b5858",
//     "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
//     "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
//   ],
// },

// {
//   title: "Biệt thự sân vườn Đà Lạt",

//   slug: "biet-thu-san-vuon-da-lat-9",

//   thumbnail:
//     "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",

//   description:
//     "Biệt thự nghỉ dưỡng không gian xanh, khí hậu mát mẻ quanh năm.",

//   address: "Đà Lạt, Lâm Đồng",

//   price: 12.8,

//   area: 420,

//   bedrooms: 5,

//   bathrooms: 4,

//   direction: "Nam",

//   legalStatus: "Sổ hồng",

//   furniture: "Nội thất cao cấp",

//   status: PropertyStatus.AVAILABLE,

//   isApproved: true,

//   isFeatured: true,

//   expiredAt: new Date("2027-02-15T23:59:59"),

//   userId: 1,

//   typeId: 4,

//   approvedBy: null,

//   images: [
//     "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
//     "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
//     "https://images.unsplash.com/photo-1613977257363-707ba9348227",
//     "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
//   ],
// },

// {
//   title: "Đất nền gần sân bay Long Thành",

//   slug: "dat-nen-gan-san-bay-long-thanh-10",

//   thumbnail:
//     "https://images.unsplash.com/photo-1500382017468-9049fed747ef",

//   description:
//     "Đất nền tiềm năng đầu tư cao gần sân bay Long Thành.",

//   address: "Long Thành, Đồng Nai",

//   price: 3.2,

//   area: 200,

//   bedrooms: 0,

//   bathrooms: 0,

//   direction: "Tây Bắc",

//   legalStatus: "Sổ đỏ",

//   furniture: "Không nội thất",

//   status: PropertyStatus.AVAILABLE,

//   isApproved: false,

//   isFeatured: false,

//   expiredAt: new Date("2026-11-20T23:59:59"),

//   userId: 4,

//   typeId: 3,

//   approvedBy: null,

//   images: [
//     "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
//     "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
//     "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
//     "https://images.unsplash.com/photo-1494526585095-c41746248156",
//   ],
// },

// {
//   title: "Nhà phố mặt tiền Gò Vấp",

//   slug: "nha-pho-mat-tien-go-vap-11",

//   thumbnail:
//     "https://images.unsplash.com/photo-1448630360428-65456885c650",

//   description:
//     "Nhà mặt tiền rộng rãi, phù hợp kinh doanh hoặc cho thuê.",

//   address: "Gò Vấp, TP. Hồ Chí Minh",

//   price: 6.7,

//   area: 140,

//   bedrooms: 4,

//   bathrooms: 3,

//   direction: "Tây Nam",

//   legalStatus: "Sổ hồng",

//   furniture: "Nội thất đầy đủ",

//   status: PropertyStatus.AVAILABLE,

//   isApproved: true,

//   isFeatured: true,

//   expiredAt: new Date("2026-12-20T23:59:59"),

//   userId: 2,

//   typeId: 1,

//   approvedBy: null,

//   images: [
//     "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
//     "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
//     "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
//     "https://images.unsplash.com/photo-1448630360428-65456885c650",
//   ],
// },

// {
//   title: "Căn hộ duplex cao cấp Phú Mỹ Hưng",

//   slug: "can-ho-duplex-cao-cap-phu-my-hung-12",

//   thumbnail:
//     "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",

//   description:
//     "Căn hộ duplex sang trọng với view sông cực đẹp.",

//   address: "Quận 7, TP. Hồ Chí Minh",

//   price: 11.5,

//   area: 180,

//   bedrooms: 4,

//   bathrooms: 3,

//   direction: "Đông",

//   legalStatus: "Sổ hồng",

//   furniture: "Full nội thất cao cấp",

//   status: PropertyStatus.AVAILABLE,

//   isApproved: true,

//   isFeatured: true,

//   expiredAt: new Date("2027-01-10T23:59:59"),

//   userId: 3,

//   typeId: 2,

//   approvedBy: null,

//   images: [
//     "https://images.unsplash.com/photo-1494526585095-c41746248156",
//     "https://images.unsplash.com/photo-1484154218962-a197022b5858",
//     "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
//     "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
//   ],
// },
// {
//     title: "Penthouse view biển Mỹ Khê Đà Nẵng",
//     slug: "penthouse-view-bien-my-khe-da-nang-13",
//     thumbnail: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
//     description: "Căn hộ Penthouse đẳng cấp nhất tòa nhà, ngắm toàn cảnh biển Mỹ Khê.",
//     address: "Sơn Trà, Đà Nẵng",
//     price: 15.5,
//     area: 250,
//     bedrooms: 3,
//     bathrooms: 4,
//     direction: "Đông",
//     legalStatus: "Sổ hồng",
//     furniture: "Full nội thất cao cấp",
//     status: PropertyStatus.AVAILABLE,
//     isApproved: true,
//     isFeatured: true,
//     expiredAt: new Date("2026-12-31T23:59:59"),
//     userId: 1,
//     typeId: 2,
//     approvedBy: null,
//     images: [
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
//       "https://images.unsplash.com/photo-1560184897-ae75f418493e",
//       "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
//     ],
//   },
//   {
//     title: "Nhà vườn sinh thái Củ Chi",
//     slug: "nha-vuon-sinh-thai-cu-chi-14",
//     thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
//     description: "Không gian yên tĩnh, có ao cá và vườn cây ăn trái, thích hợp nghỉ dưỡng cuối tuần.",
//     address: "Củ Chi, TP. Hồ Chí Minh",
//     price: 3.8,
//     area: 500,
//     bedrooms: 2,
//     bathrooms: 2,
//     direction: "Tây Nam",
//     legalStatus: "Sổ đỏ",
//     furniture: "Nội thất cơ bản",
//     status: PropertyStatus.AVAILABLE,
//     isApproved: true,
//     isFeatured: false,
//     expiredAt: new Date("2026-08-20T23:59:59"),
//     userId: 3,
//     typeId: 1,
//     approvedBy: null,
//     images: [
//       "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
//       "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
//     ],
//   },
//   {
//     title: "Shophouse Vinhome Ocean Park",
//     slug: "shophouse-vinhome-ocean-park-15",
//     thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
//     description: "Vị trí kinh doanh đắc địa, mặt tiền đường lớn, tiềm năng sinh lời cao.",
//     address: "Gia Lâm, Hà Nội",
//     price: 18.2,
//     area: 90,
//     bedrooms: 0,
//     bathrooms: 2,
//     direction: "Đông Nam",
//     legalStatus: "Sổ hồng",
//     furniture: "Bàn giao thô",
//     status: PropertyStatus.AVAILABLE,
//     isApproved: true,
//     isFeatured: true,
//     expiredAt: new Date("2027-03-01T23:59:59"),
//     userId: 5,
//     typeId: 3,
//     approvedBy: null,
//     images: [
//       "https://images.unsplash.com/photo-1497366216548-37526070297c",
//       "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
//     ],
//   },
//   {
//     title: "Căn hộ Studio Quận 4",
//     slug: "can-ho-studio-quan-4-16",
//     thumbnail: "https://images.unsplash.com/photo-1536376074432-af26585a216d",
//     description: "Căn hộ nhỏ gọn cho người độc thân hoặc người nước ngoài thuê, gần trung tâm Q1.",
//     address: "Quận 4, TP. Hồ Chí Minh",
//     price: 2.1,
//     area: 35,
//     bedrooms: 1,
//     bathrooms: 1,
//     direction: "Bắc",
//     legalStatus: "Hợp đồng thuê 50 năm",
//     furniture: "Đầy đủ tiện nghi",
//     status: PropertyStatus.AVAILABLE,
//     isApproved: true,
//     isFeatured: false,
//     expiredAt: new Date("2026-10-10T23:59:59"),
//     userId: 2,
//     typeId: 2,
//     approvedBy: null,
//     images: [
//       "https://images.unsplash.com/photo-1536376074432-af26585a216d",
//       "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
//     ],
//   },
//   {
//     title: "Đất nền ven sông Cần Thơ",
//     slug: "dat-nen-ven-song-can-tho-17",
//     thumbnail: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
//     description: "Lô đất đẹp bên bờ sông Hậu, không khí trong lành, thuận tiện giao thông thủy bộ.",
//     address: "Cái Răng, Cần Thơ",
//     price: 1.9,
//     area: 150,
//     bedrooms: 0,
//     bathrooms: 0,
//     direction: "Tây",
//     legalStatus: "Sổ đỏ",
//     furniture: "Không nội thất",
//     status: PropertyStatus.AVAILABLE,
//     isApproved: true,
//     isFeatured: false,
//     expiredAt: new Date("2026-11-15T23:59:59"),
//     userId: 4,
//     typeId: 3,
//     approvedBy: null,
//     images: ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"],
//   },
//   {
//     title: "Condotel Trần Phú Nha Trang",
//     slug: "condotel-tran-phu-nha-trang-18",
//     thumbnail: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
//     description: "Căn hộ khách sạn mặt tiền biển Nha Trang, đang vận hành cho thuê tốt.",
//     address: "Nha Trang, Khánh Hòa",
//     price: 3.5,
//     area: 45,
//     bedrooms: 1,
//     bathrooms: 1,
//     direction: "Đông",
//     legalStatus: "Sổ hồng có thời hạn",
//     furniture: "Tiêu chuẩn khách sạn 5 sao",
//     status: PropertyStatus.AVAILABLE,
//     isApproved: true,
//     isFeatured: true,
//     expiredAt: new Date("2026-09-30T23:59:59"),
//     userId: 1,
//     typeId: 2,
//     approvedBy: null,
//     images: [
//       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
//       "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
//     ],
//   },
//   {
//     title: "Nhà phố cổ Hội An (Phục dựng)",
//     slug: "nha-pho-co-hoi-an-19",
//     thumbnail: "https://images.unsplash.com/photo-1590001158193-79cd7aef8e41",
//     description: "Kiến trúc cổ điển pha lẫn hiện đại, nằm trong vùng đệm di sản.",
//     address: "Hội An, Quảng Nam",
//     price: 7.2,
//     area: 80,
//     bedrooms: 3,
//     bathrooms: 2,
//     direction: "Nam",
//     legalStatus: "Sổ hồng",
//     furniture: "Gỗ cao cấp",
//     status: PropertyStatus.AVAILABLE,
//     isApproved: true,
//     isFeatured: true,
//     expiredAt: new Date("2026-12-15T23:59:59"),
//     userId: 3,
//     typeId: 1,
//     approvedBy: null,
//     images: ["https://images.unsplash.com/photo-1590001158193-79cd7aef8e41"],
//   },
//   {
//     title: "Nhà phố liền kề Khu đô thị Sala",
//     slug: "nha-pho-lien-ke-sala-20",
//     thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
//     description: "Đẳng cấp thượng lưu, khu dân cư biệt lập, tiện ích chuẩn quốc tế.",
//     address: "Quận 2, TP. Hồ Chí Minh",
//     price: 45.0,
//     area: 160,
//     bedrooms: 4,
//     bathrooms: 5,
//     direction: "Đông Bắc",
//     legalStatus: "Sổ hồng",
//     furniture: "Nội thất nhập khẩu",
//     status: PropertyStatus.AVAILABLE,
//     isApproved: true,
//     isFeatured: true,
//     expiredAt: new Date("2027-05-01T23:59:59"),
//     userId: 2,
//     typeId: 1,
//     approvedBy: null,
//     images: [
//       "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e",
//       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
//     ],
//   },
//   {
//     title: "Căn hộ 1 phòng ngủ Masteri Thảo Điền",
//     slug: "can-ho-1pn-masteri-thao-dien-21",
//     thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
//     description: "Căn hộ tầng cao, view Xa lộ Hà Nội cực thoáng, thuận tiện di chuyển.",
//     address: "Thảo Điền, TP. Thủ Đức",
//     price: 3.9,
//     area: 52,
//     bedrooms: 1,
//     bathrooms: 1,
//     direction: "Tây",
//     legalStatus: "Sổ hồng",
//     furniture: "Đầy đủ nội thất",
//     status: PropertyStatus.AVAILABLE,
//     isApproved: true,
//     isFeatured: false,
//     expiredAt: new Date("2026-12-25T23:59:59"),
//     userId: 4,
//     typeId: 2,
//     approvedBy: null,
//     images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"],
//   },
//   {
//     title: "Đất nền khu công nghiệp Bình Dương",
//     slug: "dat-nen-kcn-binh-duong-22",
//     thumbnail: "https://images.unsplash.com/photo-1582407947304-fd86f028f716",
//     description: "Cạnh khu công nghiệp VSIP, thích hợp xây nhà trọ cho thuê.",
//     address: "Thuận An, Bình Dương",
//     price: 2.8,
//     area: 100,
//     bedrooms: 0,
//     bathrooms: 0,
//     direction: "Đông",
//     legalStatus: "Sổ hồng riêng",
//     furniture: "Không nội thất",
//     status: PropertyStatus.AVAILABLE,
//     isApproved: false,
//     isFeatured: false,
//     expiredAt: new Date("2026-11-30T23:59:59"),
//     userId: 5,
//     typeId: 3,
//     approvedBy: null,
//     images: ["https://images.unsplash.com/photo-1582407947304-fd86f028f716"],
//   },
// ];

// export default properties;

import { PropertyStatus } from "@prisma/client";

const properties = [
  {
    title: "Nhà phố 3 tầng trung tâm Quận 1",
    slug: "nha-pho-3-tang-trung-tam-quan-1",
    thumbnail:
      "https://giahungphong.com/wp-content/uploads/2022/10/z3835310022231_0ca27b5f78828c4bae973748e4effa68-1.jpg",
    description:
      "Nhà phố vị trí đẹp, gần chợ và trường học, thích hợp để ở hoặc kinh doanh.",
    address: "Quận 1, TP. Hồ Chí Minh",
    price: 8.5,
    area: 120,
    bedrooms: 4,
    bathrooms: 3,
    direction: "EAST",
    legalStatus: "SOKHONG",
    furniture: "FULL",
    status: PropertyStatus.AVAILABLE,
    isApproved: true,
    isFeatured: true,
    expiredAt: new Date("2026-12-31T23:59:59"),
    userId: 1,
    typeId: 1,
    approvedBy: null,
    images: [
      "https://file4.batdongsan.com.vn/resize/1275x717/2026/02/08/20260208110409-c1ca_wm.jpg",
      "/images/p1-2.jpg",
      "/images/p1-3.jpg",
      "/images/p1-4.jpg",
    ],
  },

  {
    title: "Căn hộ chung cư cao cấp Quận 7",
    slug: "can-ho-chung-cu-cao-cap-quan-7",
    thumbnail:
      "https://static.vecteezy.com/system/resources/previews/022/903/424/large_2x/ai-generative-3d-modern-luxury-real-estate-house-for-sale-and-rent-luxury-property-concept-ai-generated-artwork-photo.jpg",
    description:
      "Căn hộ view sông, đầy đủ tiện ích nội khu, an ninh 24/7.",
    address: "Quận 7, TP. Hồ Chí Minh",
    price: 4.2,
    area: 85,
    bedrooms: 2,
    bathrooms: 2,
    direction: "SOUTH",
    legalStatus: "HOPDONG",
    furniture: "BASIC",
    status: PropertyStatus.AVAILABLE,
    isApproved: true,
    isFeatured: false,
    expiredAt: new Date("2026-10-15T23:59:59"),
    userId: 2,
    typeId: 2,
    approvedBy: null,
    images: ["/images/p1-1.jpg", "/images/p1-2.jpg", "/images/p1-3.jpg", "/images/p1-4.jpg"],
  },

  {
    title: "Đất nền khu dân cư Bình Chánh",
    slug: "dat-nen-khu-dan-cu-binh-chanh",
    thumbnail:
      "https://static.vecteezy.com/system/resources/previews/022/903/409/non_2x/ai-generative-3d-modern-luxury-real-estate-house-for-sale-and-rent-luxury-property-concept-ai-generated-artwork-photo.jpg",
    description: "Đất thổ cư, đường xe hơi, khu dân cư hiện hữu.",
    address: "Bình Chánh, TP. Hồ Chí Minh",
    price: 2.5,
    area: 100,
    bedrooms: 0,
    bathrooms: 0,
    direction: "WEST",
    legalStatus: "SODO",
    furniture: "NONE",
    status: PropertyStatus.AVAILABLE,
    isApproved: false,
    isFeatured: false,
    expiredAt: new Date("2026-08-30T23:59:59"),
    userId: 3,
    typeId: 3,
    approvedBy: null,
    images: ["/images/p1-1.jpg", "/images/p1-2.jpg", "/images/p1-3.jpg", "/images/p1-4.jpg"],
  },

  {
    title: "Biệt thự nghỉ dưỡng ven biển Vũng Tàu",
    slug: "biet-thu-nghi-duong-ven-bien-vung-tau",
    thumbnail:
      "https://static.vecteezy.com/system/resources/previews/022/903/177/large_2x/ai-generative-3d-modern-luxury-real-estate-house-for-sale-and-rent-luxury-property-concept-photo.jpg",
    description:
      "Biệt thự view biển, có hồ bơi riêng, phù hợp nghỉ dưỡng hoặc đầu tư.",
    address: "TP. Vũng Tàu, Bà Rịa - Vũng Tàu",
    price: 1.4,
    area: 300,
    bedrooms: 5,
    bathrooms: 5,
    direction: "SOUTHEAST",
    legalStatus: "SOKHONG",
    furniture: "FULL",
    status: PropertyStatus.AVAILABLE,
    isApproved: true,
    isFeatured: true,
    expiredAt: new Date("2027-01-01T23:59:59"),
    userId: 4,
    typeId: 4,
    approvedBy: null,
    images: [
      "/images/p1-1.jpg",
      "/images/p1-2.jpg",
      "/images/p1-3.jpg",
      "/images/p1-4.jpg",
    ],
  },

  {
    title: "Nhà cấp 4 hẻm xe máy Quận 12",
    slug: "nha-cap-4-hem-xe-may-quan-12-1",
    thumbnail:
      "https://torontocaribbean.com/wp-content/uploads/2021/02/Depositphotos_81607554_l-2015.jpg",
    description:
      "Nhà giá rẻ, phù hợp gia đình nhỏ, khu vực yên tĩnh.",
    address: "Quận 12, TP. Hồ Chí Minh",
    price: 1.65,
    area: 60,
    bedrooms: 2,
    bathrooms: 1,
    direction: "NORTH",
    legalStatus: "GIAYTAY",
    furniture: "NONE",
    status: PropertyStatus.SOLD,
    isApproved: true,
    isFeatured: false,
    expiredAt: new Date("2026-06-30T23:59:59"),
    userId: 5,
    typeId: 1,
    approvedBy: null,
    images: [
      "/images/p1-1.jpg",
      "/images/p1-2.jpg",
      "/images/p1-3.jpg",
      "/images/p1-4.jpg",
    ],
  },

  {
    title: "Nhà phố hiện đại Thủ Đức",
    slug: "nha-pho-hien-dai-thu-duc-6",
    thumbnail:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    description:
      "Nhà phố thiết kế hiện đại, khu dân cư an ninh.",
    address: "Thủ Đức, TP. Hồ Chí Minh",
    price: 5.8,
    area: 110,
    bedrooms: 3,
    bathrooms: 3,
    direction: "EAST",
    legalStatus: "SOKHONG",
    furniture: "FULL",
    status: PropertyStatus.AVAILABLE,
    isApproved: true,
    isFeatured: true,
    expiredAt: new Date("2026-12-01T23:59:59"),
    userId: 2,
    typeId: 1,
    approvedBy: null,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    ],
  }
];

export default properties;