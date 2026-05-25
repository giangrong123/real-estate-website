"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/stores/store";
import { createProject } from "@/stores/slices/projectSlice";

import styles from "./create-project.module.css";

export default function CreateProjectPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [thumbnail, setThumbnail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [investor, setInvestor] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= VALIDATE =================
  const validateForm = () => {
    if (!thumbnail.trim()) return "Vui lòng nhập thumbnail";
    if (!name.trim()) return "Vui lòng nhập tên dự án";
    if (!investor.trim()) return "Vui lòng nhập chủ đầu tư";
    if (!status.trim()) return "Vui lòng nhập trạng thái";
    if (!address.trim()) return "Vui lòng nhập địa chỉ";
    if (!description.trim()) return "Vui lòng nhập mô tả";
    return "";
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await dispatch(
        createProject({
          thumbnail,
          name,
          description,
          investor,
          status,
          address,
          contactPhone,
        })
      );

      alert("Tạo dự án thành công");

      router.push("/admin/project");
    } catch (err) {
      setError("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tạo dự án</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}

        <input
          placeholder="Link thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />

        <input
          placeholder="Tên dự án"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Chủ đầu tư"
          value={investor}
          onChange={(e) => setInvestor(e.target.value)}
        />

        <input
          placeholder="Trạng thái"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <input
          placeholder="Địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          placeholder="Số điện thoại"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />

        <textarea
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Đang tạo..." : "Tạo dự án"}
        </button>
      </form>
    </div>
  );
}