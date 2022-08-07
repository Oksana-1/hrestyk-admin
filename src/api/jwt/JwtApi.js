import axios from "axios";
const SIGN_IN_URL = "/auth/jwt-policy/sign-in";
import { BASE_URL_HOST, BASE_URL_PORT } from "@/api";
const BASE_URL = `${BASE_URL_HOST}${BASE_URL_PORT ? ":" + BASE_URL_PORT : ""}`;
axios.defaults.baseURL = BASE_URL;

export default class JwtApi {
  async signIn(payload) {
    const response = await axios.post(SIGN_IN_URL, payload);
    console.log(response);
  }
}
