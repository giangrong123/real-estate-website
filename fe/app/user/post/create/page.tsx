"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import styles from "./create.module.css";

// --- TYPES ---
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

export default function PostPage() {
  const router = useRouter();
  const hasCheckedAuth = useRef(false);

  // 🔥 REDUX USER
  const user = useSelector((state: RootState) => state.auth.user);

  const [isLoading, setIsLoading] = useState(true);

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
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 🔥 LOGIN CHECK (REDUX VERSION)
  useEffect(() => {
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

    if (!user) {
      router.replace(
        "/auth/login?error=login&redirect=/user/post/create"
      );
    } else {
      setTimeout(() => setIsLoading(false), 0);
    }
  }, [user, router]);

  // ===== HANDLE CHANGE =====
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (errors[e.target.name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: undefined,
      }));
    }
  };

  // ===== FILE =====
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles);

    if (files.length + fileArray.length > 10) {
      setErrors((prev) => ({
        ...prev,
        images: "Chỉ được upload tối đa 10 ảnh",
      }));
      return;
    }

    setFiles((prev) => [...prev, ...fileArray]);

    const newPreviewUrls = fileArray.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews((prev) => [...prev, ...newPreviewUrls]);

    setErrors((prev) => ({ ...prev, images: undefined }));
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);

    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // ===== VALIDATE =====
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key as keyof FormType] = "Trường này bắt buộc";
      }
    });

    if (Number(form.price) <= 0) newErrors.price = "Giá phải lớn hơn 0";
    if (Number(form.area) <= 0) newErrors.area = "Diện tích phải lớn hơn 0";
    if (files.length === 0) newErrors.images = "Vui lòng chọn ít nhất 1 ảnh";

    return newErrors;
  };

  // ===== SUBMIT =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔥 CHECK REDUX USER
    if (!user) {
      showToast("Phiên đăng nhập hết hạn!", "error");
      router.replace("/auth/login");
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showToast("Vui lòng kiểm tra lại thông tin", "error");
      return;
    }

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      files.forEach((file) => {
        formData.append("images", file);
      });

      console.log("🚀 Submit:", formData);

      // TODO: CALL API HERE

      showToast("Đăng tin thành công 🎉", "success");

      // RESET FORM
      setForm({
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

      setFiles([]);
      setPreviews([]);
    } catch {
      showToast("Có lỗi xảy ra, vui lòng thử lại", "error");
    }
  };

  // 🔥 LOADING UI WHILE CHECK AUTH
  if (isLoading) {
    return (
      <div className={styles.loading}>
        🔒 Đang kiểm tra đăng nhập...
      </div>
    );
  }

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Đăng tin bán bất động sản</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.sectionTitle}>Thông tin cơ bản</div>

        <div className={styles.group}>
          <label>Tiêu đề *</label>
          <input name="title" value={form.title} onChange={handleChange} />
          {errors.title && (
            <span className={styles.error}>{errors.title}</span>
          )}
        </div>

        <div className={styles.group}>
          <label>Địa chỉ *</label>
          <input name="address" value={form.address} onChange={handleChange} />
          {errors.address && (
            <span className={styles.error}>{errors.address}</span>
          )}
        </div>

        <div className={styles.group}>
          <label>Mô tả *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>

        <div className={styles.sectionTitle}>Hình ảnh</div>

        <div className={styles.group}>
          <label className={styles.fileBox}>
            📷 Chọn ảnh
            <input type="file" multiple hidden onChange={handleFileChange} />
          </label>
          {errors.images && (
            <span className={styles.error}>{errors.images}</span>
          )}
        </div>

        <div className={styles.previewGrid}>
          {previews.map((src, index) => (
            <div key={src} className={styles.previewItem}>
              <img src={src} alt="preview" />
              <button type="button" onClick={() => removeImage(index)}>
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className={styles.sectionTitle}>Thông tin chi tiết</div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label>Giá *</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
            {errors.price && (
              <span className={styles.error}>{errors.price}</span>
            )}
          </div>

          <div className={styles.group}>
            <label>Diện tích *</label>
            <input
              type="number"
              name="area"
              value={form.area}
              onChange={handleChange}
            />
            {errors.area && (
              <span className={styles.error}>{errors.area}</span>
            )}
          </div>
        </div>

        <button type="submit" className={styles.submit}>
          🚀 Đăng tin ngay
        </button>
      </form>

      {toast && (
        <div
          className={`${styles.toast} ${
            toast.type === "success"
              ? styles.success
              : styles.errorToast
          }`}
        >
          {toast.message}
        </div>
      )}
    </section>
  );
}