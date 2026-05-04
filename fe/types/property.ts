import { User } from "./user";
export type PropertyStatus = "available" | "sold";

export type Property = {
  // user: any;
  id: number;
  title: string;
  thumbnail: string;   // dùng cho LIST
  images: string[];    // dùng cho DETAIL
  address: string;
  description: string;
  

  // Giá (đơn vị: tỷ)
  price: number;

  area: number;
  bedrooms: number;
  bathrooms: number;

  direction: string;
  legal_status: string;
  furniture: string;

  status: PropertyStatus;

  is_approved: boolean;
  is_featured: boolean;

  expired_at: string;

  user_id: number;
  type_id: number;
  approved_by: number | null;

  created_at: string;
  updated_at: string;
   user?: User; // 🔥 THÊM DÒNG NÀY (QUAN TRỌNG)
};