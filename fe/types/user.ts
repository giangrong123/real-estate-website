export type User = {
  id: number | string; // Cho phép cả số và chuỗi (ID từ MongoDB thường là chuỗi)
  email: string;
  name: string;
  avatar?: string;       // Thêm dấu ?
  phone?: string;        // Thêm dấu ?
  phone_masked?: string; // Thêm dấu ?
  zalo?: string;
};