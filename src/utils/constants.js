export const BASE_URL_HOST = process.env.VUE_APP_BASE_URL_HOST;
export const BASE_URL_PORT = process.env.VUE_APP_BASE_URL_PORT;
export const BASE_URL = `${BASE_URL_HOST}${
  BASE_URL_PORT ? ":" + BASE_URL_PORT : ""
}`;
