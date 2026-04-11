const favorites = [
  { id: 1, title: "Nhà đẹp quận 1" },
  { id: 2, title: "Chung cư cao cấp" },
];

export default function Favorites() {
  return (
    <div>
      <h1>Tin đã lưu</h1>

      {favorites.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
}