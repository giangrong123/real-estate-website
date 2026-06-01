// // stores/slices/userSlice.ts

// import {
//   AppThunk,
//   AppDispatch,
// } from "../store";

// import { api } from "@/libs/api";

// // ================= TYPES =================

// export interface UserType {
//   id: number;

//   name: string;

//   email: string;
// }

// interface UserState {
//   users: UserType[];

//   loading: boolean;

//   error: string | null;
// }

// // ================= INITIAL STATE =================

// const initialState: UserState = {
//   users: [],

//   loading: false,

//   error: null,
// };

// // ================= ACTION TYPES =================

// export const FETCH_USERS_SUCCESS =
//   "FETCH_USERS_SUCCESS" as const;

// export const FETCH_USERS_FAILURE =
//   "FETCH_USERS_FAILURE" as const;

// export const SET_USERS_LOADING =
//   "SET_USERS_LOADING" as const;

// // ================= ACTION TYPES =================

// type UserAction =
//   | {
//       type: typeof FETCH_USERS_SUCCESS;

//       payload: UserType[];
//     }
//   | {
//       type: typeof FETCH_USERS_FAILURE;

//       payload: string;
//     }
//   | {
//       type: typeof SET_USERS_LOADING;

//       payload: boolean;
//     };

// // ================= FETCH USERS =================

// export const fetchUsers =
//   (): AppThunk =>
//   async (
//     dispatch: AppDispatch
//   ) => {
//     try {
//       dispatch({
//         type: SET_USERS_LOADING,
//         payload: true,
//       });

//       const res = await api(
//         "http://localhost:5000/admin/users"
//       );

//       const data =
//         await res.json();

//       dispatch({
//         type: FETCH_USERS_SUCCESS,
//         payload: data.data,
//       });
//     } catch (err) {
//       dispatch({
//         type: FETCH_USERS_FAILURE,
//         payload:
//           err instanceof Error
//             ? err.message
//             : "Lỗi server",
//       });
//     } finally {
//       dispatch({
//         type: SET_USERS_LOADING,
//         payload: false,
//       });
//     }
//   };

// // ================= DELETE USER =================

// export const deleteUser =
//   (
//     id: number
//   ): AppThunk =>
//   async (
//     dispatch: AppDispatch
//   ) => {
//     try {
//       dispatch({
//         type: SET_USERS_LOADING,
//         payload: true,
//       });

//       const res = await api(
//         `http://localhost:5000/admin/users/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       const data =
//         await res.json();

//       if (!data.success) {
//         throw new Error(
//           data.message
//         );
//       }

//       dispatch(fetchUsers());
//     } catch (err) {
//       dispatch({
//         type: FETCH_USERS_FAILURE,
//         payload:
//           err instanceof Error
//             ? err.message
//             : "Xóa thất bại",
//       });
//     } finally {
//       dispatch({
//         type: SET_USERS_LOADING,
//         payload: false,
//       });
//     }
//   };

// // ================= REDUCER =================

// export default function userReducer(
//   state = initialState,

//   action: UserAction
// ): UserState {
//   switch (action.type) {
//     case SET_USERS_LOADING:
//       return {
//         ...state,

//         loading: action.payload,
//       };

//     case FETCH_USERS_SUCCESS:
//       return {
//         ...state,

//         users: action.payload,

//         loading: false,

//         error: null,
//       };

//     case FETCH_USERS_FAILURE:
//       return {
//         ...state,

//         error: action.payload,

//         loading: false,
//       };

//     default:
//       return state;
//   }
// }



// stores/slices/userSlice.ts

import {
  AppThunk,
  AppDispatch,
} from "../store";

import { api } from "@/libs/api";

// ================= TYPES =================

export interface UserType {
  id: number;

  name: string;

  email: string;
}

interface UserState {
  users: UserType[];

  loading: boolean;

  error: string | null;

  totalPages: number;

  totalUsers: number;

  currentPage: number;
}

// ================= INITIAL STATE =================

const initialState: UserState = {
  users: [],

  loading: false,

  error: null,

  totalPages: 1,

  totalUsers: 0,

  currentPage: 1,
};

// ================= ACTION TYPES =================

export const FETCH_USERS_SUCCESS =
  "FETCH_USERS_SUCCESS" as const;

export const FETCH_USERS_FAILURE =
  "FETCH_USERS_FAILURE" as const;

export const SET_USERS_LOADING =
  "SET_USERS_LOADING" as const;

// ================= ACTION TYPES =================

type UserAction =
  | {
      type: typeof FETCH_USERS_SUCCESS;

      payload: {
        users: UserType[];

        totalPages: number;

        totalUsers: number;

        currentPage: number;
      };
    }
  | {
      type: typeof FETCH_USERS_FAILURE;

      payload: string;
    }
  | {
      type: typeof SET_USERS_LOADING;

      payload: boolean;
    };

// ================= FETCH USERS =================

export const fetchUsers =
  (
    page = 1,
    limit = 5
  ): AppThunk =>
  async (
    dispatch: AppDispatch
  ) => {
    try {
      dispatch({
        type: SET_USERS_LOADING,

        payload: true,
      });

      const res = await api(
        `http://localhost:5000/admin/users?page=${page}&limit=${limit}`
      );

      const data =
        await res.json();

      dispatch({
        type: FETCH_USERS_SUCCESS,

        payload: {
          users: data.data,

          totalPages:
            data.pagination
              .totalPages,

          totalUsers:
            data.pagination
              .totalUsers,

          currentPage:
            data.pagination.page,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_USERS_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Lỗi server",
      });
    } finally {
      dispatch({
        type: SET_USERS_LOADING,

        payload: false,
      });
    }
  };

// ================= DELETE USER =================

export const deleteUser =
  (
    id: number
  ): AppThunk =>
  async (
    dispatch: AppDispatch
  ) => {
    try {
      dispatch({
        type: SET_USERS_LOADING,

        payload: true,
      });

      const res = await api(
        `http://localhost:5000/admin/users/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await res.json();

      if (!data.success) {
        throw new Error(
          data.message
        );
      }

      // reload page 1
      dispatch(fetchUsers());
    } catch (err) {
      dispatch({
        type: FETCH_USERS_FAILURE,

        payload:
          err instanceof Error
            ? err.message
            : "Xóa thất bại",
      });
    } finally {
      dispatch({
        type: SET_USERS_LOADING,

        payload: false,
      });
    }
  };

// ================= REDUCER =================

export default function userReducer(
  state = initialState,

  action: UserAction
): UserState {
  switch (action.type) {
    case SET_USERS_LOADING:
      return {
        ...state,

        loading: action.payload,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,

        users:
          action.payload.users,

        totalPages:
          action.payload
            .totalPages,

        totalUsers:
          action.payload
            .totalUsers,

        currentPage:
          action.payload
            .currentPage,

        loading: false,

        error: null,
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,

        error: action.payload,

        loading: false,
      };

    default:
      return state;
  }
}

