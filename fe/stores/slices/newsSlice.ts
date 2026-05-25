import {
  AppThunk,
  AppDispatch,
} from "../store";

import { News } from "@/types/news";

import { api } from "@/libs/api";

// ================= STATE =================

export interface NewsState {
  news: News[];

  selectedNews:
    | News
    | null;

  loading: boolean;

  error: string | null;

  page: number;

  totalPages: number;
}

const initialState: NewsState =
  {
    news: [],

    selectedNews: null,

    loading: false,

    error: null,

    page: 1,

    totalPages: 1,
  };

// ================= ACTION TYPES =================

export const FETCH_NEWS_SUCCESS =
  "FETCH_NEWS_SUCCESS" as const;

export const FETCH_NEWS_DETAIL =
  "FETCH_NEWS_DETAIL" as const;

export const FETCH_NEWS_FAILURE =
  "FETCH_NEWS_FAILURE" as const;

export const SET_NEWS_LOADING =
  "SET_NEWS_LOADING" as const;

export const SET_NEWS_PAGINATION =
  "SET_NEWS_PAGINATION" as const;

// ================= ACTION TYPE =================

export type NewsAction =
  | {
      type: typeof FETCH_NEWS_SUCCESS;

      payload: News[];
    }
  | {
      type: typeof FETCH_NEWS_DETAIL;

      payload: News;
    }
  | {
      type: typeof FETCH_NEWS_FAILURE;

      payload: string;
    }
  | {
      type: typeof SET_NEWS_LOADING;

      payload: boolean;
    }
  | {
      type: typeof SET_NEWS_PAGINATION;

      payload: {
        page: number;

        totalPages: number;
      };
    };

// ================= FETCH LIST =================

export const fetchNews =
  (
    page: number = 1
  ): AppThunk =>
  async (
    dispatch: AppDispatch
  ) => {
    try {
      dispatch({
        type: SET_NEWS_LOADING,

        payload: true,
      });

      const res =
        await fetch(
          `http://localhost:5000/news?page=${page}&limit=6`
        );

      if (!res.ok) {
        throw new Error(
          "Không thể lấy danh sách news"
        );
      }

      const data =
        await res.json();

      dispatch({
        type: FETCH_NEWS_SUCCESS,

        payload: data.data,
      });

      dispatch({
        type:
          SET_NEWS_PAGINATION,

        payload: {
          page:
            data.pagination
              ?.page || 1,

          totalPages:
            data.pagination
              ?.totalPages ||
            1,
        },
      });
    } catch (err) {
      dispatch({
        type:
          FETCH_NEWS_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Lỗi server",
      });
    } finally {
      dispatch({
        type:
          SET_NEWS_LOADING,

        payload: false,
      });
    }
  };

// ================= FETCH DETAIL =================

export const fetchNewsById =
  (
    id: string
  ): AppThunk =>
  async (
    dispatch: AppDispatch
  ) => {
    try {
      dispatch({
        type:
          SET_NEWS_LOADING,

        payload: true,
      });

      const res =
        await fetch(
          `http://localhost:5000/news/${id}`
        );

      if (!res.ok) {
        throw new Error(
          "Không tìm thấy news"
        );
      }

      const data =
        await res.json();

      dispatch({
        type:
          FETCH_NEWS_DETAIL,

        payload: data.data,
      });

      return data.data;
    } catch (err) {
      dispatch({
        type:
          FETCH_NEWS_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Lỗi server",
      });

      throw err;
    } finally {
      dispatch({
        type:
          SET_NEWS_LOADING,

        payload: false,
      });
    }
  };

// ================= CREATE =================

export const createNews =
  (payload: {
    title: string;

    thumbnail: string;

    excerpt: string;

    content: string;
  }): AppThunk =>
  async (
    dispatch: AppDispatch
  ) => {
    try {
      dispatch({
        type:
          SET_NEWS_LOADING,

        payload: true,
      });

      const res =
        await api(
          "http://localhost:5000/admin/news",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              payload
            ),
          }
        );

      const data =
        await res.json();

      if (!data.success) {
        throw new Error(
          data.message ||
            "Create failed"
        );
      }

      dispatch(fetchNews(1));
    } catch (err) {
      dispatch({
        type:
          FETCH_NEWS_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Lỗi server",
      });
    } finally {
      dispatch({
        type:
          SET_NEWS_LOADING,

        payload: false,
      });
    }
  };

// ================= UPDATE =================

export const updateNews =
  (
    id: number,

    payload: {
      title: string;

      thumbnail: string;

      excerpt: string;

      content: string;
    }
  ): AppThunk =>
  async (
    dispatch: AppDispatch
  ) => {
    try {
      dispatch({
        type:
          SET_NEWS_LOADING,

        payload: true,
      });

      const res =
        await api(
          `http://localhost:5000/admin/news/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              payload
            ),
          }
        );

      const data =
        await res.json();

      if (!data.success) {
        throw new Error(
          data.message ||
            "Update failed"
        );
      }

      dispatch(fetchNews(1));
    } catch (err) {
      dispatch({
        type:
          FETCH_NEWS_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Lỗi server",
      });
    } finally {
      dispatch({
        type:
          SET_NEWS_LOADING,

        payload: false,
      });
    }
  };

// ================= DELETE =================

export const deleteNews =
  (
    id: number
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch({
        type:
          SET_NEWS_LOADING,

        payload: true,
      });

      const res =
        await api(
          `http://localhost:5000/admin/news/${id}`,
          {
            method:
              "DELETE",
          }
        );

      const data =
        await res.json();

      if (!data.success) {
        throw new Error(
          data.message ||
            "Delete failed"
        );
      }

      dispatch(fetchNews(1));
    } catch (err) {
      dispatch({
        type:
          FETCH_NEWS_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Xóa thất bại",
      });
    } finally {
      dispatch({
        type:
          SET_NEWS_LOADING,

        payload: false,
      });
    }
  };

// ================= REDUCER =================

export default function newsReducer(
  state = initialState,

  action: NewsAction
): NewsState {
  switch (
    action.type
  ) {
    case SET_NEWS_LOADING:
      return {
        ...state,

        loading:
          action.payload,

        error: null,
      };

    case FETCH_NEWS_SUCCESS:
      return {
        ...state,

        news:
          action.payload,

        loading: false,

        error: null,
      };

    case FETCH_NEWS_DETAIL:
      return {
        ...state,

        selectedNews:
          action.payload,

        loading: false,
      };

    case FETCH_NEWS_FAILURE:
      return {
        ...state,

        error:
          action.payload,

        loading: false,
      };

    case SET_NEWS_PAGINATION:
      return {
        ...state,

        page:
          action.payload
            .page,

        totalPages:
          action.payload
            .totalPages,
      };

    default:
      return state;
  }
}