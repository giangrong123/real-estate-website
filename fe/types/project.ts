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
  createdAt: string;
  updatedAt: string;
  contactPhone?: string;

  // 🔥 ADD THIS (gallery images)
  projectImages?: string[];
};