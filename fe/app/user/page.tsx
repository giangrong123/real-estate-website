export default function UserDashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Card title="Tin đã đăng" value="12" />
        <Card title="Tin đã lưu" value="5" />
        <Card title="Lượt xem" value="120" />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        minWidth: 150,
      }}
    >
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}