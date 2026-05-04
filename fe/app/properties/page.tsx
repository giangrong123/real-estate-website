// PropertiesPage.tsx

"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { RootState, AppDispatch } from "@/stores/store";
import {
  fetchProperties,
  fetchPropertiesBySearch,
} from "@/stores/slices/propertySlice";
import PropertyCard from "@/components/property/PropertyCard";
import styles from "./properties.module.css";

export default function PropertiesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const { properties, loading, error } = useSelector(
    (state: RootState) => state.properties
  );
  
  const search = searchParams.get("search");
  useEffect(() => {
    if (search) {
      dispatch(fetchPropertiesBySearch(search));
    } else {
      dispatch(fetchProperties());
    }
  }, []);

  if (loading) {
    return (
      <section className={styles.wrapper}>
        <div className={styles.loading}>
          Đang tải danh sách bất động sản...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.wrapper}>
        <div className={styles.error}>
          Lỗi: {error}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>
        {search
          ? `Kết quả cho "${search}" (${properties.length})`
          : `Danh sách bất động sản (${properties.length})`}
      </h1>

      <div className={styles.grid}>
        {properties.length > 0 ? (
          properties.map((item) => (
            <PropertyCard
              key={item.id}
              property={item}
            />
          ))
        ) : (
          <div className={styles.noResult}>
            <p>Không tìm thấy kết quả phù hợp.</p>
          </div>
        )}
      </div>
    </section>
  );
}