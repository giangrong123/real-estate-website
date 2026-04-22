import { notFound } from "next/navigation";
import { PROJECTS_DATA } from "@/data/projects";
import { USERS_DATA } from "@/data/users";
import styles from "./detail.module.css";
import HomeProject from "@/components/home/HomeProject";

//định nghĩa kiểu của biến
type Props = {
  params: Promise<{
    id: string;
  }>;
};

//fucion này cho ở đâu cũng đc vì nó chỉ là hàm fotmaddate
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("vi-VN");

//nen viet theo arrow function tranh viet han funciton ra
const ProjectDetailPage = async ({ params }: Props) => {
  // ✅ Next 15 bắt buộc await params
  const { id } = await params;

// chuyen len thanh API
  /* 1️⃣ Lấy dự án */
  const project = PROJECTS_DATA.find(
    (item) => item.id.toString() === id
  );
  if (!project) notFound();

  /* 2️⃣ Lấy người đăng */
  const user = USERS_DATA.find(
    (item) => item.id === project.created_by
  );
  if (!user) notFound();

  return (
    <section className={styles.wrapper}>
      <div className={styles.layout}>
        {/* ================= LEFT ================= */}
        <div className={styles.left}>
          <div className={styles.imageWrapper}>
            <img
              src={project.thumbnail}
              alt={project.name}
              className={styles.thumbnail}
            />

            <span className={styles.status}>{project.status}</span>

            {project.is_approved && (
              <span className={styles.approved}>Đã duyệt</span>
            )}
          </div>

          <h1 className={styles.title}>{project.name}</h1>
          <p className={styles.address}>{project.address}</p>

          <div className={styles.stats}>
            <div>
              <span>Chủ đầu tư</span>
              <b>{project.investor}</b>
            </div>
            <div>
              <span>Trạng thái</span>
              <b>{project.status}</b>
            </div>
            <div>
              <span>Phê duyệt</span>
              <b>{project.is_approved ? "Đã duyệt" : "Chưa duyệt"}</b>
            </div>
          </div>

          <div className={styles.section}>
            <h2>Giới thiệu dự án</h2>
            <p>{project.description}</p>
          </div>

          <div className={styles.section}>
            <h2>Thông tin dự án</h2>
            <ul>
              <li>
                <b>Ngày tạo:</b> {formatDate(project.created_at)}
              </li>
              <li>
                <b>Cập nhật:</b> {formatDate(project.updated_at)}
              </li>
            </ul>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        {/* <aside className={styles.right}>
          <div className={styles.contactBox}>
            <div className={styles.user}>
              <img
                src={user.avatar || "/avatar-default.png"}
                alt={user.name}
                className={styles.avatar}
              />
              <div>
                <p className={styles.userName}>{user.name}</p>
                <span className={styles.userRole}>
                  Quản lý dự án
                </span>
              </div>
            </div>

            <button className={styles.callBtn}>
              📞 {user.phone}
            </button>

            <button className={styles.zaloBtn}>
              Chat qua Zalo
            </button>
          </div>
        </aside> */}
      </div>

      <HomeProject/>

      <h5 className={styles.text}>
        Mọi thông tin liên quan tới dự án này là do đơn vị đăng tải cung cấp
        và chịu trách nhiệm. Website chỉ đóng vai trò cung cấp nền tảng
        thông tin.
      </h5>
    </section>
  );
}

export default ProjectDetailPage;
