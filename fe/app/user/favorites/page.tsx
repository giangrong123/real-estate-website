"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
// 1. Import đúng RootState và Action từ file Redux thuần
import { RootState } from "@/stores/store";
import { toggleFavorite } from "@/stores/slices/favoriteSlice"; 
import { PROPERTIES_DATA } from "@/data/properties";

export default function Favorites() {
  const dispatch = useDispatch();

  // ❤️ 2. Lấy dữ liệu từ state.favorites.favoriteIds (đúng tên biến trong reducer)
  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favoriteIds || []
  );

  // 3. Lọc danh sách: Đảm bảo so sánh string với string
  const favoritePosts = PROPERTIES_DATA.filter((p) =>
    favoriteIds.includes(String(p.id))
  );

  if (favoritePosts.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <p>Bạn chưa lưu tin nào ❤️</p>
        <Link href="/properties" style={{ color: "blue", textDecoration: "underline" }}>
          Khám phá nhà đất ngay
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Tin đã lưu ({favoritePosts.length})
      </h1>

      <div style={{ marginTop: 20 }}>
        {favoritePosts.map((item) => {
          const itemId = String(item.id); // Chuẩn hóa ID
          
          return (
            <div
              key={itemId}
              style={{
                background: "#fff",
                padding: 15,
                marginBottom: 10,
                borderRadius: 10,
                display: "flex",
                gap: 15,
                alignItems: "center",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 4 }}
              />

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "16px", margin: "0 0 5px 0" }}>{item.title}</h3>
                <p style={{ color: "#e03c31", fontWeight: "bold", margin: 0 }}>{item.price} tỷ</p>
                <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>{item.address}</p>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <Link href={`/properties/${itemId}`}>
                  <button style={{ padding: "6px 12px", cursor: "pointer" }}>
                    👁️ Xem
                  </button>
                </Link>

                <button
                  onClick={() => dispatch(toggleFavorite(itemId))}
                  style={{
                    background: "#f0f0f0",
                    color: "#333",
                    border: "1px solid #ddd",
                    padding: "6px 10px",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#ffebee")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#f0f0f0")}
                >
                  ❌ Bỏ lưu
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}