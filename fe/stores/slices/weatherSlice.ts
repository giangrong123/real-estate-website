const initialState: WeatherState = {
  data: null,
  loading: false,
};

export interface WeatherData {
  temperature: number;
  windspeed: number;
}

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
}

type WeatherAction =
  | { type: typeof SET_WEATHER; payload: WeatherData }
  | { type: typeof SET_LOADING; payload: boolean };

export const SET_WEATHER = "SET_WEATHER" as const;
export const SET_LOADING = "SET_LOADING" as const;

export const setWeather = (data: WeatherData): WeatherAction => ({
  type: SET_WEATHER,
  payload: data,
});

export const fetchWeather = async (dispatch: (arg0: WeatherAction) => void) => {
  dispatch(setLoading(true));
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current_weather=true",
    );

    const data = await res.json();

    dispatch(setWeather(data.current_weather));
  } catch (error) {
    console.log("Error:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const setLoading = (isLoading: boolean): WeatherAction => ({
  type: SET_LOADING,
  payload: isLoading,
});

const weatherReducer = (
  state = initialState,
  action: WeatherAction,
): WeatherState => {
  switch (action.type) {
    case SET_WEATHER:
      return {
        ...state,
        data: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
