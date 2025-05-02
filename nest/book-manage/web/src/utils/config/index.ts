export const TIME_OUT: number = 1000 * 30;
export const BASE_URL: string =
  import.meta.env.MODE === "development" ? "/api" : import.meta.env.VITE_BASE_URL_PROD;
