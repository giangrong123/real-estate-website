import styles from "./styles/HomeBanner.module.css";
import HomeSearch from "./HomeSearch";

export default function HomeBanner() {
  return (
    <section className={styles.banner}>
      <img
        src="https://phumyhung.vn/the-ascentia/wp-content/uploads/2019/09/the-ascentina-tong-toancanh.jpg"
        alt="Banner"
        className={styles.image}
      />

      {/* overlay */}
      <div className={styles.overlay}>
        <HomeSearch />
      </div>
    </section>
  );
}
