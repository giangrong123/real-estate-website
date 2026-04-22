import { combineReducers } from 'redux';
import { legacy_createStore as createStore, applyMiddleware, StoreEnhancer } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './slices/authSlice';
import favoriteReducer from './slices/favoriteSlice';
import propertyReducer from './slices/propertySlice';
import projectReducer from './slices/projectSlice';
import newsReducer from './slices/newsSlice'; // <--- Đừng quên ông này!
import themeReducer from './slices/themeSlice';
import weather from './slices/weatherSlice'


// 1. Gộp tất cả các mảnh logic (Reducers)
const rootReducer = combineReducers({
  auth: authReducer,
  favorites: favoriteReducer,
  properties: propertyReducer, 
  projects: projectReducer,
  news: newsReducer, // <--- Đã thêm vào bộ máy tổng
  theme: themeReducer,
});

// 2. Khởi tạo Store
const store = createStore(
  rootReducer,
  // Nếu không có preloadedState, TS đôi khi nhầm applyMiddleware là tham số thứ 2
  applyMiddleware(thunk) 
);

/** * 3. ĐỊNH NGHĨA CÁC TYPES
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
