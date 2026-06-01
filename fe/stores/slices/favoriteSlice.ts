// import { Dispatch } from "redux";
// import { api } from "@/libs/api";
// import { Property } from "@/types/property";

// /** =========================
//  * STATE
//  ========================= */

// interface FavoriteState {
//   loading: boolean;
//   favorites: Property[];
// }

// /** =========================
//  * INITIAL STATE
//  ========================= */

// const initialState: FavoriteState = {
//   loading: false,
//   favorites: [],
// };

// /** =========================
//  * ACTION TYPES
//  ========================= */

// export const SET_FAVORITES =
//   "SET_FAVORITES" as const;

// export const RESET_FAVORITES =
//   "RESET_FAVORITES" as const;

// export const SET_LOADING =
//   "SET_LOADING" as const;

// /** =========================
//  * ACTION TYPES
//  ========================= */

// type FavoriteAction =
//   | {
//       type: typeof SET_FAVORITES;
//       payload: Property[];
//     }
//   | {
//       type: typeof RESET_FAVORITES;
//     }
//   | {
//       type: typeof SET_LOADING;
//       payload: boolean;
//     };

// /** =========================
//  * REDUCER
//  ========================= */

// const favoriteReducer = (
//   state = initialState,
//   action: FavoriteAction
// ): FavoriteState => {
//   switch (action.type) {
//     case SET_FAVORITES:
//       return {
//         ...state,

//         favorites: Array.isArray(
//           action.payload
//         )
//           ? action.payload
//           : [],

//         loading: false,
//       };

//     case SET_LOADING:
//       return {
//         ...state,
//         loading: action.payload,
//       };

//     case RESET_FAVORITES:
//       return initialState;

//     default:
//       return state;
//   }
// };

// export default favoriteReducer;

// /** =========================
//  * THUNKS
//  ========================= */

// // =========================
// // GET FAVORITES
// // =========================

// export const fetchFavorites =
//   (userId: string) =>
//   async (
//     dispatch: Dispatch<FavoriteAction>
//   ) => {
//     try {
//       dispatch({
//         type: SET_LOADING,
//         payload: true,
//       });

//       const token =
//         localStorage.getItem(
//           "token"
//         );

//       const res = await api(
//         `http://localhost:5000/favorites/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!res.ok) {
//         throw new Error(
//           `HTTP ${res.status}`
//         );
//       }

//       const data =
//         await res.json();

//       dispatch({
//         type: SET_FAVORITES,
//         payload:
//           data.data ||
//           data ||
//           [],
//       });
//     } catch (error) {
//       console.error(
//         "fetchFavorites error:",
//         error
//       );

//       dispatch({
//         type: SET_FAVORITES,
//         payload: [],
//       });
//     }
//   };

// // =========================
// // TOGGLE FAVORITE
// // =========================

// export const toggleFavoriteAPI =
//   (propertyId: string) =>
//   async (
//     dispatch: Dispatch<FavoriteAction>
//   ) => {
//     try {
//       const token =
//         localStorage.getItem(
//           "token"
//         );

//       const res = await api(
//         "http://localhost:5000/favorites",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type":
//               "application/json",

//             Authorization: `Bearer ${token}`,
//           },

//           body: JSON.stringify({
//             propertyId,
//           }),
//         }
//       );

//       if (!res.ok) {
//         throw new Error(
//           `HTTP ${res.status}`
//         );
//       }

//       const data =
//         await res.json();

//       dispatch({
//         type: SET_FAVORITES,
//         payload:
//           data.data ||
//           data ||
//           [],
//       });
//     } catch (error) {
//       console.error(
//         "toggleFavorite error:",
//         error
//       );
//     }
//   };

// // =========================
// // RESET FAVORITES
// // =========================

// export const resetFavorites =
//   () =>
//   (
//     dispatch: Dispatch<FavoriteAction>
//   ) => {
//     dispatch({
//       type: RESET_FAVORITES,
//     });
//   };

import { Dispatch } from "redux";
import { api } from "@/libs/api";
import { Property } from "@/types/property";

/** =========================
 * STATE
 ========================= */

interface FavoriteState {
  loading: boolean;
  favorites: Property[];
  favoriteIds: string[];
}

/** =========================
 * INITIAL STATE
 ========================= */

const initialState: FavoriteState = {
  loading: false,
  favorites: [],
  favoriteIds: [],
};

/** =========================
 * ACTION TYPES
 ========================= */

export const SET_FAVORITES = "SET_FAVORITES" as const;
export const SET_FAVORITE_IDS = "SET_FAVORITE_IDS" as const;
export const RESET_FAVORITES = "RESET_FAVORITES" as const;
export const SET_LOADING = "SET_LOADING" as const;

/** =========================
 * ACTION TYPES
 ========================= */

type FavoriteAction =
  | { type: typeof SET_FAVORITES; payload: Property[] }
  | { type: typeof SET_FAVORITE_IDS; payload: string[] }
  | { type: typeof RESET_FAVORITES }
  | { type: typeof SET_LOADING; payload: boolean };

/** =========================
 * REDUCER
 ========================= */

const favoriteReducer = (
  state = initialState,
  action: FavoriteAction
): FavoriteState => {
  switch (action.type) {
    case SET_FAVORITES:
      return {
        ...state,
        favorites: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };

    case SET_FAVORITE_IDS:
      return {
        ...state,
        favoriteIds: Array.isArray(action.payload) ? action.payload : [],
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case RESET_FAVORITES:
      return initialState;

    default:
      return state;
  }
};

export default favoriteReducer;

/** =========================
 * FETCH FAVORITES (FULL DATA)
 ========================= */

export const fetchFavorites =
  (userId: string) =>
  async (dispatch: Dispatch<FavoriteAction>) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });

      const token = localStorage.getItem("token");

      const res = await api(
        `http://localhost:5000/favorites/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      const properties = data.data || [];

      dispatch({
        type: SET_FAVORITES,
        payload: properties,
      });

      // 🔥 auto sync ids luôn (QUAN TRỌNG)
      dispatch({
        type: SET_FAVORITE_IDS,
        payload: properties.map((p: Property) => String(p.id)),
      });
    } catch (error) {
      console.error("fetchFavorites error:", error);

      dispatch({ type: SET_FAVORITES, payload: [] });
      dispatch({ type: SET_FAVORITE_IDS, payload: [] });
    }
  };

/** =========================
 * TOGGLE FAVORITE (OPTIMIZED)
 ========================= */

export const toggleFavoriteAPI =
  (propertyId: string, userId: string) =>
  async (dispatch: Dispatch<FavoriteAction>) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api("http://localhost:5000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ propertyId }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      const favoriteIds: string[] = data.data || [];

dispatch({
  type: SET_FAVORITE_IDS,
  payload: favoriteIds,
});
    } catch (error) {
      console.error("toggleFavorite error:", error);
    }
  };

/** =========================
 * RESET
 ========================= */

export const resetFavorites = () => (dispatch: Dispatch<FavoriteAction>) => {
  dispatch({ type: RESET_FAVORITES });
};