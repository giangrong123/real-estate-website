import { 
  combineReducers, 
  applyMiddleware, 
  legacy_createStore as createStore, 
  Action, 
  Reducer 
} from 'redux';
import { thunk, ThunkDispatch, ThunkAction } from 'redux-thunk';

// Import các reducers của bạn
import authReducer from './slices/authSlice';
import favoriteReducer from './slices/favoriteSlice';
import propertyReducer from './slices/propertySlice';
import projectReducer from './slices/projectSlice';
import newsReducer from './slices/newsSlice';
import userReducer from "./slices/userSlice";
import uploadReducer from './slices/uploadSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  favorites: favoriteReducer,
  properties: propertyReducer, 
  projects: projectReducer,
  news: newsReducer,
  user: userReducer,
  upload: uploadReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Sử dụng Action<string> thay cho AnyAction nếu bạn muốn cực kỳ chặt chẽ
const finalReducer = (rootReducer as unknown) as Reducer<RootState, Action<string>>;

const store = createStore(
  finalReducer,
  applyMiddleware(thunk)
);

/**
 * THAY THẾ ANY TẠI ĐÂY:
 * Thay vì 'any', ta dùng 'undefined' cho extra argument 
 * và 'Action' cho kiểu action cơ bản.
 */
export type AppDispatch = ThunkDispatch<RootState, undefined, Action<string>>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  undefined,
  Action<string>
>;

export default store;