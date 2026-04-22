/** * Giả sử bạn có định nghĩa các type cho Property hoặc chỉ cần ID là string
 */

interface FavoriteState {
  favoriteIds: string[];
}

const initialState: FavoriteState = {
  favoriteIds: []
};

/** * 1. ACTION TYPES
 * Sử dụng 'as const' để TypeScript bắt lỗi chính xác
 */
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE' as const;
export const CLEAR_FAVORITES = 'CLEAR_FAVORITES' as const;

/** * 2. ACTIONS
 */
// Thêm hoặc xóa ID khỏi danh sách yêu thích (Toggle)
export const toggleFavorite = (propertyId: string) => {
  return {
    type: TOGGLE_FAVORITE,
    payload: propertyId
  };
};

// Xóa sạch danh sách (ví dụ khi user logout)
export const clearFavorites = () => {
  return {
    type: CLEAR_FAVORITES
  };
};

/** * 3. INTERFACES & TYPES
 */
type FavoriteAction = 
  | { type: typeof TOGGLE_FAVORITE; payload: string }
  | { type: typeof CLEAR_FAVORITES };


/** * 4. REDUCER
 */
const favoriteReducer = (state = initialState, action: FavoriteAction): FavoriteState => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const id = action.payload;
      const isExist = state.favoriteIds.includes(id);
      
      return {
        ...state,
        favoriteIds: isExist 
          ? state.favoriteIds.filter(favId => favId !== id) // Nếu có rồi thì xóa (Unlike)
          : [...state.favoriteIds, id] // Nếu chưa có thì thêm vào (Like)
      };
      
    case CLEAR_FAVORITES:
      return {
        ...state,
        favoriteIds: []
      };

    default:
      return state;
  }
};

export default favoriteReducer;