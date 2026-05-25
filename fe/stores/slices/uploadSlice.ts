import { Dispatch } from "redux";

// ===== ACTION TYPES =====

export const UPLOAD_START =
  "UPLOAD_START" as const;

export const UPLOAD_SUCCESS =
  "UPLOAD_SUCCESS" as const;

export const UPLOAD_ERROR =
  "UPLOAD_ERROR" as const;

// ===== STATE =====

interface UploadState {
  loading: boolean;
  images: string[];
  error: string | null;
}

const initialState: UploadState = {
  loading: false,
  images: [],
  error: null,
};

// ===== REDUCER =====

export default function uploadReducer(
  state = initialState,
  action: any
): UploadState {
  switch (action.type) {
    case UPLOAD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        images: action.payload,
      };

    case UPLOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

// ===== THUNK =====

export const uploadImages =
  (files: File[]) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: UPLOAD_START,
      });

      const formData =
        new FormData();

      files.forEach((file) => {
        formData.append(
          "images",
          file
        );
      });

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await fetch(
          "http://localhost:5000/upload",
          {
            method: "POST",

            headers: {
              Authorization: `Bearer ${token}`,
            },

            body: formData,
          }
        );

      if (!response.ok) {
        throw new Error(
          "Upload failed"
        );
      }

      const data =
        await response.json();

      dispatch({
        type: UPLOAD_SUCCESS,
        payload: data.images,
      });

      return data.images;
    } catch (error) {
      dispatch({
        type: UPLOAD_ERROR,
        payload:
          "Upload failed",
      });

      throw error;
    }
  };