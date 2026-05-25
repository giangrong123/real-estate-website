// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./styles/HomeSearch.module.css";

// export default function HomeSearch() {
//   const router = useRouter();

//   const [keyword, setKeyword] = useState("");
//   const [tab, setTab] = useState<"buy" | "project">("buy");
//   const [price, setPrice] = useState("");
//   const [area, setArea] = useState("");
//   const [sort, setSort] = useState("newest");

//   const handleSearch = () => {
//     const params = new URLSearchParams();

//     if (keyword.trim()) params.append("search", keyword);

//     if (price === "under_1") params.append("maxPrice", "1");

//     if (price === "1_3") {
//       params.append("minPrice", "1");
//       params.append("maxPrice", "3");
//     }

//     if (price === "3_5") {
//       params.append("minPrice", "3");
//       params.append("maxPrice", "5");
//     }

//     if (price === "5_10") {
//       params.append("minPrice", "5");
//       params.append("maxPrice", "10");
//     }

//     if (price === "over_10") params.append("minPrice", "10");

//     if (area === "under_50") params.append("maxArea", "50");

//     if (area === "50_100") {
//       params.append("minArea", "50");
//       params.append("maxArea", "100");
//     }

//     if (area === "100_200") {
//       params.append("minArea", "100");
//       params.append("maxArea", "200");
//     }

//     if (area === "over_200") params.append("minArea", "200");

//     if (sort) params.append("sort", sort);

//     router.push(
//       tab === "buy"
//         ? `/properties?${params.toString()}`
//         : `/projects?search=${keyword}`
//     );
//   };

//   const handleReset = () => {
//     setKeyword("");
//     setPrice("");
//     setArea("");
//     setSort("newest");
//   };

//   return (
//     <div className={styles.searchBox}>
//       <div className={styles.tabs}>
//         <button
//           className={tab === "buy" ? styles.active : ""}
//           onClick={() => setTab("buy")}
//         >
//           Nhà đất bán
//         </button>

//         <button
//           className={tab === "project" ? styles.active : ""}
//           onClick={() => setTab("project")}
//         >
//           Dự án
//         </button>
//       </div>

//       <div className={styles.form}>
//         <input
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//           placeholder={
//             tab === "buy"
//               ? "Tìm nhà, chung cư, villa..."
//               : "Tìm dự án..."
//           }
//           className={styles.input}
//         />

//         <select
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           className={styles.select}
//         >
//           <option value="">Mức giá</option>
//           <option value="under_1">Dưới 1 tỷ</option>
//           <option value="1_3">1 - 3 tỷ</option>
//           <option value="3_5">3 - 5 tỷ</option>
//           <option value="5_10">5 - 10 tỷ</option>
//           <option value="over_10">Trên 10 tỷ</option>
//         </select>

//         <select
//           value={area}
//           onChange={(e) => setArea(e.target.value)}
//           className={styles.select}
//         >
//           <option value="">Diện tích</option>
//           <option value="under_50">Dưới 50m²</option>
//           <option value="50_100">50 - 100m²</option>
//           <option value="100_200">100 - 200m²</option>
//           <option value="over_200">Trên 200m²</option>
//         </select>

//         <select
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//           className={styles.select}
//         >
//           <option value="newest">Mới nhất</option>
//           <option value="price_asc">Giá tăng dần</option>
//           <option value="price_desc">Giá giảm dần</option>
//           <option value="area_asc">Diện tích tăng dần</option>
//           <option value="area_desc">Diện tích giảm dần</option>
//         </select>

//         <button onClick={handleSearch} className={styles.btnSearch}>
//           Tìm kiếm
//         </button>

//         <button onClick={handleReset} className={styles.btnReset}>
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles/HomeSearch.module.css";

type Filters = {
  search: string;
  typeId: string;
  price: string;
  area: string;
  bedrooms: string;
  direction: string;
  furniture: string;
  isFeatured: boolean;
};

export default function HomeSearch() {
  const router = useRouter();
  const [openAdvanced, setOpenAdvanced] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    typeId: "",
    price: "",
    area: "",
    bedrooms: "",
    direction: "",
    furniture: "",
    isFeatured: false,
  });

  // ================= PRICE MAP =================
  const mapPrice = (value: string) => {
    switch (value) {
      case "under_1":
        return { maxPrice: 1 };
      case "1_3":
        return { minPrice: 1, maxPrice: 3 };
      case "3_5":
        return { minPrice: 3, maxPrice: 5 };
      case "5_10":
        return { minPrice: 5, maxPrice: 10 };
      case "over_10":
        return { minPrice: 10 };
      default:
        return {};
    }
  };

  // ================= AREA MAP =================
  const mapArea = (value: string) => {
    switch (value) {
      case "under_50":
        return { maxArea: 50 };
      case "50_100":
        return { minArea: 50, maxArea: 100 };
      case "100_200":
        return { minArea: 100, maxArea: 200 };
      case "over_200":
        return { minArea: 200 };
      default:
        return {};
    }
  };

  // ================= SEARCH =================
  const handleSearch = () => {
    const params = new URLSearchParams();

    // 🔥 FIX: backend dùng "search"
    if (filters.search.trim()) {
      params.append("search", filters.search);
    }

    // PRICE → min/max
    Object.entries(mapPrice(filters.price)).forEach(([k, v]) => {
      params.append(k, String(v));
    });

    // AREA → min/max
    Object.entries(mapArea(filters.area)).forEach(([k, v]) => {
      params.append(k, String(v));
    });

    // OTHER FILTERS
    if (filters.typeId) params.append("typeId", filters.typeId);
    if (filters.bedrooms) params.append("bedrooms", filters.bedrooms);
    if (filters.direction) params.append("direction", filters.direction);
    if (filters.furniture) params.append("furniture", filters.furniture);

    if (filters.isFeatured) {
      params.append("isFeatured", "true");
    }

    router.push(`/properties?${params.toString()}`);
  };

  // ================= RESET =================
  const handleReset = () => {
    setFilters({
      search: "",
      typeId: "",
      price: "",
      area: "",
      bedrooms: "",
      direction: "",
      furniture: "",
      isFeatured: false,
    });
  };

  return (
    <div className={styles.wrapper}>
      {/* SEARCH BAR */}
      <div className={styles.searchBox}>
        <input
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
          placeholder="Tìm nhà đất, dự án..."
          className={styles.searchInput}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button onClick={handleSearch} className={styles.searchBtn}>
          🔍 Tìm kiếm
        </button>
      </div>

      {/* FILTER BAR */}
      <div className={styles.filterBar}>
        <select
          value={filters.typeId}
          onChange={(e) =>
            setFilters({ ...filters, typeId: e.target.value })
          }
        >
          <option value="">Loại BĐS</option>
          <option value="1">Nhà phố</option>
          <option value="2">Chung cư</option>
          <option value="3">Đất nền</option>
          <option value="4">Biệt thự</option>
        </select>

        <select
          value={filters.price}
          onChange={(e) =>
            setFilters({ ...filters, price: e.target.value })
          }
        >
          <option value="">Mức giá</option>
          <option value="under_1">Dưới 1 tỷ</option>
          <option value="1_3">1 - 3 tỷ</option>
          <option value="3_5">3 - 5 tỷ</option>
          <option value="5_10">5 - 10 tỷ</option>
          <option value="over_10">Trên 10 tỷ</option>
        </select>

        <select
          value={filters.area}
          onChange={(e) =>
            setFilters({ ...filters, area: e.target.value })
          }
        >
          <option value="">Diện tích</option>
          <option value="under_50">Dưới 50m²</option>
          <option value="50_100">50 - 100m²</option>
          <option value="100_200">100 - 200m²</option>
          <option value="over_200">Trên 200m²</option>
        </select>

        <select
          value={filters.bedrooms}
          onChange={(e) =>
            setFilters({ ...filters, bedrooms: e.target.value })
          }
        >
          <option value="">Phòng ngủ</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>

        <button
          onClick={() => setOpenAdvanced(!openAdvanced)}
          className={styles.moreBtn}
        >
          ⚙️ Thêm
        </button>
      </div>

      {/* ADVANCED */}
      {openAdvanced && (
        <div className={styles.advancedBox}>
          <div className={styles.advancedGrid}>
            <select
              value={filters.direction}
              onChange={(e) =>
                setFilters({ ...filters, direction: e.target.value })
              }
            >
              <option value="">Hướng</option>
              <option value="east">Đông</option>
              <option value="west">Tây</option>
              <option value="south">Nam</option>
              <option value="north">Bắc</option>
            </select>

            <select
              value={filters.furniture}
              onChange={(e) =>
                setFilters({ ...filters, furniture: e.target.value })
              }
            >
              <option value="">Nội thất</option>
              <option value="full">Full</option>
              <option value="basic">Cơ bản</option>
              <option value="none">Không nội thất</option>
            </select>

            <label>
              <input
                type="checkbox"
                checked={filters.isFeatured}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    isFeatured: e.target.checked,
                  })
                }
              />
              Tin nổi bật
            </label>
          </div>

          <div className={styles.advancedActions}>
            <button onClick={handleReset}>Reset</button>
            <button onClick={() => setOpenAdvanced(false)}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}