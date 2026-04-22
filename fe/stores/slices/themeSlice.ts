// 1. Định nghĩa 
const SET_BG_COLOR = 'SET_BG_COLOR' as const;

// 2. Initial State
const initialState = {
  bgColor: '#ffffff',
};

// 3. Action Creator 
export const setBgColor = (color: string) => ({
  type: SET_BG_COLOR,
  payload: color,
});

type ThemeAction = ReturnType<typeof setBgColor>;

// 4. Reducer
const themeReducer = (state = initialState, action: ThemeAction) => {
  switch (action.type) {
    case SET_BG_COLOR:
      return { ...state, bgColor: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
