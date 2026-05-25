"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "@/stores/store";
import { fetchPropertyById } from "@/stores/slices/propertySlice";

import styles from "./detail.module.css";
import PropertyGallery from "@/components/property/PropertyGallery";
import HomeProperties from "@/components/home/HomeProperties";


const formatDate = (date?: string | Date) => {
  if (!date) return "Không có";
  return new Date(date).toLocaleDateString("vi-VN");
};

export default function PropertyDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedProperty, loading, error } = useSelector(
    (state: RootState) => state.properties
  );

  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
  if (!id) return;

  const fetchData = async () => {
    await dispatch(fetchPropertyById(String(id)));
  };

  fetchData();
}, [id]);

  if (loading) return <div className={styles.loading}>Đang tải...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!selectedProperty) return <div>Không có dữ liệu</div>;

  const property = selectedProperty;

  // 🔥 IMPORTANT: backend đã trả string[] rồi
  const images: string[] = property.images || [];

  const user = property.user;

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* LEFT */}
        <div className={styles.main}>
          <PropertyGallery images={images} title={property.title} />

          {/* HEADER */}
          <div className={styles.header}>
            <h1>{property.title}</h1>
            <p>{property.address}</p>

            <div className={styles.priceBox}>
              <span className={styles.price}>{property.price} tỷ</span>
              <span className={styles.area}>~ {property.area} m²</span>
            </div>
          </div>

          {/* QUICK INFO */}
          <div className={styles.quickInfo}>
            <div>🛏 {property.bedrooms} PN</div>
            <div>🚿 {property.bathrooms} WC</div>
            <div>📐 {property.area} m²</div>
            <div>🧭 {property.direction}</div>
          </div>

          {/* DETAIL */}
          <div className={styles.card}>
            <h2>Thông tin chi tiết</h2>

            <div className={styles.grid}>
              <div>
                <span>Pháp lý</span>
                <b>{property.legalStatus}</b>
              </div>

              <div>
                <span>Nội thất</span>
                <b>{property.furniture}</b>
              </div>

              <div>
                <span>Tình trạng</span>
                <b className={property.status === "AVAILABLE" ? styles.available : styles.sold}>
                  {property.status === "AVAILABLE" ? "Đang bán" : "Đã bán"}
                </b>
              </div>

              <div>
                <span>Tin nổi bật</span>
                <b>{property.isFeatured ? "⭐ Có" : "Không"}</b>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className={styles.card}>
            <h2>Mô tả</h2>
            <p>{property.description}</p>
          </div>

          {/* POST INFO */}
          <div className={styles.card}>
            <h2>Thông tin đăng</h2>

            <div className={styles.grid}>
              <div>
                <span>Ngày đăng</span>
                <b>{formatDate(property.createdAt)}</b>
              </div>

              <div>
                <span>Hết hạn</span>
                <b>{formatDate(property.expiredAt)}</b>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <aside className={styles.sidebar}>
          <div className={styles.contactBox}>
            <div className={styles.user}>
              <img
                src={user?.avatar || "/avatar-default.png"}
                alt={user?.name || "user"}
              />

              <div>
                <p>{user?.name || "Người đăng"}</p>
                <span>Môi giới bất động sản</span>
              </div>
            </div>

            <button
              className={styles.callBtn}
              onClick={() => setShowPhone(true)}
            >
              📞 {showPhone ? user?.phone || "Không có" : "***"}
            </button>

            <button className={styles.zaloBtn}>💬 Chat Zalo</button>
          </div>
        </aside>
      </div>

      {/* <HomeProperties /> */}

      <p className={styles.note}>
        Nội dung tin đăng do người dùng cung cấp.
      </p>
    </section>
  );
}