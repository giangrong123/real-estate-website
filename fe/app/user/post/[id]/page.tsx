"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../create/create.module.css";

type FormType = {
  title: string;
  address: string;
  description: string;
  price: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  direction: string;
  legal_status: string;
  furniture: string;
};

type FormErrors = Partial<FormType> & {
  images?: string;
};

export default function EditPostPage() {
  const { id } = useParams();

  const [form, setForm] = useState<FormType>({
    title: "",
    address: "",
    description: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    direction: "",
    legal_status: "",
    furniture: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // 👉 ẢNH CŨ (từ server)
  const [oldImages, setOldImages] = useState<string[]>([]);

  // 👉 ẢNH MỚI
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // ===== LOAD DATA =====
  useEffect(() => {
    // giả lập API
    const fetchPost = async () => {
      const data = {
        title: "Nhà phố Quận 7",
        address: "HCM",
        description: "Nhà đẹp",
        price: "3",
        area: "80",
        bedrooms: "3",
        bathrooms: "2",
        direction: "Nam",
        legal_status: "Sổ đỏ",
        furniture: "Đầy đủ",
        images: [
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
        ],
      };

      setForm({
        title: data.title,
        address: data.address,
        description: data.description,
        price: data.price,
        area: data.area,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        direction: data.direction,
        legal_status: data.legal_status,
        furniture: data.furniture,
      });

      setOldImages(data.images);
    };

    fetchPost();
  }, [id]);

  // ===== HANDLE INPUT =====
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===== FILE =====
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles);

    if (files.length + fileArray.length + oldImages.length > 10) {
      setErrors({ images: "Tối đa 10 ảnh" });
      return;
    }

    setFiles((prev) => [...prev, ...fileArray]);

    const previewUrls = fileArray.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews((prev) => [...prev, ...previewUrls]);
  };

  // ===== REMOVE OLD IMAGE =====
  const removeOldImage = (index: number) => {
    setOldImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ===== REMOVE NEW IMAGE =====
  const removeNewImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // ===== VALIDATE =====
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key as keyof FormType] = "Bắt buộc";
      }
    });

    if (oldImages.length + files.length === 0) {
      newErrors.images = "Phải có ít nhất 1 ảnh";
    }

    return newErrors;
  };

  // ===== SUBMIT =====
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // ảnh cũ (giữ lại)
    oldImages.forEach((img) => {
      formData.append("oldImages", img);
    });

    // ảnh mới
    files.forEach((file) => {
      formData.append("newImages", file);
    });

    console.log("UPDATE ID:", id);
    console.log("FORM DATA:", formData);
  };

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Sửa tin #{id}</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* ===== BASIC ===== */}
        <div className={styles.sectionTitle}>Thông tin cơ bản</div>

        <div className={styles.group}>
          <label>Tiêu đề *</label>
          <input name="title" value={form.title} onChange={handleChange} />
        </div>

        {/* ===== OLD IMAGES ===== */}
        <div className={styles.sectionTitle}>Ảnh hiện tại</div>

        <div className={styles.previewGrid}>
          {oldImages.map((src, index) => (
            <div key={index} className={styles.previewItem}>
              <img src={src} alt="" />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeOldImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* ===== NEW IMAGES ===== */}
        <div className={styles.sectionTitle}>Thêm ảnh mới</div>

        <input type="file" multiple onChange={handleFileChange} />

        <div className={styles.previewGrid}>
          {previews.map((src, index) => (
            <div key={index} className={styles.previewItem}>
              <img src={src} alt="" />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeNewImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button className={styles.submit}>Cập nhật</button>
      </form>
    </section>
  );
}