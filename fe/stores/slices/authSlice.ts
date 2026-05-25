import { User } from "@/types/user";
import { AppThunk, AppDispatch } from "../store";

// ===================== STATE =====================

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;

  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,

  loading: false,
  error: null,
};

// ===================== RESTORE LOCAL STORAGE =====================

if (typeof window !== "undefined") {
  try {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser) {
      initialState.user = JSON.parse(savedUser);
    }

    if (savedToken) {
      initialState.token = savedToken;
      initialState.isLoggedIn = true;
    }
  } catch (err) {
    console.error("LocalStorage error:", err);
  }
}

// ===================== ACTION TYPES =====================

export const LOGIN_SUCCESS = "LOGIN_SUCCESS" as const;

export const LOGIN_FAILURE = "LOGIN_FAILURE" as const;

export const LOGOUT = "LOGOUT" as const;

export const SET_AUTH_LOADING = "SET_AUTH_LOADING" as const;

export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS" as const;

export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL" as const;

// ===================== ACTION TYPES =====================

export type AuthAction =
  | {
      type: typeof LOGIN_SUCCESS;
      payload: {
        user: User;
        token: string;
      };
    }
  | {
      type: typeof LOGIN_FAILURE;
      payload: string;
    }
  | {
      type: typeof SET_AUTH_LOADING;
      payload: boolean;
    }
  | {
      type: typeof UPDATE_USER_SUCCESS;
      payload: User;
    }
  | {
      type: typeof UPDATE_USER_FAIL;
      payload: string;
    }
  | {
      type: typeof LOGOUT;
    };

// ===================== REGISTER =====================

export const register = (payload: {
  name: string;
  email: string;
  password: string;
}): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: SET_AUTH_LOADING,
        payload: true,
      });

      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // save localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user: data.user,
          token: data.token || "",
        },
      });
    } catch (err: any) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: err.message || "Đăng ký thất bại",
      });
    } finally {
      dispatch({
        type: SET_AUTH_LOADING,
        payload: false,
      });
    }
  };
};

// ===================== LOGIN =====================

export const login = (credentials: {
  email: string;
  password: string;
}): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: SET_AUTH_LOADING,
        payload: true,
      });

      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      // save localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      localStorage.setItem("token", data.token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user: data.user,
          token: data.token,
        },
      });
    } catch (err: any) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: err.message || "Lỗi kết nối server",
      });
    } finally {
      dispatch({
        type: SET_AUTH_LOADING,
        payload: false,
      });
    }
  };
};

export const adminLogin = (credentials: {
  email: string;
  password: string;
}): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: SET_AUTH_LOADING, payload: true });

      const res = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        const customError: any = new Error(
          data.message || "Đăng nhập thất bại",
        );
        customError.status = res.status; // Gắn thêm status (401, 500...) vào đây
        throw customError;
      }

      localStorage.setItem("user", JSON.stringify(data.admin));

      localStorage.setItem("token", data.token);
      console.log(localStorage.getItem("token"));

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user: data.admin,
          token: data.token,
        },
      });
      console.log(data);

      // ✅ IMPORTANT
      return data.admin;
    } catch (err: any) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: err.message || "Admin login failed",
      });

      // 🔥 CRITICAL FIX: phải throw lại
      throw err;
    } finally {
      dispatch({ type: SET_AUTH_LOADING, payload: false });
    }
  };
};

// ===================== LOGOUT =====================

export const logout = (): AppThunk => {
  return (dispatch: AppDispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    dispatch({
      type: LOGOUT,
    });
  };
};

// ===================== UPDATE USER =====================

export const updateUser = (payload: {
  name: string;
  email: string;
  phone: string;
}): AppThunk => {
  return async (dispatch: AppDispatch, getState) => {
    try {
      dispatch({
        type: SET_AUTH_LOADING,
        payload: true,
      });

      const token = getState().auth.token;

      const res = await fetch("http://localhost:5000/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: data.user,
      });
    } catch (err: any) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: err.message || "Cập nhật thất bại",
      });
    } finally {
      dispatch({
        type: SET_AUTH_LOADING,
        payload: false,
      });
    }
  };
};

// ===================== CHANGE PASSWORD =====================

export const changePassword = (payload: {
  currentPassword: string;
  newPassword: string;
}): AppThunk => {
  return async (dispatch: AppDispatch, getState) => {
    try {
      dispatch({
        type: SET_AUTH_LOADING,
        payload: true,
      });

      const token = getState().auth.token;

      const res = await fetch("http://localhost:5000/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Đổi mật khẩu thành công");
    } catch (err: any) {
      alert(err.message || "Đổi mật khẩu thất bại");
    } finally {
      dispatch({
        type: SET_AUTH_LOADING,
        payload: false,
      });
    }
  };
};

// ===================== REDUCER =====================

export default function authReducer(
  state = initialState,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,

        isLoggedIn: true,

        user: action.payload.user,
        token: action.payload.token,

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
        token: null,

        error: null,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
