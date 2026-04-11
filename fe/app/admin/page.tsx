import styles from "./dashboard.module.css";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className={styles.title}>Admin Dashboard</h1>

      <div className={styles.stats}>
        <div className={styles.card}>
          <h3>Users</h3>
          <p>120</p>
        </div>

        <div className={styles.card}>
          <h3>Bất động sản</h3>
          <p>82</p>
        </div>

        <div className={styles.card}>
          <h3>Bài đăng</h3>
          <p>45</p>
        </div>
      </div>
    </div>
  );
}