import Link from "next/link";
import styles from "./user.module.css";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <h2>User</h2>

        <nav>
          <Link href="/user">Dashboard</Link>
          <Link href="/user/post">Tin đã đăng</Link>
          <Link href="/user/favorites">Tin đã lưu</Link>
          <Link href="/user/setting">Cài đặt</Link>
        </nav>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}