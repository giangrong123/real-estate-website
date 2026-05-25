import { User } from "./user";

export type PropertyStatus =
  | "AVAILABLE"
  | "SOLD";

export type Property = {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;   // Dùng cho danh sách (List)
  images: string[];    // Dùng cho chi tiết (Detail)
  address: string;
  description: string;

  // Giá (đơn vị: tỷ)
  price: number;

  area: number;
  bedrooms: number;
  bathrooms: number;

  direction: string;
  legalStatus: string;  // legal_status -> legalStatus
  furniture: string;

  status: PropertyStatus;

  isApproved: boolean;  // is_approved -> isApproved
  isFeatured: boolean;  // is_featured -> isFeatured

  expiredAt: string;    // expired_at -> expiredAt

  userId: number;       // user_id -> userId
  typeId: number;       // type_id -> typeId
  approvedBy: number | null; // approved_by -> approvedBy

  createdAt: string;    // created_at -> createdAt
  updatedAt: string;    // updated_at -> updatedAt
  
  user?: User;          // Relation object
};

export type CreatePropertyPayload = {
  title: string;
  address: string;
  description: string;

  price: number;
  area: number;

  bedrooms: number;
  bathrooms: number;

  direction: string;
  legalStatus: string;
  furniture: string;

  status: string;

  isApproved: boolean;
  isFeatured: boolean;

  expiredAt: string;

  userId: number;
  typeId: number;

  images: string[];
  thumbnail: string;
};