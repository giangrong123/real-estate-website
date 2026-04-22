"use client";

import { useEffect } from "react"; // Để gọi API khi trang load
import { useSelector, useDispatch } from "react-redux"; 
import { RootState, AppDispatch } from "@/stores/store"; 
import { fetchProperties } from "@/stores/slices/propertySlice"; // Import hàm async mới
import PropertyCard from "@/components/property/PropertyCard";
import styles from "./properties.module.css";

export default function PropertiesPage() {
  // 1. Khởi tạo dispatch với kiểu AppDispatch để tránh lỗi TS
  const dispatch = useDispatch<AppDispatch>();

  // 2. Lấy dữ liệu, trạng thái loading và error từ Store
  const { allProperties, loading, error } = useSelector(
    (state: RootState) => state.properties
  );

  // 3. Gọi API khi component mount
useEffect(() => {
  dispatch(fetchProperties()); 
}, []);

  // 4. Xử lý giao diện cho trạng thái Loading
  if (loading) {
    return (
      <section className={styles.wrapper}>
        <div className={styles.loading}>Đang tải danh sách bất động sản...</div>
      </section>
    );
  }

  // 5. Xử lý giao diện khi có lỗi API
  if (error) {
    return (
      <section className={styles.wrapper}>
        <div className={styles.error}>Lỗi: {error}</div>
      </section>
    );
  }

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>
        Danh sách bất động sản ({allProperties.length})
      </h1>

      <div className={styles.grid}>
        {allProperties.length > 0 ? (
          allProperties.map((item) => (
            <PropertyCard key={item.id} property={item} />
          ))
        ) : (
          <div className={styles.noResult}>
            <p>Hiện tại chưa có bài đăng nào được hiển thị.</p>
          </div>
        )}
      </div>
    </section>
  );
}