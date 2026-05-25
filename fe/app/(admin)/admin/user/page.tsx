"use client";

import {
  useEffect,
} from "react";

import Link from "next/link";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  RootState,
  AppDispatch,
} from "@/stores/store";

import {
  fetchUsers,
  deleteUser,
} from "@/stores/slices/userSlice";

import styles from "./AdminUsers.module.css";

export default function AdminUsers() {
  const dispatch =
    useDispatch<AppDispatch>();

  const {
    users,
    loading,
  } = useSelector(
    (state: RootState) =>
      state.user
  );

  // ================= FETCH USERS =================

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // ================= DELETE =================

  const handleDelete = (
    id: number
  ) => {
    const confirmDelete =
      confirm(
        "Bạn có chắc muốn xóa user?"
      );

    if (!confirmDelete)
      return;

    dispatch(
      deleteUser(id)
    );
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1
        className={
          styles.title
        }
      >
        Quản lý người dùng
      </h1>

      {/* TABLE */}

      <div
        className={
          styles.tableWrapper
        }
      >
        <table
          className={
            styles.table
          }
        >
          <thead>
            <tr>
              <th>ID</th>

              <th>Tên</th>

              <th>Email</th>

              <th>
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map(
              (user) => (
                <tr
                  key={
                    user.id
                  }
                >
                  <td>
                    {user.id}
                  </td>

                  <td>
                    {user.name}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  {/* ACTION */}

                  <td
                    className={
                      styles.actions
                    }
                  >
                    {/* <Link
                      href={`/admin/users/edit/${user.id}`}
                      className={
                        styles.edit
                      }
                    >
                      ✏ Sửa
                    </Link> */}

                    <button
                      className={
                        styles.delete
                      }
                      onClick={() =>
                        handleDelete(
                          user.id
                        )
                      }
                    >
                      🗑 Xóa
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}