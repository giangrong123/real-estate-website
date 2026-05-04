import { Property } from "@/types/property";

import { Dispatch } from "redux";

export interface PropertyState {
  properties: Property[];

  selectedProperty: Property | null;

  loading: boolean;

  error: string | null;
}

const initialState: PropertyState = {
  properties: [],

  selectedProperty: null,

  loading: false,

  error: null,
};

//
// ACTION TYPES
//
export const FETCH_SUCCESS =
  "FETCH_SUCCESS" as const;

export const SEARCH_SUCCESS =
  "SEARCH_SUCCESS" as const;

export const FETCH_FAILURE =
  "FETCH_FAILURE" as const;

export const SET_PROPERTY_LOADING =
  "SET_PROPERTY_LOADING" as const;

export const GET_PROPERTY_DETAIL =
  "GET_PROPERTY_DETAIL" as const;

export const CREATE_PROPERTY =
  "CREATE_PROPERTY" as const;

export const DELETE_PROPERTY =
  "DELETE_PROPERTY" as const;

//
// ACTION TYPES
//
export type PropertyAction =
  | {
      type: typeof FETCH_SUCCESS;
      payload: Property[];
    }
  | {
      type: typeof SEARCH_SUCCESS;
      payload: Property[];
    }
  | {
      type: typeof FETCH_FAILURE;
      payload: string;
    }
  | {
      type: typeof SET_PROPERTY_LOADING;
      payload: boolean;
    }
  | {
      type: typeof GET_PROPERTY_DETAIL;
      payload: Property;
    }
  | {
      type: typeof CREATE_PROPERTY;
      payload: Property;
    }
  | {
    type: typeof DELETE_PROPERTY;
    payload: number;
  };

//
// FETCH ALL
//
export const fetchProperties = () => {
  return async (
    dispatch: Dispatch<PropertyAction>
  ) => {
    dispatch({
      type: SET_PROPERTY_LOADING,
      payload: true,
    });

    try {
      const response = await fetch(
        "http://localhost:5000/properties"
      );

      if (!response.ok) {
        throw new Error(
          "Không thể kết nối server"
        );
      }

      const data = await response.json();

      dispatch({
        type: FETCH_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Lỗi server";

      dispatch({
        type: FETCH_FAILURE,
        payload: msg,
      });
    } finally {
      dispatch({
        type: SET_PROPERTY_LOADING,
        payload: false,
      });
    }
  };
};

//
// SEARCH
//
export const fetchPropertiesBySearch = (
  search: string
) => {
  return async (
    dispatch: Dispatch<PropertyAction>
  ) => {
    dispatch({
      type: SET_PROPERTY_LOADING,
      payload: true,
    });

    try {
      const res = await fetch(
        `http://localhost:5000/properties?search=${encodeURIComponent(
          search
        )}`
      );

      if (!res.ok) {
        throw new Error("Search failed");
      }

      const data = await res.json();

      dispatch({
        type: SEARCH_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Lỗi server";

      dispatch({
        type: FETCH_FAILURE,
        payload: msg,
      });
    } finally {
      dispatch({
        type: SET_PROPERTY_LOADING,
        payload: false,
      });
    }
  };
};

//
// FETCH BY ID
//
export const fetchPropertyById = (
  id: string
) => {
  return async (
    dispatch: Dispatch<PropertyAction>
  ) => {
    dispatch({
      type: SET_PROPERTY_LOADING,
      payload: true,
    });

    try {
      const res = await fetch(
        `http://localhost:5000/properties/${id}`
      );

      if (!res.ok) {
        throw new Error(
          "Không tìm thấy dữ liệu"
        );
      }

      const data = await res.json();

      dispatch({
        type: GET_PROPERTY_DETAIL,
        payload: data,
      });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Lỗi server";

      dispatch({
        type: FETCH_FAILURE,
        payload: msg,
      });
    } finally {
      dispatch({
        type: SET_PROPERTY_LOADING,
        payload: false,
      });
    }
  };
};

//
// CREATE PROPERTY
//
export const createProperty = (
  property: Property
) => {
  return async (
    dispatch: Dispatch<PropertyAction>
  ) => {
    dispatch({
      type: SET_PROPERTY_LOADING,
      payload: true,
    });

    try {
      const res = await fetch(
        "http://localhost:5000/properties",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(property),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Đăng tin thất bại"
        );
      }

      const data = await res.json();

      dispatch({
        type: CREATE_PROPERTY,
        payload: data,
      });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Lỗi server";

      dispatch({
        type: FETCH_FAILURE,
        payload: msg,
      });
    } finally {
      dispatch({
        type: SET_PROPERTY_LOADING,
        payload: false,
      });
    }
  };
};

export const deleteProperty = (
  id: number
) => {
  return async (
    dispatch: Dispatch<PropertyAction>
  ) => {
    try {
      const res = await fetch(
        `http://localhost:5000/properties/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(
          "Xóa bài viết thất bại"
        );
      }

      dispatch({
        type: DELETE_PROPERTY,
        payload: id,
      });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Lỗi server";

      dispatch({
        type: FETCH_FAILURE,
        payload: msg,
      });
    }
  };
};

//
// REDUCER
//
export default function propertyReducer(
  state = initialState,

  action: PropertyAction
): PropertyState {
  switch (action.type) {
    case SET_PROPERTY_LOADING:
      return {
        ...state,

        loading: action.payload,

        error: null,
      };

    case FETCH_SUCCESS:
      return {
        ...state,

        properties: action.payload,

        error: null,
      };

    case SEARCH_SUCCESS:
      return {
        ...state,

        properties: action.payload,

        error: null,
      };

    case FETCH_FAILURE:
      return {
        ...state,

        error: action.payload,
      };

    case GET_PROPERTY_DETAIL:
      return {
        ...state,

        selectedProperty:
          action.payload,
      };

    case CREATE_PROPERTY:
      return {
        ...state,

        properties: [
          action.payload,
          ...state.properties,
        ],
      };

    case DELETE_PROPERTY:
      return {
        ...state,

    properties:
      state.properties.filter(
        (item) =>
          item.id !== action.payload
      ),
  };

    default:
      return state;
  }
}