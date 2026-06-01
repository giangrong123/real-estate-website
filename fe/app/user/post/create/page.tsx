"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import type { RootState, AppDispatch } from "@/stores/store";

import { createProperty } from "@/stores/slices/propertySlice";
import { uploadImages } from "@/stores/slices/uploadSlice";

import styles from "./create.module.css";

// ===== TYPES =====
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
  type_id: string;
};

type FormErrors = Partial<FormType> & {
  images?: string;
};

export default function PostPage() {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const hasCheckedAuth = useRef(false);

  // ===== REDUX =====
  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  // ===== STATE =====
  const [isLoading, setIsLoading] =
    useState(true);

  const [form, setForm] =
    useState<FormType>({
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
      type_id: "",
    });

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [files, setFiles] = useState<
    File[]
  >([]);

  const [previews, setPreviews] =
    useState<string[]>([]);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // ===== TOAST =====
  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // ===== CHECK LOGIN =====
  useEffect(() => {
    if (hasCheckedAuth.current) return;

    hasCheckedAuth.current = true;

    if (!user) {
      router.replace(
        "/auth/login?error=login&redirect=/user/post/create"
      );
    } else {
      setTimeout(
        () => setIsLoading(false),
        0
      );
    }
  }, [user, router]);

  // ===== HANDLE CHANGE =====
  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (
      errors[e.target.name as keyof FormErrors]
    ) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: undefined,
      }));
    }
  };

  // ===== FILE =====
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = e.target.files;

    if (!selectedFiles) return;

    const fileArray =
      Array.from(selectedFiles);

    if (
      files.length + fileArray.length >
      10
    ) {
      setErrors((prev) => ({
        ...prev,
        images:
          "Chỉ được upload tối đa 10 ảnh",
      }));

      return;
    }

    setFiles((prev) => [
      ...prev,
      ...fileArray,
    ]);

    const newPreviewUrls =
      fileArray.map((file) =>
        URL.createObjectURL(file)
      );

    setPreviews((prev) => [
      ...prev,
      ...newPreviewUrls,
    ]);

    setErrors((prev) => ({
      ...prev,
      images: undefined,
    }));
  };

  // ===== REMOVE IMAGE =====
  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);

    setFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setPreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // ===== VALIDATE =====
  // const validate = (): FormErrors => {
  //   const newErrors: FormErrors = {};

  //   if (!form.type_id) {
  //     newErrors.type_id =
  //       "Vui lòng chọn loại bất động sản";
  //   }

  //   if (!form.title.trim()) {
  //     newErrors.title =
  //       "Vui lòng nhập tiêu đề";
  //   }

  //   if (!form.address.trim()) {
  //     newErrors.address =
  //       "Vui lòng nhập địa chỉ";
  //   }

  //   if (!form.description.trim()) {
  //     newErrors.description =
  //       "Vui lòng nhập mô tả";
  //   }

  //   if (!form.price.trim()) {
  //     newErrors.price =
  //       "Vui lòng nhập giá";
  //   } else if (
  //     Number(form.price) <= 0
  //   ) {
  //     newErrors.price =
  //       "Giá phải lớn hơn 0";
  //   }

  //   if (!form.area.trim()) {
  //     newErrors.area =
  //       "Vui lòng nhập diện tích";
  //   } else if (
  //     Number(form.area) <= 0
  //   ) {
  //     newErrors.area =
  //       "Diện tích phải lớn hơn 0";
  //   }

  //   if (previews.length === 0) {
  //     newErrors.images =
  //       "Vui lòng chọn ít nhất 1 ảnh";
  //   }

  //   return newErrors;
  // };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    // ===== TYPE =====
    if (!form.type_id) {
      newErrors.type_id = "Vui lòng chọn loại bất động sản";
    }

    // ===== TITLE =====
    if (!form.title.trim()) {
      newErrors.title = "Vui lòng nhập tiêu đề";
    } else if (form.title.trim().length < 10) {
      newErrors.title = "Tiêu đề phải có ít nhất 10 ký tự";
    }

    // ===== ADDRESS =====
    if (!form.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    } else if (form.address.trim().length < 5) {
      newErrors.address = "Địa chỉ quá ngắn";
    }

    // ===== DESCRIPTION =====
    if (!form.description.trim()) {
      newErrors.description = "Vui lòng nhập mô tả";
    } else if (form.description.trim().length < 20) {
      newErrors.description = "Mô tả phải ít nhất 20 ký tự";
    }

    // ===== PRICE =====
    if (!form.price.trim()) {
      newErrors.price = "Vui lòng nhập giá";
    } else if (isNaN(Number(form.price))) {
      newErrors.price = "Giá không hợp lệ";
    } else if (Number(form.price) <= 0) {
      newErrors.price = "Giá phải lớn hơn 0";
    } else if (Number(form.price) > 1e12) {
      newErrors.price = "Giá quá lớn";
    }

    // ===== AREA =====
    if (!form.area.trim()) {
      newErrors.area = "Vui lòng nhập diện tích";
    } else if (isNaN(Number(form.area))) {
      newErrors.area = "Diện tích không hợp lệ";
    } else if (Number(form.area) <= 0) {
      newErrors.area = "Diện tích phải lớn hơn 0";
    } else if (Number(form.area) > 10000) {
      newErrors.area = "Diện tích quá lớn";
    }

    // ===== BEDROOMS =====
    if (form.bedrooms) {
      if (isNaN(Number(form.bedrooms))) {
        newErrors.bedrooms = "Số phòng ngủ không hợp lệ";
      } else if (Number(form.bedrooms) < 0) {
        newErrors.bedrooms = "Không được nhỏ hơn 0";
      } else if (Number(form.bedrooms) > 20) {
        newErrors.bedrooms = "Quá nhiều phòng ngủ";
      }
    }

    // ===== BATHROOMS =====
    if (form.bathrooms) {
      if (isNaN(Number(form.bathrooms))) {
        newErrors.bathrooms = "Số phòng tắm không hợp lệ";
      } else if (Number(form.bathrooms) < 0) {
        newErrors.bathrooms = "Không được nhỏ hơn 0";
      } else if (Number(form.bathrooms) > 20) {
        newErrors.bathrooms = "Quá nhiều phòng tắm";
      }
    }

    // ===== DIRECTION (optional nhưng nếu có thì check) =====
    if (form.direction) {
      const validDirections = [
        "Bắc",
        "Nam",
        "Đông",
        "Tây",
        "Đông Bắc",
        "Đông Nam",
        "Tây Bắc",
        "Tây Nam",
      ];

      if (!validDirections.includes(form.direction)) {
        newErrors.direction = "Hướng nhà không hợp lệ";
      }
    }

    // ===== LEGAL STATUS =====
    if (form.legal_status) {
      const validLegal = [
        "Sổ đỏ",
        "Sổ hồng",
        "Hợp đồng mua bán",
        "Giấy tay",
      ];

      if (!validLegal.includes(form.legal_status)) {
        newErrors.legal_status = "Pháp lý không hợp lệ";
      }
    }

    // ===== FURNITURE (QUAN TRỌNG vì bạn đã đổi sang select) =====
    const validFurniture = [
      "Đầy đủ",
      "Cơ bản",
      "Cao cấp",
      "Không nội thất",
    ];

    if (!form.furniture) {
      newErrors.furniture = "Vui lòng chọn nội thất";
    } else if (!validFurniture.includes(form.furniture)) {
      newErrors.furniture = "Nội thất không hợp lệ";
    }

    // ===== IMAGES =====
    if (files.length === 0) {
      newErrors.images = "Vui lòng chọn ít nhất 1 ảnh";
    } else if (files.length > 10) {
      newErrors.images = "Tối đa 10 ảnh";
    }

    return newErrors;
  };

  // ===== SUBMIT =====
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!user) {
      showToast(
        "Phiên đăng nhập hết hạn!",
        "error"
      );

      router.replace("/auth/login");

      return;
    }

    const validationErrors =
      validate();

    setErrors(validationErrors);

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      showToast(
        "Vui lòng kiểm tra lại thông tin",
        "error"
      );

      return;
    }

    try {
      // ===== UPLOAD IMAGES =====

      const imageUrls =
        await dispatch(
          uploadImages(files) as any
        );

      // ===== CREATE PROPERTY =====

      await dispatch(
        createProperty({
          title: form.title,
          address: form.address,
          description:
            form.description,

          price: Number(form.price),

          area: Number(form.area),

          bedrooms: Number(
            form.bedrooms || 0
          ),

          bathrooms: Number(
            form.bathrooms || 0
          ),

          direction:
            form.direction,

          legalStatus:
            form.legal_status,

          furniture:
            form.furniture,

          status: "AVAILABLE",

          isApproved: false,

          isFeatured: false,

          expiredAt: new Date(
            Date.now() +
            30 *
            24 *
            60 *
            60 *
            1000
          ).toISOString(),

          userId: Number(user.id),

          typeId: Number(
            form.type_id
          ),

          // ===== REAL IMAGES =====

          images: imageUrls,

          thumbnail:
            imageUrls[0],
        })
      );

      showToast(
        "Đăng tin thành công 🎉",
        "success"
      );

      // ===== RESET =====

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
        type_id: "",
      });

      setFiles([]);

      setPreviews([]);
    } catch (error) {
      console.error(error);

      showToast(
        "Có lỗi xảy ra",
        "error"
      );
    }
  };

  // ===== LOADING =====
  if (isLoading) {
    return (
      <div className={styles.loading}>
        🔒 Đang kiểm tra đăng nhập...
      </div>
    );
  }

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>
        Đăng tin bán bất động sản
      </h1>

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        {/* ===== BASIC ===== */}
        <div className={styles.sectionTitle}>
          Thông tin cơ bản
        </div>

        <div className={styles.group}>
          <label>
            Loại bất động sản *
          </label>

          <select
            name="type_id"
            value={form.type_id}
            onChange={handleChange}
          >
            <option value="">
              -- Chọn loại --
            </option>

            <option value="1">
              Nhà phố
            </option>

            <option value="2">
              Chung cư
            </option>

            <option value="3">
              Đất nền
            </option>

            <option value="4">
              Biệt thự
            </option>
          </select>

          {errors.type_id && (
            <span className={styles.error}>
              {errors.type_id}
            </span>
          )}
        </div>

        <div className={styles.group}>
          <label>Tiêu đề *</label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          {errors.title && (
            <span className={styles.error}>
              {errors.title}
            </span>
          )}
        </div>

        <div className={styles.group}>
          <label>Địa chỉ *</label>

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
          />

          {errors.address && (
            <span className={styles.error}>
              {errors.address}
            </span>
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
            <span className={styles.error}>
              {errors.description}
            </span>
          )}
        </div>

        {/* ===== IMAGE ===== */}
        <div className={styles.sectionTitle}>
          Hình ảnh
        </div>

        <div className={styles.group}>
          <label className={styles.fileBox}>
            📷 Chọn ảnh

            <input
              type="file"
              multiple
              hidden
              onChange={
                handleFileChange
              }
            />
          </label>

          {errors.images && (
            <span className={styles.error}>
              {errors.images}
            </span>
          )}
        </div>

        <div className={styles.previewGrid}>
          {previews.map(
            (src, index) => (
              <div
                key={src}
                className={
                  styles.previewItem
                }
              >
                <img
                  src={src}
                  alt="preview"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeImage(
                      index
                    )
                  }
                >
                  ✕
                </button>
              </div>
            )
          )}
        </div>

        {/* ===== DETAIL ===== */}
        <div className={styles.sectionTitle}>
          Thông tin chi tiết
        </div>

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
              <span className={styles.error}>
                {errors.price}
              </span>
            )}
          </div>

          <div className={styles.group}>
            <label>
              Diện tích *
            </label>

            <input
              type="number"
              name="area"
              value={form.area}
              onChange={handleChange}
            />

            {errors.area && (
              <span className={styles.error}>
                {errors.area}
              </span>
            )}
          </div>
        </div>

        {/* ===== BEDROOMS / BATHROOMS ===== */}
        <div className={styles.row}>
          <div className={styles.group}>
            <label>
              Phòng ngủ
            </label>

            <input
              type="number"
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
            />
          </div>

          <div className={styles.group}>
            <label>
              Phòng tắm
            </label>

            <input
              type="number"
              name="bathrooms"
              value={
                form.bathrooms
              }
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ===== DIRECTION ===== */}
        <div className={styles.group}>
          <label>Hướng nhà</label>

          <select
            name="direction"
            value={form.direction}
            onChange={handleChange}
          >
            <option value="">
              -- Chọn hướng --
            </option>

            <option value="Bắc">Bắc</option>
            <option value="Nam">Nam</option>
            <option value="Đông">Đông</option>
            <option value="Tây">Tây</option>

            <option value="Đông Bắc">
              Đông Bắc
            </option>

            <option value="Đông Nam">
              Đông Nam
            </option>

            <option value="Tây Bắc">
              Tây Bắc
            </option>

            <option value="Tây Nam">
              Tây Nam
            </option>
          </select>
        </div>

        {/* ===== LEGAL ===== */}
        <div className={styles.group}>
          <label>Pháp lý</label>

          <select
            name="legal_status"
            value={form.legal_status}
            onChange={handleChange}
          >
            <option value="">
              -- Chọn pháp lý --
            </option>

            <option value="Sổ đỏ">
              Sổ đỏ
            </option>

            <option value="Sổ hồng">
              Sổ hồng
            </option>

            <option value="Hợp đồng mua bán">
              Hợp đồng mua bán
            </option>

            <option value="Giấy tay">
              Giấy tay
            </option>
          </select>
        </div>

        {/* ===== FURNITURE ===== */}
        <div className={styles.group}>
          <label>Nội thất *</label>

          <select
            name="furniture"
            value={form.furniture}
            onChange={handleChange}
          >
            <option value="">
              -- Chọn nội thất --
            </option>
            <option value="Đầy đủ">
              Đầy đủ
            </option>

            <option value="Cơ bản">
              Cơ bản
            </option>

            <option value="Cao cấp">
              Cao cấp
            </option>

            <option value="Không nội thất">
              Không nội thất
            </option>
          </select>

          {errors.furniture && (
            <span className={styles.error}>
              {errors.furniture}
            </span>
          )}
        </div>

        {/* ===== SUBMIT ===== */}
        <button
          type="submit"
          className={styles.submit}
        >
          🚀 Đăng tin ngay
        </button>
      </form>

      {/* ===== TOAST ===== */}
      {toast && (
        <div
          className={`${styles.toast} ${toast.type ===
            "success"
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