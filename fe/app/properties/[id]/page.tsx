import { notFound } from "next/navigation";
import { PROPERTIES_DATA } from "@/data/properties";
import { USERS_DATA } from "@/data/users";
import styles from "./detail.module.css";
import PropertyGallery from "@/components/property/PropertyGallery";
import HomeProperties from "@/components/home/HomeProperties";

type Props = {
  params: Promise<{ id: string }>;
};

// format ngày giống web BĐS
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("vi-VN");

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;

  // 1️⃣ Lấy bài đăng
  const property = PROPERTIES_DATA.find(
    (item) => item.id.toString() === id
  );
  if (!property) notFound();

  // 2️⃣ Lấy người đăng theo user_id
  const user = USERS_DATA.find(
    (item) => item.id === property.user_id
  );
  if (!user) notFound();

  return (
    <section className={styles.wrapper}>
      <div className={styles.layout}>
        {/* ================= LEFT ================= */}
        <div className={styles.left}>
          {/* GALLERY */}
          <PropertyGallery
            images={property.images}
            title={property.title}
          />

          {/* TITLE */}
          <h1 className={styles.title}>{property.title}</h1>
          <p className={styles.address}>{property.address}</p>

          {/* MAIN INFO */}
          <div className={styles.stats}>
            <div>
              <span>Mức giá</span>
              <b className={styles.price}>{property.price} tỷ</b>
            </div>
            <div>
              <span>Diện tích</span>
              <b>{property.area} m²</b>
            </div>
            <div>
              <span>Phòng ngủ</span>
              <b>{property.bedrooms}</b>
            </div>
            <div>
              <span>WC</span>
              <b>{property.bathrooms}</b>
            </div>
          </div>

          {/* DETAIL INFO */}
          <div className={styles.section}>
            <h2>Thông tin chi tiết</h2>
            <ul>
              <li><b>Hướng nhà:</b> {property.direction}</li>
              <li><b>Pháp lý:</b> {property.legal_status}</li>
              <li><b>Nội thất:</b> {property.furniture}</li>
              <li>
                <b>Tình trạng:</b>{" "}
                {property.status === "available"
                  ? "Đang bán"
                  : "Đã bán"}
              </li>
            </ul>
          </div>

          {/* DESCRIPTION */}
          <div className={styles.section}>
            <h2>Mô tả</h2>
            <p>{property.description}</p>
          </div>

          {/* POST INFO */}
          <div className={styles.section}>
            <h2>Thông tin đăng tin</h2>
            <ul>
              <li>
                <b>Tin nổi bật:</b>{" "}
                {property.is_featured ? "⭐ Có" : "Không"}
              </li>
              <li>
                <b>Ngày đăng:</b>{" "}
                {formatDate(property.created_at)}
              </li>
              <li>
                <b>Hạn tin:</b>{" "}
                {formatDate(property.expired_at)}
              </li>
            </ul>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <aside className={styles.right}>
          <div className={styles.contactBox}>
            {/* USER INFO */}
            <div className={styles.user}>
              <img
                src={user.avatar || "/avatar-default.png"}
                alt={user.name}
                className={styles.avatar}
              />
              <div>
                <p className={styles.userName}>{user.name}</p>
                <span className={styles.userRole}>
                  Môi giới bất động sản
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <button className={styles.callBtn}>
              📞 {user.phone}
            </button>

            <button className={styles.zaloBtn}>
              Chat qua Zalo
            </button>
          </div>
        </aside>
      </div>

      <HomeProperties/>

      <h5 className={styles.text}>Mọi thông tin, nội dung liên quan tới tin rao này là do người đăng tin đăng tải và chịu trách nhiệm. Batdongsan.com.vn luôn cố gắng để các thông tin được hữu ích nhất cho quý vị tuy nhiên Batdongsan.com.vn không đảm bảo và không chịu trách nhiệm về bất kỳ thông tin, nội dung nào liên quan tới tin rao này. Trường hợp phát hiện nội dung tin đăng không chính xác, Quý vị hãy thông báo và cung cấp thông tin cho Ban quản trị Batdongsan.com.vn theo Hotline 19001881 để được hỗ trợ nhanh và kịp thời nhất.</h5>
    </section>
  );
}