import { User } from "@/types/user";
import { AppThunk, AppDispatch } from "../store";

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

// restore localStorage
if (typeof window !== "undefined") {
  try {
    const savedUser = localStorage.getItem("user");
    const savedIsLoggedIn = localStorage.getItem("isLoggedIn");

    initialState.isLoggedIn = savedIsLoggedIn === "true";

    if (savedUser) {
      initialState.user = JSON.parse(savedUser);
    }
  } catch (err) {
    console.error("LocalStorage error:", err);
  }
};

// ===================== ACTION TYPES =====================
export const LOGIN_SUCCESS = "LOGIN_SUCCESS" as const;
export const LOGIN_FAILURE = "LOGIN_FAILURE" as const;
export const LOGOUT = "LOGOUT" as const;
export const SET_AUTH_LOADING = "SET_AUTH_LOADING" as const;

export type AuthAction =
  | { type: typeof LOGIN_SUCCESS; payload: User }
  | { type: typeof LOGIN_FAILURE; payload: string }
  | { type: typeof SET_AUTH_LOADING; payload: boolean }
  | { type: typeof LOGOUT };

// ===================== THUNK LOGIN (CHUNG 1 API) =====================
export const login = (
  credentials: { email: string; password: string }
): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: SET_AUTH_LOADING, payload: true });

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok && data.isAuthenticated) {
        const user: User = data.user;

        // save localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        dispatch({
          type: LOGIN_SUCCESS,
          payload: user,
        });
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: data.message || "Đăng nhập thất bại",
        });
      }
    } catch (err) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: "Lỗi kết nối server",
      });
    } finally {
      dispatch({
        type: SET_AUTH_LOADING,
        payload: false,
      });
    }
  };
};

// ===================== LOGOUT =====================
export const logout = (): AppThunk => {
  return (dispatch: AppDispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");

    dispatch({ type: LOGOUT });
  };
};

// ===================== REDUCER =====================
export default function authReducer(
  state = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case SET_AUTH_LOADING:
      return { ...state, loading: action.payload, error: null };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        loading: false,
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    default:
      return state;
  }
}