// "use client";

// import {
//   useEffect,
// } from "react";

// import Link from "next/link";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   RootState,
//   AppDispatch,
// } from "@/stores/store";

// import {
//   fetchUsers,
//   deleteUser,
// } from "@/stores/slices/userSlice";

// import styles from "./AdminUsers.module.css";

// export default function AdminUsers() {
//   const dispatch =
//     useDispatch<AppDispatch>();

//   const {
//     users,
//     loading,
//   } = useSelector(
//     (state: RootState) =>
//       state.user
//   );

//   // ================= FETCH USERS =================

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   // ================= DELETE =================

//   const handleDelete = (
//     id: number
//   ) => {
//     const confirmDelete =
//       confirm(
//         "Bạn có chắc muốn xóa user?"
//       );

//     if (!confirmDelete)
//       return;

//     dispatch(
//       deleteUser(id)
//     );
//   };

//   // ================= LOADING =================

//   if (loading) {
//     return (
//       <p>Loading...</p>
//     );
//   }

//   return (
//     <div className={styles.wrapper}>
//       <h1
//         className={
//           styles.title
//         }
//       >
//         Quản lý người dùng
//       </h1>

//       {/* TABLE */}

//       <div
//         className={
//           styles.tableWrapper
//         }
//       >
//         <table
//           className={
//             styles.table
//           }
//         >
//           <thead>
//             <tr>
//               <th>ID</th>

//               <th>Tên</th>

//               <th>Email</th>

//               <th>
//                 Hành động
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map(
//               (user) => (
//                 <tr
//                   key={
//                     user.id
//                   }
//                 >
//                   <td>
//                     {user.id}
//                   </td>

//                   <td>
//                     {user.name}
//                   </td>

//                   <td>
//                     {user.email}
//                   </td>

//                   {/* ACTION */}

//                   <td
//                     className={
//                       styles.actions
//                     }
//                   >
//                     {/* <Link
//                       href={`/admin/users/edit/${user.id}`}
//                       className={
//                         styles.edit
//                       }
//                     >
//                       ✏ Sửa
//                     </Link> */}

//                     <button
//                       className={
//                         styles.delete
//                       }
//                       onClick={() =>
//                         handleDelete(
//                           user.id
//                         )
//                       }
//                     >
//                       🗑 Xóa
//                     </button>
//                   </td>
//                 </tr>
//               )
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


"use client";

import {
  useEffect,
  useState,
} from "react";


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
    totalPages,
  } = useSelector(
    (state: RootState) =>
      state.user
  );

  // ================= PAGE =================

  const [page, setPage] =
    useState(1);

  // ================= FETCH USERS =================

  useEffect(() => {
    dispatch(fetchUsers(page, 5));
  }, [dispatch, page]);

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
      <div
        className={
          styles.loading
        }
      >
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}

      <div className={styles.header}>
        <div>
          <h1
            className={
              styles.title
            }
          >
            Quản lý người dùng
          </h1>

          <p
            className={
              styles.subtitle
            }
          >
            Danh sách toàn bộ user
            trong hệ thống
          </p>
        </div>
      </div>

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
            {users.length > 0 ? (
              users.map(
                (user) => (
                  <tr
                    key={
                      user.id
                    }
                  >
                    <td>
                      #{user.id}
                    </td>

                    <td>
                      <div
                        className={
                          styles.userBox
                        }
                      >
                        <div
                          className={
                            styles.avatar
                          }
                        >
                          {user.name
                            ?.charAt(
                              0
                            )
                            ?.toUpperCase()}
                        </div>

                        <span>
                          {
                            user.name
                          }
                        </span>
                      </div>
                    </td>

                    <td>
                      {
                        user.email
                      }
                    </td>

                    {/* ACTION */}

                    <td
                      className={
                        styles.actions
                      }
                    >
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
              )
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className={
                    styles.empty
                  }
                >
                  Không có user nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}

      <div
        className={
          styles.pagination
        }
      >
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
          className={
            styles.pageButton
          }
        >
          ←
        </button>

        {Array.from({
          length: totalPages,
        }).map((_, index) => (
          <button
            key={index}
            onClick={() =>
              setPage(index + 1)
            }
            className={`${styles.pageNumber} ${
              page === index + 1
                ? styles.active
                : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={
            page === totalPages
          }
          onClick={() =>
            setPage(page + 1)
          }
          className={
            styles.pageButton
          }
        >
          →
        </button>
      </div>
    </div>
  );
}

