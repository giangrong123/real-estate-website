import { Dispatch } from "redux";

/** STATE */
interface FavoriteState {
  favoriteIds: string[];
}

const initialState: FavoriteState = {
  favoriteIds: [],
};

/** ACTION TYPES */
export const SET_FAVORITES = "SET_FAVORITES" as const;

/** TYPES */
type FavoriteAction = {
  type: typeof SET_FAVORITES;
  payload: string[];
};

/** REDUCER */
const favoriteReducer = (
  state = initialState,
  action: FavoriteAction
): FavoriteState => {
  switch (action.type) {
    case SET_FAVORITES:
      return {
        ...state,
        favoriteIds: action.payload,
      };
    default:
      return state;
  }
};

export default favoriteReducer;

/** =========================
 * 🔥 THUNK API
 ========================= */

// GET FAVORITES
export const fetchFavorites = (userId: string) => {
  return async (dispatch: Dispatch<FavoriteAction>) => {
    const res = await fetch(`http://localhost:5000/favorites/${userId}`);
    const data = await res.json();

    dispatch({
      type: SET_FAVORITES,
      payload: data,
    });
  };
};

// TOGGLE FAVORITE
export const toggleFavoriteAPI = (userId: string, propertyId: string) => {
  return async (dispatch: Dispatch<FavoriteAction>) => {
    const res = await fetch("http://localhost:5000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, propertyId }),
    });

    const data = await res.json();

    dispatch({
      type: SET_FAVORITES,
      payload: data.data,
    });
  };
};