import { Property } from "@/types/property";
import { Dispatch } from "redux";

export interface PropertyState {
  allProperties: Property[];
  selectedProperty: Property | null;
  loading: boolean;
  error: string | null;
}

// --- INITIAL STATE ---
const initialState: PropertyState = {
  allProperties: [],
  selectedProperty: null,
  loading: false,
  error: null,
};

// --- ACTION TYPES ---
export const FETCH_SUCCESS = "FETCH_SUCCESS" as const;
export const FETCH_FAILURE = "FETCH_FAILURE" as const;
export const SET_PROPERTY_LOADING = "SET_PROPERTY_LOADING" as const;
export const GET_PROPERTY_DETAIL = "GET_PROPERTY_DETAIL" as const;

export type PropertyAction =
  | { type: typeof FETCH_SUCCESS; payload: Property[] }
  | { type: typeof FETCH_FAILURE; payload: string }
  | { type: typeof SET_PROPERTY_LOADING; payload: boolean }
  | { type: typeof GET_PROPERTY_DETAIL; payload: string };

// --- ASYNC ACTIONS ---

export const fetchProperties = () => {
  // Thunk Middleware sẽ nhìn thấy hàm này và tự động truyền dispatch vào
  return async (dispatch: Dispatch<PropertyAction>) => {
    // 1. Báo loading
    dispatch({ type: SET_PROPERTY_LOADING, payload: true });

    try {
      const response = await fetch("http://localhost:3000/properties");
      if (!response.ok) throw new Error("Lỗi API");

      const data = await response.json();
      
      // 2. Thành công -> Đẩy data vào store
      dispatch({ type: FETCH_SUCCESS, payload: data });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Lỗi server";
      dispatch({ type: FETCH_FAILURE, payload: msg });
    } finally {
      // 3. Tắt loading
      dispatch({ type: SET_PROPERTY_LOADING, payload: false });
    }
  };
};

// Action đồng bộ để lấy chi tiết từ danh sách đã có
export const getPropertyDetail = (id: string) => ({
  type: GET_PROPERTY_DETAIL,
  payload: id,
});

// --- REDUCER ---
export default function propertyReducer(
  state = initialState,
  action: PropertyAction
): PropertyState {
  switch (action.type) {
    case SET_PROPERTY_LOADING:
      return { ...state, loading: action.payload, error: null };
      
    case FETCH_SUCCESS:
      return {
        ...state,
        allProperties: action.payload,
        error: null,
      };

    case FETCH_FAILURE:
      return { 
        ...state, 
        error: action.payload 
      };

    case GET_PROPERTY_DETAIL:
      return {
        ...state,
        selectedProperty: state.allProperties.find(p => String(p.id) === action.payload) || null,
      };

    default:
      return state;
  }
}