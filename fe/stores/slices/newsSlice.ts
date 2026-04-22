// src/stores/slices/newsSlice.ts

import { News } from "@/types/news";
import { NEWS_DATA } from "@/data/news";

interface NewsState {
  allNews: News[];
  filteredNews: News[];
  selectedNews: News | null;
}

const initialState: NewsState = {
  allNews: NEWS_DATA,
  filteredNews: NEWS_DATA,
  selectedNews: null,
};

// ACTION TYPES
export const SET_NEWS_DETAIL = 'SET_NEWS_DETAIL' as const;
export const SEARCH_NEWS = 'SEARCH_NEWS' as const;

// ACTIONS
export const setNewsDetail = (slug: string) => ({
  type: SET_NEWS_DETAIL,
  payload: slug,
});

export const searchNews = (keyword: string) => ({
  type: SEARCH_NEWS,
  payload: keyword,
});

// ĐỊNH NGHĨA TYPE CHO ACTION (Để hết lỗi any)
type NewsAction = 
  | ReturnType<typeof setNewsDetail>
  | ReturnType<typeof searchNews>;

// REDUCER
const newsReducer = (state = initialState, action: NewsAction): NewsState => {
  switch (action.type) {
    case SET_NEWS_DETAIL:
      return {
        ...state,
        // TypeScript giờ đã biết action.payload chắc chắn là string
        selectedNews: state.allNews.find(n => n.slug === action.payload) || null
      };

    case SEARCH_NEWS:
      const keyword = action.payload.toLowerCase();
      return {
        ...state,
        filteredNews: state.allNews.filter(n => 
          n.title.toLowerCase().includes(keyword) || 
          n.excerpt.toLowerCase().includes(keyword)
        )
      };

    default:
      return state;
  }
};

export default newsReducer;