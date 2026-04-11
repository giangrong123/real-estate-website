import styles from "./styles/HomeBoxContent.module.css";

export default function HomeBoxContent() {
  return (
    <section className={styles.container}>
      {/* ITEM 1 */}
      <div className={styles.item}>
        <img
          src="https://staticfile.batdongsan.com.vn/images/box-link-footer/ForSale.svg"
          alt="Bất động sản bán"
          className={styles.icon}
        />

        <h3 className={styles.title}>Bất động sản bán</h3>

        <p className={styles.desc}>
          Bạn có thể tìm thấy ngôi nhà mơ ước hoặc cơ hội đầu tư hấp dẫn thông qua
          lượng tin rao lớn, uy tín về các loại hình bất động sản bán tại Việt Nam,
          bao gồm bán nhà riêng, bán nhà mặt tiền, bán căn hộ chung cư, bán biệt thự,
          bán đất, bán shophouse và các loại hình BĐS khác.
        </p>
      </div>

      {/* ITEM 2 */}
      <div className={styles.item}>
        <img
          src="https://staticfile.batdongsan.com.vn/images/box-link-footer/Projects.svg"
          alt="Đánh giá dự án"
          className={styles.icon}
        />

        <h3 className={styles.title}>Dự án</h3>

        <p className={styles.desc}>
          Các dự án cung cấp góc nhìn khách quan của các
          chuyên gia về những dự án nổi bật tại Việt Nam, giúp bạn đưa ra quyết định
          đúng đắn cho nơi an cư lý tưởng hoặc cơ hội đầu tư sinh lời.
        </p>
      </div>
    </section>
  );
}
