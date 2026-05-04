// projectSlice.ts

import { AppThunk, AppDispatch } from "../store";
import { Project } from "@/types/project";

export interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
  loading: false,
  error: null,
};

// ACTION TYPES
export const FETCH_PROJECTS_SUCCESS =
  "FETCH_PROJECTS_SUCCESS" as const;

export const SEARCH_PROJECTS_SUCCESS =
  "SEARCH_PROJECTS_SUCCESS" as const;

export const FETCH_PROJECTS_FAILURE =
  "FETCH_PROJECTS_FAILURE" as const;

export const FETCH_PROJECT_DETAIL =
  "FETCH_PROJECT_DETAIL" as const;

export const SET_PROJECTS_LOADING =
  "SET_PROJECTS_LOADING" as const;

export type ProjectAction =
  | {
      type: typeof FETCH_PROJECTS_SUCCESS;
      payload: Project[];
    }
  | {
      type: typeof SEARCH_PROJECTS_SUCCESS;
      payload: Project[];
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
      type: typeof FETCH_PROJECT_DETAIL;
      payload: Project;
    };

// FETCH ALL
export const fetchProjects = (): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: SET_PROJECTS_LOADING,
      payload: true,
    });

    try {
      const response = await fetch(
        "http://localhost:5000/projects"
      );

      if (!response.ok) {
        throw new Error(
          "Không thể lấy danh sách dự án"
        );
      }

      const data = await response.json();

      dispatch({
        type: FETCH_PROJECTS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Lỗi server";

      dispatch({
        type: FETCH_PROJECTS_FAILURE,
        payload: msg,
      });
    } finally {
      dispatch({
        type: SET_PROJECTS_LOADING,
        payload: false,
      });
    }
  };
};

// SEARCH PROJECT
export const fetchProjectsBySearch = (
  search: string
): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: SET_PROJECTS_LOADING,
      payload: true,
    });

    try {
      const response = await fetch(
        `http://localhost:5000/projects?search=${encodeURIComponent(
          search
        )}`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();

      dispatch({
        type: SEARCH_PROJECTS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Lỗi server";

      dispatch({
        type: FETCH_PROJECTS_FAILURE,
        payload: msg,
      });
    } finally {
      dispatch({
        type: SET_PROJECTS_LOADING,
        payload: false,
      });
    }
  };
};

// FETCH DETAIL
export const fetchProjectById = (
  id: string
): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: SET_PROJECTS_LOADING,
      payload: true,
    });

    try {
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
        payload: data,
      });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Lỗi server";

      dispatch({
        type: FETCH_PROJECTS_FAILURE,
        payload: msg,
      });
    } finally {
      dispatch({
        type: SET_PROJECTS_LOADING,
        payload: false,
      });
    }
  };
};

// REDUCER
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

    case SEARCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case FETCH_PROJECT_DETAIL:
      return {
        ...state,
        selectedProject: action.payload,
      };

    default:
      return state;
  }
}