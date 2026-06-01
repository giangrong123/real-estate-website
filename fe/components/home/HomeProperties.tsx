// "use client";

// import Link from "next/link";
// import styles from "./styles/HomeProperties.module.css";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { AppDispatch, RootState } from "@/stores/store";
// import { fetchProperties } from "@/stores/slices/propertySlice";



// export default function HomeProperties() {
//   const dispatch = useDispatch<AppDispatch>();

//   const { properties, loading } = useSelector(
//     (state: RootState) => state.properties
//   );

//   // UI state
//   const [limit, setLimit] = useState(8);
//   const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

//   // 👉 CALL API
//   useEffect(() => {
//   dispatch(
//     fetchProperties({
//       page: 1,
//       limit: 20,
//     })
//   );
// }, []);

//   function handleClick() {
//     setLimit((prev) => prev + 8);
//   }

//   function toggleLike(
//     e: React.MouseEvent<HTMLButtonElement>,
//     id: number
//   ) {
//     e.preventDefault();
//     e.stopPropagation();

//     setLikedIds((prev) => {
//       const next = new Set(prev);
//       next.has(id) ? next.delete(id) : next.add(id);
//       return next;
//     });
//   }

//   function getDaysAgo(createdAt: string | number | Date) {
//     const now = new Date().getTime();
//     const createdTime = new Date(createdAt).getTime();
//     const diffTime = now - createdTime;
//     return Math.floor(diffTime / (1000 * 60 * 60 * 24));
//   }

//   if (loading) {
//     return (
//       <div className={styles.bgc}>
//         <section className={styles.news}>
//           <div className={styles.header}>
//             <h2 className={styles.title}>Đang tải bất động sản...</h2>
//           </div>
//         </section>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.bgc}>
//       <section className={styles.news}>
//         <div className={styles.header}>
//           <h2 className={styles.title}>Bất động sản dành cho bạn</h2>
//         </div>

//         <div className={styles.list}>
//           {properties.slice(0, limit).map((item) => {
//             const liked = likedIds.has(item.id);

//             return (
//               <Link
//                 href={`/properties/${item.id}`}
//                 key={item.id}
//                 className={styles.link}
//               >
//                 <article className={styles.item}>
//                   <img src={item.thumbnail} alt={item.title} />

//                   <div className={styles.content}>
//                     <h3>{item.title}</h3>
//                     <p>{item.description}</p>
//                     <p>{item.address}</p>
//                     <span>{item.price} tỷ</span>
//                     <span> · </span>
//                     <span>{item.area} m²</span>
//                   </div>

//                   <div className={styles.content2}>
//                     <span>
//                       Đăng {getDaysAgo(item.createdAt)} ngày trước
//                     </span>

//                     <button
//                       type="button"
//                       onClick={(e) => toggleLike(e, item.id)}
//                       className={`${styles.likeBtn} ${
//                         liked ? styles.liked : ""
//                       }`}
//                     >
//                       ♥
//                     </button>
//                   </div>
//                 </article>
//               </Link>
//             );
//           })}
//         </div>

//         {/* FOOTER */}
//         <div className={styles.footer}>
//           {properties.length > limit ? (
//             <button className={styles.btn} onClick={handleClick}>
//               Xem thêm
//             </button>
//           ) : (
//             <Link href="/properties" className={styles.btn}>
//               Xem tiếp
//             </Link>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import styles from "./styles/HomeProperties.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/stores/store";
import { fetchProperties } from "@/stores/slices/propertySlice";
import { toggleFavoriteAPI } from "@/stores/slices/favoriteSlice";

export default function HomeProperties() {
  const dispatch = useDispatch<AppDispatch>();

  const { properties, loading } = useSelector(
    (state: RootState) => state.properties
  );

  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favoriteIds
  );

  const userId = useSelector(
    (state: RootState) => state.auth.user?.id
  );

  // UI state
  const [limit, setLimit] = useState(8);

  // 👉 FETCH DATA
  useEffect(() => {
    dispatch(
      fetchProperties({
        page: 1,
        limit: 20,
      })
    );
  }, [dispatch]);

  // ================= FAVORITE TOGGLE =================
  function handleToggleFav(
    e: React.MouseEvent<HTMLButtonElement>,
    propertyId: string
  ) {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) return;

    dispatch(toggleFavoriteAPI(propertyId, String(userId)));
  }

  // ================= LOAD MORE =================
  function handleClick() {
    setLimit((prev) => prev + 8);
  }

  // ================= TIME =================
  function getDaysAgo(createdAt: string | number | Date) {
    const now = new Date().getTime();
    const createdTime = new Date(createdAt).getTime();
    const diffTime = now - createdTime;

    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  // ================= LOADING =================
  if (loading) {
    return (
      <div className={styles.bgc}>
        <section className={styles.news}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              Đang tải bất động sản...
            </h2>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.bgc}>
      <section className={styles.news}>
        {/* HEADER */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Bất động sản dành cho bạn
          </h2>
        </div>

        {/* LIST */}
        <div className={styles.list}>
          {properties.slice(0, limit).map((item) => {
            const liked = favoriteIds.includes(String(item.id));

            return (
              <Link
                href={`/properties/${item.id}`}
                key={item.id}
                className={styles.link}
              >
                <article className={styles.item}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                  />

                  <div className={styles.content}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>{item.address}</p>

                    <span>{item.price} tỷ</span>
                    <span> · </span>
                    <span>{item.area} m²</span>
                  </div>

                  {/* FOOT */}
                  <div className={styles.content2}>
                    <span>
                      Đăng {getDaysAgo(item.createdAt)} ngày trước
                    </span>

                    <button
                      type="button"
                      onClick={(e) =>
                        handleToggleFav(e, String(item.id))
                      }
                      className={`${styles.likeBtn} ${
                        liked ? styles.liked : ""
                      }`}
                    >
                      ♥
                    </button>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          {properties.length > limit ? (
            <button
              className={styles.btn}
              onClick={handleClick}
            >
              Xem thêm
            </button>
          ) : (
            <Link href="/properties" className={styles.btn}>
              Xem tiếp
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}