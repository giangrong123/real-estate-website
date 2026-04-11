export default function UserSettings() {
  return (
    <div>
      <h1>Cài đặt tài khoản</h1>

      <form>
        <div>
          <label htmlFor="name">Tên:</label>
          <input type="text" id="name" name="name" defaultValue="Hoang Giang" />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" defaultValue="giang@example.com" />
        </div>

        <div>
          <label htmlFor="phone">Số điện thoại:</label>
          <input type="tel" id="phone" name="phone" defaultValue="0123456789" />
        </div>

        <button type="submit">Lưu thay đổi</button>
      </form>
    </div>
  );
}