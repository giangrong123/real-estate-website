"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPropertyById,
  updateProperty,
} from "@/stores/slices/propertySlice";

import type { RootState, AppDispatch } from "@/stores/store";

import styles from "./edit.module.css";

import { uploadImages } from "@/stores/slices/uploadSlice";

export default function EditPostPage() {
  const { id } = useParams();

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const { selectedProperty, loading } = useSelector(
    (state: RootState) => state.properties
  );

  // ===== FORM =====
  const [form, setForm] = useState({
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

  // ===== IMAGES =====
  const [files, setFiles] = useState<File[]>([]);

  const [previews, setPreviews] = useState<string[]>([]);

  // ===== FETCH DETAIL =====
  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyById(String(id)));
    }
  }, [id, dispatch]);

  // ===== FILL FORM =====
  useEffect(() => {
    if (selectedProperty) {
      setForm({
        title: selectedProperty.title || "",
        address: selectedProperty.address || "",
        description: selectedProperty.description || "",
        price: String(selectedProperty.price || ""),
        area: String(selectedProperty.area || ""),
        bedrooms: String(selectedProperty.bedrooms || ""),
        bathrooms: String(selectedProperty.bathrooms || ""),
        direction: selectedProperty.direction || "",

        // FIX
        legal_status: selectedProperty.legalStatus || "",

        furniture: selectedProperty.furniture || "",
      });

      if (selectedProperty.images) {
        setPreviews(selectedProperty.images);
      }
    }
  }, [selectedProperty]);

  // ===== HANDLE CHANGE =====
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===== ADD IMAGE =====
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = e.target.files;

    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles);

    setFiles((prev) => [...prev, ...fileArray]);

    const newPreviews = fileArray.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // ===== REMOVE IMAGE =====
  const removeImage = (index: number) => {
    setPreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // ===== VALIDATE =====
  const validate = () => {
    const errors: any = {};

    if (!form.title.trim()) {
      errors.title = "Bắt buộc";
    }

    if (!form.address.trim()) {
      errors.address = "Bắt buộc";
    }

    if (!form.description.trim()) {
      errors.description = "Bắt buộc";
    }

    if (
      !form.price.trim() ||
      Number(form.price) <= 0
    ) {
      errors.price = "Giá không hợp lệ";
    }

    if (
      !form.area.trim() ||
      Number(form.area) <= 0
    ) {
      errors.area = "Diện tích không hợp lệ";
    }

    if (previews.length === 0) {
      errors.images = "Phải có ít nhất 1 ảnh";
    }

    return errors;
  };

  // ===== SUBMIT =====
  // const handleSubmit = async (
  //   e: React.FormEvent
  // ) => {
  //   e.preventDefault();

  //   const errors = validate();

  //   if (Object.keys(errors).length > 0) {
  //     alert("Vui lòng kiểm tra lại thông tin");

  //     return;
  //   }

  //   if (!selectedProperty) return;

  //   try {
  //     await dispatch(
  //       updateProperty(selectedProperty.id, {
  //         ...selectedProperty,

  //         title: form.title,

  //         address: form.address,

  //         description: form.description,

  //         price: Number(form.price),

  //         area: Number(form.area),

  //         bedrooms: Number(form.bedrooms),

  //         bathrooms: Number(form.bathrooms),

  //         direction: form.direction,

  //         // FIX
  //         legalStatus: form.legal_status,

  //         furniture: form.furniture,

  //         images: previews,

  //         thumbnail: previews[0],
  //       })
  //     );

  //     alert("Cập nhật thành công 🎉");

  //     router.push("/user/post");
  //   } catch {
  //     alert("Có lỗi xảy ra");
  //   }
  // };

  // ===== SUBMIT =====
const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  const errors = validate();

  if (
    Object.keys(errors).length > 0
  ) {
    alert(
      "Vui lòng kiểm tra lại thông tin"
    );

    return;
  }

  if (!selectedProperty)
    return;

  try {
    // ===== OLD IMAGES =====
    const oldImages =
      previews.filter(
        (img) =>
          !img.startsWith(
            "blob:"
          )
      );

    // ===== NEW IMAGES =====
    let uploadedImages: string[] =
      [];

    if (files.length > 0) {
      uploadedImages =
        await dispatch(
          uploadImages(
            files
          ) as any
        );
    }

    // ===== FINAL IMAGES =====
    const finalImages = [
      ...oldImages,
      ...uploadedImages,
    ];

    // ===== UPDATE PROPERTY =====
    await dispatch(
      updateProperty(
        selectedProperty.id,
        {
          ...selectedProperty,

          title: form.title,

          address:
            form.address,

          description:
            form.description,

          price: Number(
            form.price
          ),

          area: Number(
            form.area
          ),

          bedrooms:
            Number(
              form.bedrooms
            ),

          bathrooms:
            Number(
              form.bathrooms
            ),

          direction:
            form.direction,

          legalStatus:
            form.legal_status,

          furniture:
            form.furniture,

          // ===== REAL IMAGES =====
          images:
            finalImages,

          thumbnail:
            finalImages[0],
        }
      )
    );

    alert(
      "Cập nhật thành công 🎉"
    );

    router.push(
      "/user/post"
    );
  } catch (error) {
    console.error(error);

    alert("Có lỗi xảy ra");
  }
};

  // ===== LOADING =====
  if (loading || !selectedProperty) {
    return (
      <div className={styles.loading}>
        Đang tải...
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        ✏️ Sửa tin đăng
      </h1>

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        {/* TITLE */}
        <div className={styles.group}>
          <label>Tiêu đề *</label>

          <input
            className={styles.input}
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        {/* ADDRESS */}
        <div className={styles.group}>
          <label>Địa chỉ *</label>

          <input
            className={styles.input}
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        {/* DESCRIPTION */}
        <div className={styles.group}>
          <label>Mô tả *</label>

          <textarea
            className={styles.textarea}
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* PRICE + AREA */}
        <div className={styles.row}>
          <div className={styles.group}>
            <label>Giá *</label>

            <input
              className={styles.input}
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div className={styles.group}>
            <label>Diện tích *</label>

            <input
              className={styles.input}
              name="area"
              value={form.area}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* BED + BATH */}
        <div className={styles.row}>
          <div className={styles.group}>
            <label>Phòng ngủ</label>

            <input
              className={styles.input}
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
            />
          </div>

          <div className={styles.group}>
            <label>Phòng tắm</label>

            <input
              className={styles.input}
              name="bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* FURNITURE */}
        <div className={styles.group}>
          <label>Nội thất</label>

          <input
            className={styles.input}
            name="furniture"
            value={form.furniture}
            onChange={handleChange}
          />
        </div>

        {/* DIRECTION */}
        <div className={styles.group}>
          <label>Hướng</label>

          <input
            className={styles.input}
            name="direction"
            value={form.direction}
            onChange={handleChange}
          />
        </div>

        {/* LEGAL */}
        <div className={styles.group}>
          <label>Pháp lý</label>

          <input
            className={styles.input}
            name="legal_status"
            value={form.legal_status}
            onChange={handleChange}
          />
        </div>

        {/* IMAGES */}
        <div className={styles.group}>
          <label>Hình ảnh *</label>

          <input
            type="file"
            multiple
            onChange={handleFileChange}
          />

          <div className={styles.previewGrid}>
            {previews.map((img, i) => (
              <div
                key={i}
                className={styles.previewItem}
              >
                <img
                  src={img}
                  alt="preview"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeImage(i)
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <button
          className={styles.button}
          type="submit"
        >
          💾 Cập nhật
        </button>
      </form>
    </div>
  );
}