import { AppThunk, AppDispatch } from "../store";
import { News } from "@/types/news";

export interface NewsState {
  allNews: News[];
  selectedNews: News | null;
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  allNews: [],
  selectedNews: null,
  loading: false,
  error: null,
};

// ACTION TYPES
export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_FAILURE = "FETCH_NEWS_FAILURE";
export const FETCH_NEWS_DETAIL = "FETCH_NEWS_DETAIL";
export const SET_NEWS_LOADING = "SET_NEWS_LOADING";

export type NewsAction =
  | { type: typeof FETCH_NEWS_SUCCESS; payload: News[] }
  | { type: typeof FETCH_NEWS_FAILURE; payload: string }
  | { type: typeof FETCH_NEWS_DETAIL; payload: News }
  | { type: typeof SET_NEWS_LOADING; payload: boolean };

// THUNK LIST
export const fetchNews = (): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: SET_NEWS_LOADING, payload: true });

    try {
      const res = await fetch("http://localhost:5000/news");
      if (!res.ok) throw new Error("Lỗi load news");

      const data = await res.json();

      dispatch({ type: FETCH_NEWS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: FETCH_NEWS_FAILURE, payload: "Lỗi server" });
    } finally {
      dispatch({ type: SET_NEWS_LOADING, payload: false });
    }
  };
};

// THUNK DETAIL
export const fetchNewsById = (id: string): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: SET_NEWS_LOADING, payload: true });

    try {
      const res = await fetch(`http://localhost:5000/news/${id}`);
      if (!res.ok) throw new Error("Không tìm thấy bài viết");

      const data = await res.json();

      dispatch({ type: FETCH_NEWS_DETAIL, payload: data });
    } catch (err) {
      dispatch({ type: FETCH_NEWS_FAILURE, payload: "Lỗi load detail" });
    } finally {
      dispatch({ type: SET_NEWS_LOADING, payload: false });
    }
  };
};

// REDUCER
export default function newsReducer(
  state = initialState,
  action: NewsAction
): NewsState {
  switch (action.type) {
    case SET_NEWS_LOADING:
      return { ...state, loading: action.payload, error: null };

    case FETCH_NEWS_SUCCESS:
      return { ...state, allNews: action.payload };

    case FETCH_NEWS_DETAIL:
      return { ...state, selectedNews: action.payload };

    case FETCH_NEWS_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}