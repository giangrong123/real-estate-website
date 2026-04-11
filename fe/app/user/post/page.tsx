// "use client";

// import { useState } from "react";
// import styles from "./post.module.css";

// type FormType = {
//   title: string;
//   address: string;
//   description: string;
//   price: string;
//   area: string;
//   bedrooms: string;
//   bathrooms: string;
//   direction: string;
//   legal_status: string;
//   furniture: string;
// };

// type FormErrors = Partial<FormType> & {
//   images?: string;
// };

// export default function PostPage() {
//   const [form, setForm] = useState<FormType>({
//     title: "",
//     address: "",
//     description: "",
//     price: "",
//     area: "",
//     bedrooms: "",
//     bathrooms: "",
//     direction: "",
//     legal_status: "",
//     furniture: "",
//   });

//   const [errors, setErrors] = useState<FormErrors>({});
//   const [files, setFiles] = useState<File[]>([]);
//   const [previews, setPreviews] = useState<string[]>([]);

//   // ===== HANDLE TEXT & SELECT =====
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ===== HANDLE FILE =====
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = e.target.files;
//     if (!selectedFiles) return;

//     const fileArray = Array.from(selectedFiles);

//     if (files.length + fileArray.length > 10) {
//       setErrors((prev) => ({
//         ...prev,
//         images: "Chỉ được upload tối đa 10 ảnh",
//       }));
//       return;
//     }

//     setFiles((prev) => [...prev, ...fileArray]);

//     const previewUrls = fileArray.map((file) =>
//       URL.createObjectURL(file)
//     );

//     setPreviews((prev) => [...prev, ...previewUrls]);

//     setErrors((prev) => ({ ...prev, images: undefined }));
//   };

//   // ===== REMOVE IMAGE =====
//   const removeImage = (index: number) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index));
//     setPreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   // ===== VALIDATE FULL =====
//   const validate = (): FormErrors => {
//     const newErrors: FormErrors = {};

//     Object.entries(form).forEach(([key, value]) => {
//       if (!value.trim()) {
//         newErrors[key as keyof FormType] = "Trường này bắt buộc";
//       }
//     });

//     if (Number(form.price) <= 0)
//       newErrors.price = "Giá phải lớn hơn 0";

//     if (Number(form.area) <= 0)
//       newErrors.area = "Diện tích phải lớn hơn 0";

//     if (files.length === 0)
//       newErrors.images = "Vui lòng chọn ít nhất 1 ảnh";

//     return newErrors;
//   };

//   // ===== SUBMIT =====
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const validationErrors = validate();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) return;

//     const formData = new FormData();

//     Object.entries(form).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     files.forEach((file) => {
//       formData.append("images", file);
//     });

//     console.log("READY TO SEND:", formData);
//   };

//   return (
    
//     <section className={styles.wrapper}>
//       <div>
//       <h1>Tin đã đăng</h1>

//       <ul>
//         <li>Nhà phố Quận 7</li>
//         <li>Chung cư Hà Nội</li>
//       </ul>
//     </div>
//       <h1 className={styles.title}>Đăng tin bán bất động sản</h1>

//       <form onSubmit={handleSubmit} className={styles.form}>
//         {/* ===== THÔNG TIN CƠ BẢN ===== */}
//         <div className={styles.sectionTitle}>Thông tin cơ bản</div>

//         <div className={styles.group}>
//           <label>Tiêu đề *</label>
//           <input name="title" value={form.title} onChange={handleChange} />
//           {errors.title && <span className={styles.error}>{errors.title}</span>}
//         </div>

//         <div className={styles.group}>
//           <label>Địa chỉ *</label>
//           <input name="address" value={form.address} onChange={handleChange} />
//           {errors.address && <span className={styles.error}>{errors.address}</span>}
//         </div>

//         <div className={styles.group}>
//           <label>Mô tả *</label>
//           <textarea
//             name="description"
//             rows={5}
//             value={form.description}
//             onChange={handleChange}
//           />
//           {errors.description && (
//             <span className={styles.error}>{errors.description}</span>
//           )}
//         </div>

//         {/* ===== HÌNH ẢNH ===== */}
//         <div className={styles.sectionTitle}>Hình ảnh</div>

//         <div className={styles.group}>
//           <label className={styles.fileBox}>
//             Chọn nhiều ảnh (tối đa 10)
//             <input
//               type="file"
//               multiple
//               hidden
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//           </label>
//           {errors.images && (
//             <span className={styles.error}>{errors.images}</span>
//           )}
//         </div>

//         <div className={styles.previewGrid}>
//           {previews.map((src, index) => (
//             <div key={index} className={styles.previewItem}>
//               <img src={src} alt="preview" />
//               <button
//                 type="button"
//                 className={styles.removeBtn}
//                 onClick={() => removeImage(index)}
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* ===== CHI TIẾT ===== */}
//         <div className={styles.sectionTitle}>Thông tin chi tiết</div>

//         <div className={styles.group}>
//           <label>Giá (tỷ) *</label>
//           <input type="number" name="price" value={form.price} onChange={handleChange} />
//           {errors.price && <span className={styles.error}>{errors.price}</span>}
//         </div>

//         <div className={styles.group}>
//           <label>Diện tích (m²) *</label>
//           <input type="number" name="area" value={form.area} onChange={handleChange} />
//           {errors.area && <span className={styles.error}>{errors.area}</span>}
//         </div>

//         <div className={styles.group}>
//           <label>Số phòng ngủ *</label>
//           <select name="bedrooms" value={form.bedrooms} onChange={handleChange}>
//             <option value="">-- Chọn --</option>
//             <option value="1">1 phòng</option>
//             <option value="2">2 phòng</option>
//             <option value="3">3 phòng</option>
//             <option value="4">4+ phòng</option>
//           </select>
//           {errors.bedrooms && <span className={styles.error}>{errors.bedrooms}</span>}
//         </div>

//         <div className={styles.group}>
//           <label>Số phòng tắm *</label>
//           <select name="bathrooms" value={form.bathrooms} onChange={handleChange}>
//             <option value="">-- Chọn --</option>
//             <option value="1">1 phòng</option>
//             <option value="2">2 phòng</option>
//             <option value="3">3+ phòng</option>
//           </select>
//           {errors.bathrooms && <span className={styles.error}>{errors.bathrooms}</span>}
//         </div>

//         <div className={styles.group}>
//           <label>Hướng nhà *</label>
//           <select name="direction" value={form.direction} onChange={handleChange}>
//             <option value="">-- Chọn --</option>
//             <option value="Đông">Đông</option>
//             <option value="Tây">Tây</option>
//             <option value="Nam">Nam</option>
//             <option value="Bắc">Bắc</option>
//           </select>
//           {errors.direction && <span className={styles.error}>{errors.direction}</span>}
//         </div>

//         <div className={styles.group}>
//           <label>Tình trạng pháp lý *</label>
//           <select name="legal_status" value={form.legal_status} onChange={handleChange}>
//             <option value="">-- Chọn --</option>
//             <option value="Sổ đỏ">Sổ đỏ</option>
//             <option value="Sổ hồng">Sổ hồng</option>
//             <option value="Đang chờ sổ">Đang chờ sổ</option>
//           </select>
//           {errors.legal_status && (
//             <span className={styles.error}>{errors.legal_status}</span>
//           )}
//         </div>

//         <div className={styles.group}>
//           <label>Nội thất *</label>
//           <select name="furniture" value={form.furniture} onChange={handleChange}>
//             <option value="">-- Chọn --</option>
//             <option value="Đầy đủ">Đầy đủ</option>
//             <option value="Cơ bản">Cơ bản</option>
//             <option value="Không nội thất">Không nội thất</option>
//           </select>
//           {errors.furniture && (
//             <span className={styles.error}>{errors.furniture}</span>
//           )}
//         </div>

//         <button type="submit" className={styles.submit}>
//           Đăng tin
//         </button>
//       </form>
//     </section>
//   );
// }

"use client";

import Link from "next/link";

const mockPosts = [
  { id: 1, title: "Bán nhà Hà Nội", price: "3 tỷ" },
  { id: 2, title: "Chung cư mini", price: "1.2 tỷ" },
];

export default function UserPosts() {
  return (
    <div>
      <h1>Tin đã đăng</h1>

      <Link href="/user/post/create">+ Đăng tin</Link>

      <div style={{ marginTop: 20 }}>
        {mockPosts.map((post) => (
          <div
            key={post.id}
            style={{
              background: "#fff",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.price}</p>

            <Link href={`/user/post/${post.id}`}>Sửa</Link>
          </div>
        ))}
      </div>
    </div>
  );
}