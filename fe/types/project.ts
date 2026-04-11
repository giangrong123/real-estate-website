export type Project = {
  id: number;
  thumbnail: string;
  name: string;
  description: string;
  investor: string;
  status: string;
  address: string;
  is_approved: boolean;
  created_by: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
};