export default function AdminProperties() {
  return (
    <div>
      <h1>Quản lý bất động sản</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Nhà phố Q7</td>
            <td>8 tỷ</td>
            <td>Active</td>
          </tr>

          <tr>
            <td>2</td>
            <td>Chung cư Hà Nội</td>
            <td>3 tỷ</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}