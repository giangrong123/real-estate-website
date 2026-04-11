import styles from "./styles/HomeHero.module.css";

export default function HomeHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h2 className={styles.title}>Get Your Dream House</h2>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>

        <button className={styles.btn}>
          Get Started
        </button>
      </div>

      <div className={styles.imageWrap}>
        <img
          src="https://reti.vn/blog/wp-content/uploads/2021/11/5-1.jpg"
          alt="Dream House"
        />
      </div>
    </section>
  );
}
