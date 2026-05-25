# 🏡 Website Bất Động Sản Fullstack

Một nền tảng bất động sản fullstack được xây dựng theo hướng kiến trúc thực tế, hỗ trợ đăng tin, tìm kiếm, quản lý bất động sản và phân quyền người dùng.

Dự án tập trung vào khả năng mở rộng hệ thống, tổ chức code sạch và xây dựng luồng xác thực JWT hoàn chỉnh.

---

# 🚀 Công Nghệ Sử Dụng

## Frontend
- Next.js
- React
- TypeScript
- Redux
- CSS Modules

## Backend
- Node.js
- Express.js
- Prisma ORM
- JWT Authentication

## Database
- MySQL

---

# ✨ Chức Năng Chính

## 👤 Xác Thực & Phân Quyền
- Đăng ký / Đăng nhập
- JWT Authentication
- Access Token & Refresh Token
- Phân quyền Admin / User
- Protected Routes

---

## 🏠 Quản Lý Bất Động Sản
- Đăng tin bất động sản
- Chỉnh sửa / xoá bài đăng
- Upload hình ảnh
- Trang chi tiết bất động sản
- Tìm kiếm & lọc dữ liệu
- Pagination

---

## ❤️ Yêu Thích Bất Động Sản
- Lưu tin yêu thích
- Xoá khỏi danh sách yêu thích
- Quản lý danh sách cá nhân

---

## 📰 Tin Tức & Dự Án
- Hiển thị tin tức bất động sản
- Quản lý dự án
- Dynamic routing với Next.js

---

## 🛠️ Trang Quản Trị Admin
- Quản lý người dùng
- Quản lý bài đăng
- Quản lý tin tức & dự án
- Dashboard riêng cho Admin

---

# 📂 Cấu Trúc Dự Án

```bash
fe/   # Frontend Next.js
be/   # Backend Express + Prisma
```

---

# ⚙️ Cài Đặt Dự Án

## 1️⃣ Clone Project

```bash
git clone <repository-url>
```

---

## 2️⃣ Chạy Frontend

```bash
cd fe
npm install
npm run dev
```

Frontend chạy tại:

```bash
http://localhost:3000
```

---

## 3️⃣ Chạy Backend

```bash
cd be
npm install
node app.js
```

Backend chạy tại:

```bash
http://localhost:5000
```

---

# 🔐 Environment Variables

Tạo file `.env` trong thư mục `be`

```env
DATABASE_URL=
JWT_SECRET=
```

---

# 📌 Định Hướng Phát Triển

- Upload ảnh với Cloudinary
- Tối ưu kiến trúc API
- React Custom Hooks
- Docker Deploy
- CI/CD
- Unit Testing & Integration Testing

---

# 👨‍💻 Tác Giả

Developed by Giang
