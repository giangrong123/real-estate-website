// stores/slices/projectSlice.ts

import { AppThunk, AppDispatch } from "../store";

import { Project } from "@/types/project";

import { api } from "@/libs/api";

// ================= STATE =================

export interface ProjectState {
  projects: Project[];

  selectedProject: Project | null;

  loading: boolean;

  error: string | null;

  page: number;

  totalPages: number;
}

const initialState: ProjectState = {
  projects: [],

  selectedProject: null,

  loading: false,

  error: null,

  page: 1,

  totalPages: 1,
};

// ================= ACTION TYPES =================

export const FETCH_PROJECTS_SUCCESS =
  "FETCH_PROJECTS_SUCCESS" as const;

export const FETCH_PROJECT_DETAIL =
  "FETCH_PROJECT_DETAIL" as const;

export const FETCH_PROJECTS_FAILURE =
  "FETCH_PROJECTS_FAILURE" as const;

export const SET_PROJECTS_LOADING =
  "SET_PROJECTS_LOADING" as const;

export const SET_PROJECT_PAGINATION =
  "SET_PROJECT_PAGINATION" as const;

// ================= ACTION TYPES =================

export type ProjectAction =
  | {
      type: typeof FETCH_PROJECTS_SUCCESS;

      payload: Project[];
    }
  | {
      type: typeof FETCH_PROJECT_DETAIL;

      payload: Project;
    }
  | {
      type: typeof FETCH_PROJECTS_FAILURE;

      payload: string;
    }
  | {
      type: typeof SET_PROJECTS_LOADING;

      payload: boolean;
    }
  | {
      type: typeof SET_PROJECT_PAGINATION;

      payload: {
        page: number;

        totalPages: number;
      };
    };

// ================= FETCH PROJECTS =================

export const fetchProjects = (
  page: number = 1
): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: SET_PROJECTS_LOADING,
        payload: true,
      });

      const res = await fetch(
        `http://localhost:5000/projects?page=${page}&limit=6`
      );

      if (!res.ok) {
        throw new Error(
          "Không thể lấy danh sách dự án"
        );
      }

      const data = await res.json();

      dispatch({
        type: FETCH_PROJECTS_SUCCESS,
        payload: data.data,
      });

      dispatch({
        type: SET_PROJECT_PAGINATION,
        payload: {
          page: data.pagination.page,

          totalPages:
            data.pagination.totalPages,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_PROJECTS_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Lỗi server",
      });
    } finally {
      dispatch({
        type: SET_PROJECTS_LOADING,
        payload: false,
      });
    }
  };
};

// ================= SEARCH PROJECT =================

export const fetchProjectsBySearch = (
  search: string
): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: SET_PROJECTS_LOADING,
        payload: true,
      });

      const res = await fetch(
        `http://localhost:5000/projects?search=${encodeURIComponent(
          search
        )}`
      );

      if (!res.ok) {
        throw new Error(
          "Tìm kiếm thất bại"
        );
      }

      const data = await res.json();

      dispatch({
        type: FETCH_PROJECTS_SUCCESS,
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: FETCH_PROJECTS_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Lỗi server",
      });
    } finally {
      dispatch({
        type: SET_PROJECTS_LOADING,
        payload: false,
      });
    }
  };
};

// ================= FETCH DETAIL =================

export const fetchProjectById =
  (
    id: string
  ): AppThunk<Promise<Project>> =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: SET_PROJECTS_LOADING,
        payload: true,
      });

      const res = await fetch(
        `http://localhost:5000/projects/${id}`
      );

      if (!res.ok) {
        throw new Error(
          "Không tìm thấy dự án"
        );
      }

      const data = await res.json();

      dispatch({
        type: FETCH_PROJECT_DETAIL,
        payload: data.data,
      });

      return data.data;
    } catch (err) {
      dispatch({
        type: FETCH_PROJECTS_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Lỗi server",
      });

      throw err;
    } finally {
      dispatch({
        type: SET_PROJECTS_LOADING,
        payload: false,
      });
    }
  };
// ================= CREATE PROJECT =================
export const createProject =(payload: {
    thumbnail: string;
    name: string;
    description: string;
    investor: string;
    status: string;
    address: string;
    contactPhone: string;
  }): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: SET_PROJECTS_LOADING, payload: true });

      const res = await api(
        "http://localhost:5000/admin/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Create failed");
      }

      // reload list sau khi tạo
      dispatch(fetchProjects(1));
    } catch (err) {
      dispatch({
        type: FETCH_PROJECTS_FAILURE,
        payload:
          err instanceof Error ? err.message : "Lỗi server",
      });
    } finally {
      dispatch({ type: SET_PROJECTS_LOADING, payload: false });
    }
  };

// ================= UPDATE PROJECT =================

export const updateProject =
  (
    id: number,
    payload: {
      thumbnail: string;
      name: string;
      description: string;
      investor: string;
      status: string;
      address: string;
      contactPhone: string;
    }
  ): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: SET_PROJECTS_LOADING, payload: true });

      const res = await api(
        `http://localhost:5000/admin/projects/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Update failed");
      }

      dispatch(fetchProjects(1));
    } catch (err) {
      dispatch({
        type: FETCH_PROJECTS_FAILURE,
        payload:
          err instanceof Error ? err.message : "Lỗi server",
      });
    } finally {
      dispatch({ type: SET_PROJECTS_LOADING, payload: false });
    }
  };

// ================= DELETE PROJECT =================

export const deleteProject = (
  id: number
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_PROJECTS_LOADING,
        payload: true,
      });

      const res = await api(
        `http://localhost:5000/admin/projects/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(
          data.message
        );
      }

      dispatch(fetchProjects());
    } catch (err) {
      dispatch({
        type: FETCH_PROJECTS_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Xóa thất bại",
      });
    } finally {
      dispatch({
        type: SET_PROJECTS_LOADING,
        payload: false,
      });
    }
  };
};

// ================= REDUCER =================

export default function projectReducer(
  state = initialState,

  action: ProjectAction
): ProjectState {
  switch (action.type) {
    case SET_PROJECTS_LOADING:
      return {
        ...state,

        loading: action.payload,

        error: null,
      };

    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,

        projects: action.payload,

        loading: false,

        error: null,
      };

    case FETCH_PROJECT_DETAIL:
      return {
        ...state,

        selectedProject:
          action.payload,

        loading: false,
      };

    case FETCH_PROJECTS_FAILURE:
      return {
        ...state,

        error: action.payload,

        loading: false,
      };

    case SET_PROJECT_PAGINATION:
      return {
        ...state,

        page: action.payload.page,

        totalPages:
          action.payload.totalPages,
      };

    default:
      return state;
  }
}