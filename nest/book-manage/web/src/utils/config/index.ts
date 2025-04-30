const TIME_OUT: number = 1000 * 30;
const BASE_URL: string =
  import.meta.env.MODE === "development" ? "" : import.meta.env.VITE_BASE_URL_PROD;

export { TIME_OUT, BASE_URL };
