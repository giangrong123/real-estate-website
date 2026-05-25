"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  approveProperty,
  deleteProperty,
  fetchPropertiesAdmin,
} from "@/stores/slices/propertySlice";

import { AppDispatch, RootState } from "@/stores/store";

import styles from "./AdminProperties.module.css";

export default function AdminProperties() {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const limit = 15;

  const dispatch = useDispatch<AppDispatch>();

  // ===== REDUX =====
  const {
    properties,
    loading,
    totalPages,
  } = useSelector(
    (state: RootState) => state.properties
  );

  // ===== FETCH =====
  const fetchData = () => {
    // ALL
    if (filter === "all") {
      dispatch(fetchPropertiesAdmin({
        page, limit,
      })
      );
    }

    // ACTIVE
    else if (filter === "active") {
      dispatch(fetchPropertiesAdmin({
        status: "AVAILABLE",
        page,
        limit,
      })
      );
    }

    // SOLD
    else if (filter === "sold") {
      dispatch(fetchPropertiesAdmin({
        status: "SOLD",
        page,
        limit,
      })
      );
    }

    // PENDING
    else if (filter === "pending") {
      dispatch(fetchPropertiesAdmin({
        approved: false,
        page,
        limit,
      })
      );
    }
  };

  // ===== FETCH DATA =====
  useEffect(() => {
    fetchData();
  }, [filter, page]);

  // ===== CHANGE FILTER =====
  const handleFilter = (value: string) => {
    setFilter(value);

    // reset về page 1
    setPage(1);
  };

  // ===== APPROVE =====
  const handleApprove = async (
    id: number
  ) => {
    await dispatch(
      approveProperty(id)
    );

    fetchData();
  };

  // ===== DELETE =====
  const handleDelete = async (
    id: number
  ) => {
    const confirmDelete =
      window.confirm(
        "Bạn có chắc muốn xoá bất động sản này không?"
      );

    if (!confirmDelete) return;

    await dispatch(
      deleteProperty(id)
    );

    fetchData();
  };

  // ===== LOADING =====
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        Quản lý bất động sản
      </h1>

      {/* FILTER */}
      <div className={styles.filters}>
        <button
          className={
            filter === "all"
              ? styles.active
              : ""
          }
          onClick={() =>
            handleFilter("all")
          }
        >
          Tất cả
        </button>

        <button
          className={
            filter === "active"
              ? styles.active
              : ""
          }
          onClick={() =>
            handleFilter("active")
          }
        >
          Đang bán
        </button>

        <button
          className={
            filter === "sold"
              ? styles.active
              : ""
          }
          onClick={() =>
            handleFilter("sold")
          }
        >
          Đã bán
        </button>

        <button
          className={
            filter === "pending"
              ? styles.active
              : ""
          }
          onClick={() =>
            handleFilter("pending")
          }
        >
          Chờ duyệt
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tiêu đề</th>
              <th>Giá</th>
              <th>Diện tích</th>
              <th>Trạng thái</th>
              <th>Duyệt</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td className={styles.titleCol}>
                  {item.title}
                </td>

                <td>{item.price} tỷ</td>

                <td>{item.area} m²</td>

                {/* STATUS */}
                <td>
                  <span
                    className={`${styles.badge} ${item.status ===
                        "AVAILABLE"
                        ? styles.activeStatus
                        : styles.soldStatus
                      }`}
                  >
                    {item.status ===
                      "AVAILABLE"
                      ? "Đang bán"
                      : "Đã bán"}
                  </span>
                </td>

                {/* APPROVED */}
                <td>
                  <span
                    className={`${styles.badge} ${item.isApproved
                        ? styles.approved
                        : styles.pending
                      }`}
                  >
                    {item.isApproved
                      ? "Đã duyệt"
                      : "Chờ duyệt"}
                  </span>
                </td>

                {/* ACTION */}
                <td className={styles.actions}>
                  {!item.isApproved && (
                    <button
                      className={styles.approve}
                      onClick={() =>
                        handleApprove(item.id)
                      }
                    >
                      ✔ Duyệt
                    </button>
                  )}

                  <button className={styles.edit}>
                    ✏ Sửa
                  </button>

                  <button
                    className={styles.delete}
                    onClick={() =>
                      handleDelete(item.id)
                    }
                  >
                    🗑 Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
        >
          ← Prev
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index}
              onClick={() =>
                setPage(index + 1)
              }
              className={
                page === index + 1
                  ? styles.active
                  : ""
              }
            >
              {index + 1}
            </button>
          )
        )}

        <button
          disabled={page === totalPages}
          onClick={() =>
            setPage(page + 1)
          }
        >
          Next →
        </button>
      </div>
    </div>
  );
}