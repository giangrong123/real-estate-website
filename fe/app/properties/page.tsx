// "use client";

// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   useSelector,
//   useDispatch,
// } from "react-redux";

// import { useSearchParams } from "next/navigation";

// import {
//   RootState,
//   AppDispatch,
// } from "@/stores/store";

// import { fetchProperties } from "@/stores/slices/propertySlice";

// import PropertyCard from "@/components/property/PropertyCard";

// import styles from "./properties.module.css";

// export default function PropertiesPage() {
//   const dispatch =
//     useDispatch<AppDispatch>();

//   const searchParams =
//     useSearchParams();

//   const {
//     properties,
//     loading,
//     error,
//     totalPages,
//     currentPage,
//     total,
//   } = useSelector(
//     (
//       state: RootState
//     ) =>
//       state.properties
//   );

//   // SEARCH PARAMS
//   const search =
//     searchParams.get(
//       "search"
//     ) || "";

//   const minPrice =
//     searchParams.get(
//       "minPrice"
//     );

//   const maxPrice =
//     searchParams.get(
//       "maxPrice"
//     );

//   const sort =
//     searchParams.get(
//       "sort"
//     );

//   // PAGE STATE
//   const [page, setPage] =
//     useState(1);

//   // FETCH DATA
//   useEffect(() => {
//     dispatch(
//       fetchProperties({
//         search,

//         minPrice:
//           minPrice
//             ? Number(
//               minPrice
//             )
//             : undefined,

//         maxPrice:
//           maxPrice
//             ? Number(
//               maxPrice
//             )
//             : undefined,

//         sort:
//           sort ||
//           undefined,

//         page,

//         limit: 10,
//       })
//     );
//   }, [
//     dispatch,
//     search,
//     minPrice,
//     maxPrice,
//     sort,
//     page,
//   ]);

//   // LOADING
//   if (loading) {
//     return (
//       <section
//         className={
//           styles.wrapper
//         }
//       >
//         <div
//           className={
//             styles.loading
//           }
//         >
//           Đang tải danh sách bất động sản...
//         </div>
//       </section>
//     );
//   }

//   // ERROR
//   if (error) {
//     return (
//       <section
//         className={
//           styles.wrapper
//         }
//       >
//         <div
//           className={
//             styles.error
//           }
//         >
//           Lỗi: {error}
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section
//       className={
//         styles.wrapper
//       }
//     >
//       {/* TITLE */}
//       <h1
//         className={
//           styles.title
//         }
//       >
//         {search
//           ? `Kết quả cho "${search}" (${total})`
//           : `Danh sách bất động sản `}
//       </h1>

//       {/* LIST */}
//       <div
//         className={
//           styles.grid
//         }
//       >
//         {properties.length >
//           0 ? (
//           properties.map(
//             (item) => (
//               <PropertyCard
//                 key={
//                   item.id
//                 }
//                 property={
//                   item
//                 }
//               />
//             )
//           )
//         ) : (
//           <div
//             className={
//               styles.noResult
//             }
//           >
//             <p>
//               Không tìm thấy kết quả phù hợp.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* PAGINATION */}
//       {totalPages > 1 && (
//         <div className={styles.pagination}>

//           {/* PREV */}
//           <button
//             className={styles.pageBtn}
//             disabled={currentPage === 1}
//             onClick={() =>
//               setPage((prev) => prev - 1)
//             }
//           >
//             Prev
//           </button>

//           {/* PAGE NUMBERS */}
//           {Array.from(
//             { length: totalPages },
//             (_, index) => (
//               <button
//                 key={index}
//                 className={
//                   currentPage ===
//                     index + 1
//                     ? styles.activePage
//                     : styles.pageBtn
//                 }
//                 onClick={() =>
//                   setPage(index + 1)
//                 }
//               >
//                 {index + 1}
//               </button>
//             )
//           )}

//           {/* NEXT */}
//           <button
//             className={styles.pageBtn}
//             disabled={
//               currentPage === totalPages
//             }
//             onClick={() =>
//               setPage((prev) => prev + 1)
//             }
//           >
//             Next
//           </button>

//         </div>
//       )}
//     </section>
//   );
// }

// // "use client";

// // import { useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { useSearchParams, useRouter } from "next/navigation";

// // import { RootState, AppDispatch } from "@/stores/store";
// // import { fetchProperties } from "@/stores/slices/propertySlice";
// // import PropertyCard from "@/components/property/PropertyCard";

// // import styles from "./properties.module.css";

// // export default function PropertiesPage() {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const router = useRouter();
// //   const searchParams = useSearchParams();

// //   const { properties, loading, error, totalPages, total } =
// //     useSelector((state: RootState) => state.properties);

// //   // ================= URL PARAMS =================
// //   const search = searchParams.get("search") || "";

// //   const typeId = searchParams.get("typeId") || undefined;
// //   const price = searchParams.get("price") || undefined;
// //   const area = searchParams.get("area") || undefined;
// //   const bedrooms = searchParams.get("bedrooms") || undefined;
// //   const direction = searchParams.get("direction") || undefined;
// //   const furniture = searchParams.get("furniture") || undefined;
// //   const isFeatured = searchParams.get("isFeatured") || undefined;

// //   const sort = searchParams.get("sort") || "newest";
// //   const page = Number(searchParams.get("page") || 1);

// //   // ================= MAP RANGE =================
// //   const mapPrice = (value: string | null) => {
// //     switch (value) {
// //       case "under_1":
// //         return { maxPrice: 1 };
// //       case "1_3":
// //         return { minPrice: 1, maxPrice: 3 };
// //       case "3_5":
// //         return { minPrice: 3, maxPrice: 5 };
// //       case "5_10":
// //         return { minPrice: 5, maxPrice: 10 };
// //       case "over_10":
// //         return { minPrice: 10 };
// //       default:
// //         return {};
// //     }
// //   };

// //   const mapArea = (value: string | null) => {
// //     switch (value) {
// //       case "under_50":
// //         return { maxArea: 50 };
// //       case "50_100":
// //         return { minArea: 50, maxArea: 100 };
// //       case "100_200":
// //         return { minArea: 100, maxArea: 200 };
// //       case "over_200":
// //         return { minArea: 200 };
// //       default:
// //         return {};
// //     }
// //   };

// //   // ================= FETCH =================
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       dispatch(
// //         fetchProperties({
// //           search,

// //           ...mapPrice(price),
// //           ...mapArea(area),

// //           typeId,
// //           bedrooms,
// //           direction,
// //           furniture,
// //           isFeatured,

// //           sort,
// //           page,
// //           limit: 10,
// //         })
// //       );
// //     }, 300);

// //     return () => clearTimeout(timer);
// //   }, [
// //     dispatch,
// //     search,
// //     price,
// //     area,
// //     typeId,
// //     bedrooms,
// //     direction,
// //     furniture,
// //     isFeatured,
// //     sort,
// //     page,
// //   ]);

// //   // ================= PAGINATION =================
// //   const changePage = (newPage: number) => {
// //     const params = new URLSearchParams(searchParams.toString());
// //     params.set("page", String(newPage));
// //     router.push(`/properties?${params.toString()}`);
// //   };

// //   if (loading) return <div className={styles.loading}>Loading...</div>;
// //   if (error) return <div className={styles.error}>{error}</div>;

// //   return (
// //     <section className={styles.wrapper}>
// //       <h1 className={styles.title}>
// //         {search
// //           ? `Kết quả cho "${search}" (${total})`
// //           : `Danh sách bất động sản (${total})`}
// //       </h1>

// //       <div className={styles.grid}>
// //         {properties?.length > 0 ? (
// //           properties.map((item) => (
// //             <PropertyCard key={item.id} property={item} />
// //           ))
// //         ) : (
// //           <div className={styles.noResult}>
// //             Không tìm thấy kết quả
// //           </div>
// //         )}
// //       </div>

// //       {totalPages > 1 && (
// //         <div className={styles.pagination}>
// //           <button
// //             disabled={page === 1}
// //             onClick={() => changePage(page - 1)}
// //           >
// //             Prev
// //           </button>

// //           <span>
// //             Page {page} / {totalPages}
// //           </span>

// //           <button
// //             disabled={page === totalPages}
// //             onClick={() => changePage(page + 1)}
// //           >
// //             Next
// //           </button>
// //         </div>
// //       )}
// //     </section>
// //   );
// // }

"use client";

import { useEffect } from "react";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  useSearchParams,
  useRouter,
} from "next/navigation";

import {
  RootState,
  AppDispatch,
} from "@/stores/store";

import { fetchProperties } from "@/stores/slices/propertySlice";

import PropertyCard from "@/components/property/PropertyCard";

import styles from "./properties.module.css";

export default function PropertiesPage() {
  const dispatch =
    useDispatch<AppDispatch>();

  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const {
    properties,
    loading,
    error,
    totalPages,
    total,
  } = useSelector(
    (
      state: RootState
    ) =>
      state.properties
  );

  // ================= FETCH =================
  useEffect(() => {
    const search =
      searchParams.get("search") || "";

    const minPrice =
      searchParams.get("minPrice");

    const maxPrice =
      searchParams.get("maxPrice");

    const minArea =
      searchParams.get("minArea");

    const maxArea =
      searchParams.get("maxArea");

    const typeId =
      searchParams.get("typeId");

    const bedrooms =
      searchParams.get("bedrooms");

    const direction =
      searchParams.get("direction");

    const furniture =
      searchParams.get("furniture");

    const legalStatus =
      searchParams.get("legalStatus");

    const sort =
      searchParams.get("sort") ||
      "newest";

    const page = Number(
      searchParams.get("page") || 1
    );

    dispatch(
      fetchProperties({
        search,

        minPrice: minPrice
          ? Number(minPrice)
          : undefined,

        maxPrice: maxPrice
          ? Number(maxPrice)
          : undefined,

        minArea: minArea
          ? Number(minArea)
          : undefined,

        maxArea: maxArea
          ? Number(maxArea)
          : undefined,

        typeId: typeId
          ? Number(typeId)
          : undefined,

        bedrooms: bedrooms
          ? Number(bedrooms)
          : undefined,

        direction:
          direction || undefined,

        furniture:
          furniture || undefined,

        legalStatus:
          legalStatus ||
          undefined,

        sort,

        page,

        limit: 10,
      })
    );
  }, [
    dispatch,
    searchParams,
  ]);

  // ================= URL VALUES =================
  const search =
    searchParams.get(
      "search"
    ) || "";

  const currentPage =
    Number(
      searchParams.get(
        "page"
      ) || 1
    );

  // ================= PAGINATION =================
  const changePage = (
    newPage: number
  ) => {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    params.set(
      "page",
      String(newPage)
    );

    router.push(
      `/properties?${params.toString()}`
    );
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <section
        className={
          styles.wrapper
        }
      >
        <div
          className={
            styles.loading
          }
        >
          Đang tải danh sách bất động sản...
        </div>
      </section>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <section
        className={
          styles.wrapper
        }
      >
        <div
          className={
            styles.error
          }
        >
          Lỗi: {error}
        </div>
      </section>
    );
  }

  // ================= UI =================
  return (
    <section
      className={
        styles.wrapper
      }
    >
      {/* TITLE */}
      <h1
        className={
          styles.title
        }
      >
        {search
          ? `Kết quả cho "${search}" (${total})`
          : `Danh sách bất động sản (${total})`}
      </h1>

      {/* LIST */}
      <div
        className={
          styles.grid
        }
      >
        {properties?.length >
          0 ? (
          properties.map(
            (item) => (
              <PropertyCard
                key={
                  item.id
                }
                property={
                  item
                }
              />
            )
          )
        ) : (
          <div
            className={
              styles.noResult
            }
          >
            <p>
              Không tìm thấy kết quả phù hợp.
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div
          className={
            styles.pagination
          }
        >
          {/* PREV */}
          <button
            className={
              styles.pageBtn
            }
            disabled={
              currentPage === 1
            }
            onClick={() =>
              changePage(
                currentPage -
                1
              )
            }
          >
            Prev
          </button>

          {/* PAGE NUMBERS */}
          {Array.from(
            {
              length:
                totalPages,
            },
            (_, index) => (
              <button
                key={index}
                className={
                  currentPage ===
                    index + 1
                    ? styles.activePage
                    : styles.pageBtn
                }
                onClick={() =>
                  changePage(
                    index + 1
                  )
                }
              >
                {index + 1}
              </button>
            )
          )}

          {/* NEXT */}
          <button
            className={
              styles.pageBtn
            }
            disabled={
              currentPage ===
              totalPages
            }
            onClick={() =>
              changePage(
                currentPage +
                1
              )
            }
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}