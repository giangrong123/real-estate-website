export type User = {
  id: number;
  name: string;
  avatar: string;
  phone: string;       // số đầy đủ
  phone_masked: string;
  zalo?: string;
};

export const USERS_DATA: User[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "/images/users/user-1.jpg",
    phone: "0901234567",
    phone_masked: "0901 234 ***",
    zalo: "0901234567",
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "/images/users/user-2.jpg",
    phone: "0912345678",
    phone_masked: "0912 345 ***",
    zalo: "0912345678",
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "/images/users/user-3.jpg",
    phone: "0987654321",
    phone_masked: "0987 654 ***",
  },
  {
    id: 4,
    name: "Dương Đức",
    avatar: "/images/users/user-4.jpg",
    phone: "0799393123",
    phone_masked: "0799 393 ***",
    zalo: "0799393123",
  },
  {
    id: 5,
    name: "Chủ nhà Quận 12",
    avatar: "/images/users/user-5.jpg",
    phone: "0933333333",
    phone_masked: "0933 333 ***",
  },
];