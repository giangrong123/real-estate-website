import Link from "next/link";
import styles from "./admin.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Admin</h2>

        <nav className={styles.menu}>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/propertie">Bất động sản</Link>
          <Link href="/admin/user">Users</Link>
          <Link href="/admin/post">Bài viết</Link>
        </nav>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}