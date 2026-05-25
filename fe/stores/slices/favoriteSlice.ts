import { Dispatch } from "redux";
import { api } from "@/libs/api";
/** =========================
 * STATE
========================= */

interface FavoriteState {
  loading: boolean;
  favoriteIds: string[];
}

/** =========================
 * INITIAL STATE
========================= */

const initialState: FavoriteState = {
  loading: false,
  favoriteIds: [],
};

/** =========================
 * ACTION TYPES
========================= */

export const SET_FAVORITES =
  "SET_FAVORITES" as const;

export const RESET_FAVORITES =
  "RESET_FAVORITES" as const;

export const SET_LOADING =
  "SET_LOADING" as const;

/** =========================
 * ACTION TYPES
========================= */

type FavoriteAction =
  | {
      type: typeof SET_FAVORITES;
      payload: string[];
    }

  | {
      type: typeof RESET_FAVORITES;
    }

  | {
      type: typeof SET_LOADING;
      payload: boolean;
    };

/** =========================
 * REDUCER
========================= */

const favoriteReducer = (
  state = initialState,
  action: FavoriteAction
): FavoriteState => {
  switch (action.type) {
    // ===== SET FAVORITES =====
    case SET_FAVORITES:
      return {
        ...state,

        favoriteIds:
          Array.isArray(
            action.payload
          )
            ? action.payload
            : [],

        loading: false,
      };

    // ===== LOADING =====
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    // ===== RESET =====
    case RESET_FAVORITES:
      return initialState;

    default:
      return state;
  }
};

export default favoriteReducer;

/** =========================
 * THUNKS
========================= */

// =========================
// GET FAVORITES
// =========================

export const fetchFavorites = (
  userId: string
) => {
  return async (
    dispatch: Dispatch<FavoriteAction>
  ) => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });

      // 🔥 TOKEN
      const token =
        localStorage.getItem(
          "token"
        );

      const res = await api(
        `http://localhost:5000/favorites/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🚨 ERROR
      if (!res.ok) {
        throw new Error(
          `HTTP ${res.status}`
        );
      }

      const data =
        await res.json();

      dispatch({
        type: SET_FAVORITES,

        // SAFE DATA
        payload:
          data.data ||
          data ||
          [],
      });
    } catch (error) {
      console.error(
        "fetchFavorites error:",
        error
      );

      dispatch({
        type: SET_FAVORITES,
        payload: [],
      });
    }
  };
};

// =========================
// TOGGLE FAVORITE
// =========================

export const toggleFavoriteAPI = (
  // userId: string,
  propertyId: string
) => {
  return async (
    dispatch: Dispatch<FavoriteAction>
  ) => {
    try {
      // 🔥 TOKEN
      const token =
        localStorage.getItem(
          "token"
        );

      const res = await api(
        "http://localhost:5000/favorites",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            // userId,
            propertyId,
          }),
        }
      );

      // 🚨 HANDLE ERROR
      if (!res.ok) {
        throw new Error(
          `HTTP ${res.status}`
        );
      }

      const data =
        await res.json();

      dispatch({
        type: SET_FAVORITES,

        // SAFE DATA
        payload:
          data.data ||
          data ||
          [],
      });
    } catch (error) {
      console.error(
        "toggleFavorite error:",
        error
      );
    }
  };
};

// =========================
// RESET FAVORITES
// =========================

export const resetFavorites = () => {
  return (
    dispatch: Dispatch<FavoriteAction>
  ) => {
    dispatch({
      type: RESET_FAVORITES,
    });
  };
};