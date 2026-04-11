export default function AdminUsers() {
  return (
    <div>
      <h1>Quản lý người dùng</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Hoang Giang</td>
            <td>giang@example.com</td>
            <td>User</td>
            <td>
              <button>Chỉnh sửa</button>
              <button>Xóa</button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Admin User</td>
            <td>admin@example.com</td>
            <td>Admin</td>
            <td>
              <button>Chỉnh sửa</button>
              <button>Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}