import {
  Property,
  CreatePropertyPayload,
} from "@/types/property";

import { Dispatch } from "redux";

import { api } from "@/libs/api";

// ================= STATE =================

export interface PropertyState {
  properties: Property[];

  selectedProperty:
    | Property
    | null;

  loading: boolean;

  error: string | null;

  currentPage: number;

  totalPages: number;

  total: number;
}

const initialState: PropertyState =
  {
    properties: [],

    selectedProperty: null,

    loading: false,

    error: null,

    currentPage: 1,

    totalPages: 1,

    total: 0,
  };

// ================= FILTER TYPES =================

export interface PropertyFilters {
  search?: string;

  minPrice?: number;

  maxPrice?: number;

  minArea?: number;

  maxArea?: number;

  sort?: string;

  page?: number;

  limit?: number;
}

// ================= ACTION TYPES =================

export const FETCH_SUCCESS =
  "FETCH_SUCCESS" as const;

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

export const UPDATE_PROPERTY =
  "UPDATE_PROPERTY" as const;

// ================= ACTION TYPES =================

export type PropertyAction =
  | {
      type:
        typeof FETCH_SUCCESS;

      payload: {
        data: Property[];

        pagination?: {
          total: number;

          currentPage: number;

          totalPages: number;

          limit: number;
        };
      };
    }
  | {
      type:
        typeof FETCH_FAILURE;

      payload: string;
    }
  | {
      type:
        typeof SET_PROPERTY_LOADING;

      payload: boolean;
    }
  | {
      type:
        typeof GET_PROPERTY_DETAIL;

      payload: Property;
    }
  | {
      type:
        typeof CREATE_PROPERTY;

      payload: Property;
    }
  | {
      type:
        typeof DELETE_PROPERTY;

      payload: number;
    }
  | {
      type:
        typeof UPDATE_PROPERTY;

      payload: Property;
    };

// ================= USER FETCH =================

export const fetchProperties =
  (
    filters: PropertyFilters = {}
  ) =>
  async (
    dispatch: Dispatch<PropertyAction>
  ) => {
    dispatch({
      type:
        SET_PROPERTY_LOADING,

      payload: true,
    });

    try {
      const params =
        new URLSearchParams();

      // SEARCH
      if (filters.search) {
        params.set(
          "search",
          filters.search
        );
      }

      // PRICE
      if (
        filters.minPrice
      ) {
        params.set(
          "minPrice",
          String(
            filters.minPrice
          )
        );
      }

      if (
        filters.maxPrice
      ) {
        params.set(
          "maxPrice",
          String(
            filters.maxPrice
          )
        );
      }

      // AREA
      if (
        filters.minArea
      ) {
        params.set(
          "minArea",
          String(
            filters.minArea
          )
        );
      }

      if (
        filters.maxArea
      ) {
        params.set(
          "maxArea",
          String(
            filters.maxArea
          )
        );
      }

      // SORT
      if (filters.sort) {
        params.set(
          "sort",
          filters.sort
        );
      }

      // PAGINATION
      params.set(
        "page",
        String(
          filters.page || 1
        )
      );

      params.set(
        "limit",
        String(
          filters.limit ||
            10
        )
      );

      console.log(
  "🔥 FINAL URL:",
  `http://localhost:5000/properties?${params.toString()}`
);

      const res =
        await fetch(
          `http://localhost:5000/properties?${params.toString()}`
        );

      if (!res.ok) {
        throw new Error(
          "Fetch properties failed"
        );
      }

      const data =
        await res.json();

      dispatch({
        type:
          FETCH_SUCCESS,

        payload: data,
      });
    } catch (err) {
      dispatch({
        type:
          FETCH_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Lỗi server",
      });
    } finally {
      dispatch({
        type:
          SET_PROPERTY_LOADING,

        payload: false,
      });
    }
  };

// export const fetchProperties =
//   (filters = {}) =>
//   async (dispatch: any) => {
//     dispatch({ type: SET_PROPERTY_LOADING, payload: true });

//     try {
//       const params = new URLSearchParams();

//       Object.entries(filters).forEach(([key, value]) => {
//         if (
//           value === null ||
//           value === undefined ||
//           value === ""
//         ) return;

//         params.set(key, String(value));
//       });

//       const url = `http://localhost:5000/properties?${params.toString()}`;

//       console.log("FETCH URL:", url); // 🔥 DEBUG QUAN TRỌNG

//       const res = await fetch(url);

//       const data = await res.json();

//       dispatch({
//         type: FETCH_SUCCESS,
//         payload: {
//           properties: data.data,
//           total: data.pagination?.total,
//           totalPages: data.pagination?.totalPages,
//         },
//       });
//     } catch (err: any) {
//       dispatch({
//         type: FETCH_FAILURE,
//         payload: err.message || "Lỗi server",
//       });
//     } finally {
//       dispatch({ type: SET_PROPERTY_LOADING, payload: false });
//     }
//   };

// ================= ADMIN FETCH =================

// export const fetchPropertiesAdmin =
//   () =>
//   async (
//     dispatch: Dispatch<PropertyAction>
//   ) => {
//     dispatch({
//       type:
//         SET_PROPERTY_LOADING,

//       payload: true,
//     });

//     try {
//       const res =
//         await fetch(
//           `http://localhost:5000/admin/properties`
//         );

//       const data =
//         await res.json();

//       dispatch({
//         type:
//           FETCH_SUCCESS,

//         payload: data,
//       });
//     } catch (err) {
//       dispatch({
//         type:
//           FETCH_FAILURE,

//         payload:
//           err instanceof Error
//             ? err.message
//             : "Lỗi server",
//       });
//     } finally {
//       dispatch({
//         type:
//           SET_PROPERTY_LOADING,

//         payload: false,
//       });
//     }
//   };

export const fetchPropertiesAdmin =
  (
    params: {
      status?: string;
      approved?: boolean;
      page?: number;
      limit?: number;
    } = {}
  ) =>
  async (dispatch: Dispatch<PropertyAction>) => {

    dispatch({
      type: SET_PROPERTY_LOADING,
      payload: true,
    });

    try {

      let query = "";

      if (params.status) {
        query += `status=${params.status}&`;
      }

      if (params.approved !== undefined) {
        query += `approved=${params.approved}&`;
      }

      if (params.page) {
        query += `page=${params.page}&`;
      }

      if (params.limit) {
        query += `limit=${params.limit}&`;
      }

      const res = await api(
        `http://localhost:5000/admin/properties?${query}`
      );

      const data = await res.json();

      dispatch({
        type: FETCH_SUCCESS,
        payload: data,
      });

    } catch (err) {

      dispatch({
        type: FETCH_FAILURE,
        payload:
          err instanceof Error
            ? err.message
            : "Lỗi server",
      });

    } finally {

      dispatch({
        type: SET_PROPERTY_LOADING,
        payload: false,
      });
    }
  };
// ================= BY ID =================

export const fetchPropertyById =
  (id: string) =>
  async (
    dispatch: Dispatch<PropertyAction>
  ) => {
    dispatch({
      type:
        SET_PROPERTY_LOADING,

      payload: true,
    });

    try {
      const res =
        await fetch(
          `http://localhost:5000/properties/${id}`
        );

      const data =
        await res.json();

      dispatch({
        type:
          GET_PROPERTY_DETAIL,

        payload: data,
      });
    } catch (err) {
      dispatch({
        type:
          FETCH_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Lỗi server",
      });
    } finally {
      dispatch({
        type:
          SET_PROPERTY_LOADING,

        payload: false,
      });
    }
  };

// ================= CREATE =================

export const createProperty =(property: CreatePropertyPayload) =>
  async (
    dispatch: Dispatch<PropertyAction>
  ) => {
    dispatch({
      type:
        SET_PROPERTY_LOADING,

      payload: true,
    });

    try {
      const res =
        await api(
          "http://localhost:5000/properties",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              property
            ),
          }
        );

      const data =
        await res.json();

      dispatch({
        type:
          CREATE_PROPERTY,

        payload: data,
      });
    } catch (err) {
      dispatch({
        type:
          FETCH_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Lỗi server",
      });
    } finally {
      dispatch({
        type:
          SET_PROPERTY_LOADING,

        payload: false,
      });
    }
  };

// ================= DELETE =================

export const deleteProperty =
  (id: number) =>
  async (
    dispatch: Dispatch<PropertyAction>
  ) => {
    try {
      const res =
        await fetch(
          `http://localhost:5000/properties/${id}`,
          {
            method:
              "DELETE",
          }
        );

      if (!res.ok) {
        throw new Error(
          "Delete failed"
        );
      }

      dispatch({
        type:
          DELETE_PROPERTY,

        payload: id,
      });
    } catch (err) {
      dispatch({
        type:
          FETCH_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Lỗi server",
      });
    }
  };

// ================= UPDATE =================

export const updateProperty =
  (
    id: number,

    data: Property
  ) =>
  async (
    dispatch: Dispatch<PropertyAction>
  ) => {
    try {
      const res =
        await api(
          `http://localhost:5000/properties/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              data
            ),
          }
        );

      const result =
        await res.json();

      dispatch({
        type:
          UPDATE_PROPERTY,

        payload: result,
      });
    } catch {
      dispatch({
        type:
          FETCH_FAILURE,

        payload:
          "Update failed",
      });
    }
  };

// ================= APPROVE =================

export const approveProperty =
  (id: number) =>
  async (
    dispatch: Dispatch<PropertyAction>
  ) => {
    try {
      const res =
        await api(
          `http://localhost:5000/admin/properties/${id}/approve`,
          {
            method: "PUT",
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          "Approve failed"
        );
      }

      dispatch({
        type:
          UPDATE_PROPERTY,

        payload:
          data.data,
      });
    } catch (err) {
      dispatch({
        type:
          FETCH_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Approve error",
      });
    }
  };

// ================= REDUCER =================

export default function propertyReducer(
  state = initialState,

  action: PropertyAction
): PropertyState {
  switch (
    action.type
  ) {
    case SET_PROPERTY_LOADING:
      return {
        ...state,

        loading:
          action.payload,

        error: null,
      };

    case FETCH_SUCCESS:
      return {
        ...state,

        properties:
          action.payload
            .data ?? [],

        currentPage:
          action.payload
            .pagination
            ?.currentPage ??
          1,

        totalPages:
          action.payload
            .pagination
            ?.totalPages ??
          1,

        total:
          action.payload
            .pagination
            ?.total ??
          action.payload
            .data?.length ??
          0,

        error: null,
      };

    case FETCH_FAILURE:
      return {
        ...state,

        error:
          action.payload,
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

        total:
          state.total + 1,
      };

    case UPDATE_PROPERTY:
      return {
        ...state,

        properties:
          state.properties.map(
            (item) =>
              item.id ===
              action.payload.id
                ? action.payload
                : item
          ),
      };

    case DELETE_PROPERTY:
      return {
        ...state,

        properties:
          state.properties.filter(
            (item) =>
              item.id !==
              action.payload
          ),

        total:
          state.total - 1,
      };

    default:
      return state;
  }
}