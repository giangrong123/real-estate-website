import styles from "./styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* LEFT */}
        <div className={styles.left}>
          <img
            src="https://staticfile.batdongsan.com.vn/images/logo/standard/black/logo_gray-5.svg"
            alt="Logo"
            className={styles.logo}
          />

          <h3 className={styles.company}>
            CÔNG TY CỔ PHẦN PROPERTYGURU VIỆT NAM
          </h3>

          <p>
            📍 Tầng 31, Keangnam Hanoi Landmark Tower, Phường Yên Hòa, Hà Nội
          </p>

          <p>📞 (024) 3562 5939 - (024) 3562 5940</p>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.box}>
            <h4>Hotline</h4>
            <p className={styles.highlight}>1900 1881</p>
          </div>

          <div className={styles.box}>
            <h4>Hỗ trợ khách hàng</h4>
            <p>trogiup.batdongsan.com.vn</p>
          </div>

          <div className={styles.box}>
            <h4>Chăm sóc khách hàng</h4>
            <p>hotro@batdongsan.com.vn</p>
          </div>

          {/* SUBSCRIBE */}
          <div className={styles.subscribe}>
            <h4>ĐĂNG KÝ NHẬN TIN</h4>
            <div className={styles.subscribeBox}>
              <input
                type="text"
                placeholder="Nhập email của bạn"
              />
              <button>Gửi</button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <div>
          <p>Copyright © 2007 - 2026 Batdongsan.com.vn</p>
          <p>
            Giấy ĐKKD số 0104630479 do Sở KHĐT TP Hà Nội cấp lần đầu ngày
            02/06/2010
          </p>
          <p>
            Giấy phép thiết lập trang thông tin điện tử tổng hợp trên mạng số
            191/GP-TTĐT do Sở TTTT Hà Nội cấp ngày 31/08/2023
          </p>
        </div>

        <div>
          <p>Chịu trách nhiệm nội dung GP ICP: Bà Đặng Thị Hường</p>
          <p>Chịu trách nhiệm sàn GDTMĐT: Ông Bạch Dương</p>
        </div>
      </div>
    </footer>
  );
}
