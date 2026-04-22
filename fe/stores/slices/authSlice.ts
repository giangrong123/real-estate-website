import { User } from "@/types/user";
import { Dispatch } from "redux";

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// --- INITIAL STATE ---
const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

// Load dữ liệu từ localStorage an toàn hơn
if (typeof window !== "undefined") {
  try {
    const savedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const savedUser = localStorage.getItem("user");

    initialState.isLoggedIn = savedIsLoggedIn === "true";

    if (savedUser) {
      initialState.user = JSON.parse(savedUser);
    }
  } catch (err) {
    console.error("Lỗi khi đọc localStorage:", err);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  }
}

// --- ACTION TYPES ---
export const LOGIN_SUCCESS = "LOGIN_SUCCESS" as const;
export const LOGIN_FAILURE = "LOGIN_FAILURE" as const;
export const LOGOUT = "LOGOUT" as const;
export const SET_LOADING = "SET_LOADING" as const;

export type AuthAction =
  | { type: typeof LOGIN_SUCCESS; payload: User }
  | { type: typeof LOGIN_FAILURE; payload: string }
  | { type: typeof SET_LOADING; payload: boolean }
  | { type: typeof LOGOUT };

// --- ASYNC ACTIONS ---

export const login = async (
  dispatch: Dispatch<AuthAction>,
  credentials: { email: string; password: string },
) => {
  dispatch({ type: SET_LOADING, payload: true });

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    console.log(data);

    if (data.isAuthenticated) {
      const userToSave = data.user || { email: credentials.email };

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(userToSave));

      dispatch({ type: LOGIN_SUCCESS, payload: userToSave });
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: data.message || "Sai email hoặc mật khẩu",
      });
    }
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: "Lỗi kết nối đến server" });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const logout = (dispatch: Dispatch<AuthAction>) => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("user");
  dispatch({ type: LOGOUT });
};

// --- REDUCER ---
export default function authReducer(
  state = initialState,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null,
        loading: false,
      };
    case LOGIN_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case LOGOUT:
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
}
