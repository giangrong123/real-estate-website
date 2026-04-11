export default function AdminPosts() {
  return (
    <div>
      <h1>Quản lý bài đăng</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Tác giả</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Bán nhà phố Quận 7</td>
            <td>User1</td>
            <td>Đã duyệt</td>
            <td>
              <button>Chỉnh sửa</button>
              <button>Xóa</button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Cho thuê chung cư Hà Nội</td>
            <td>User2</td>
            <td>Chờ duyệt</td>
            <td>
              <button>Duyệt</button>
              <button>Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}