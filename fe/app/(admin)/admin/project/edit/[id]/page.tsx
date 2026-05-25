"use client";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useState,
  FormEvent,
} from "react";

import {
  useDispatch,
} from "react-redux";

import {
  AppDispatch,
} from "@/stores/store";

import {
  fetchProjectById,
  updateProject,
} from "@/stores/slices/projectSlice";

import styles from "./edit-project.module.css";

export default function EditProjectPage() {
  const params = useParams();

  const router = useRouter();

  const dispatch =
    useDispatch<AppDispatch>();

  const id = params.id as string;

  // ================= STATE =================

  const [thumbnail, setThumbnail] =
    useState("");

  const [name, setName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [investor, setInvestor] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [
    contactPhone,
    setContactPhone,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ================= FETCH DETAIL =================

  useEffect(() => {
    const loadProject =
      async () => {
        try {
          setLoading(true);

          const project =
            await dispatch(
              fetchProjectById(
                id
              ) as any
            );

          setThumbnail(
            project.thumbnail || ""
          );

          setName(
            project.name || ""
          );

          setDescription(
            project.description ||
              ""
          );

          setInvestor(
            project.investor || ""
          );

          setStatus(
            project.status || ""
          );

          setAddress(
            project.address || ""
          );

          setContactPhone(
            project.contactPhone ||
              ""
          );
        } catch (err) {
          console.log(err);

          setError(
            "Không thể tải dữ liệu"
          );
        } finally {
          setLoading(false);
        }
      };

    if (id) {
      loadProject();
    }
  }, [id, dispatch]);

  // ================= UPDATE =================

  const handleUpdate = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await dispatch(
        updateProject(
          Number(id),
          {
            thumbnail,
            name,
            description,
            investor,
            status,
            address,
            contactPhone,
          }
        ) as any
      );

      alert(
        "Cập nhật thành công"
      );

      router.push(
        "/admin/project"
      );
    } catch (err) {
      console.log(err);

      alert("Lỗi server");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================

  return (
    <div className={styles.container}>
      {/* HEADER */}

      <div className={styles.header}>
        <div>
          <h1
            className={
              styles.title
            }
          >
            Edit Project
          </h1>

          <p
            className={
              styles.subtitle
            }
          >
            Chỉnh sửa thông tin
            dự án
          </p>
        </div>
      </div>

      {/* FORM */}

      <form
        onSubmit={
          handleUpdate
        }
        className={
          styles.form
        }
      >
        {error && (
          <div
            className={
              styles.error
            }
          >
            {error}
          </div>
        )}

        {/* THUMBNAIL */}

        <div
          className={
            styles.formGroup
          }
        >
          <label>
            Thumbnail
          </label>

          <input
            type="text"
            placeholder="Nhập link ảnh"
            value={
              thumbnail
            }
            onChange={(e) =>
              setThumbnail(
                e.target.value
              )
            }
          />
        </div>

        {/* IMAGE PREVIEW */}

        {thumbnail && (
          <div
            className={
              styles.previewWrapper
            }
          >
            <img
              src={thumbnail}
              alt="preview"
              className={
                styles.previewImage
              }
            />
          </div>
        )}

        {/* NAME */}

        <div
          className={
            styles.formGroup
          }
        >
          <label>
            Project Name
          </label>

          <input
            type="text"
            placeholder="Tên dự án"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />
        </div>

        {/* INVESTOR */}

        <div
          className={
            styles.formGroup
          }
        >
          <label>
            Investor
          </label>

          <input
            type="text"
            placeholder="Chủ đầu tư"
            value={investor}
            onChange={(e) =>
              setInvestor(
                e.target.value
              )
            }
          />
        </div>

        {/* STATUS */}

        <div
          className={
            styles.formGroup
          }
        >
          <label>
            Status
          </label>

          <input
            type="text"
            placeholder="Trạng thái"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
          />
        </div>

        {/* ADDRESS */}

        <div
          className={
            styles.formGroup
          }
        >
          <label>
            Address
          </label>

          <input
            type="text"
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
          />
        </div>

        {/* PHONE */}

        <div
          className={
            styles.formGroup
          }
        >
          <label>
            Contact Phone
          </label>

          <input
            type="text"
            placeholder="Số điện thoại"
            value={
              contactPhone
            }
            onChange={(e) =>
              setContactPhone(
                e.target.value
              )
            }
          />
        </div>

        {/* DESCRIPTION */}

        <div
          className={
            styles.formGroup
          }
        >
          <label>
            Description
          </label>

          <textarea
            rows={6}
            placeholder="Mô tả dự án"
            value={
              description
            }
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />
        </div>

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className={
            styles.submitBtn
          }
        >
          {loading
            ? "Đang cập nhật..."
            : "Cập nhật dự án"}
        </button>
      </form>
    </div>
  );
}