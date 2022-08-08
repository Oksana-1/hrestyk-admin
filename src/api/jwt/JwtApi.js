import axios from "axios";
const SIGN_IN_URL = "/auth/jwt-policy/sign-in";
import { BASE_URL_HOST, BASE_URL_PORT } from "@/api";
import { Token } from "@/api/jwt/Token";
import JwtManager from "@/api/jwt/JwtManager";
const BASE_URL = `${BASE_URL_HOST}${BASE_URL_PORT ? ":" + BASE_URL_PORT : ""}`;
axios.defaults.baseURL = BASE_URL;

const jwtManager = new JwtManager();

export default class JwtApi {
  async signIn(payload) {
    const response = await axios.post(SIGN_IN_URL, JSON.stringify(payload));
    const userToken = new Token(response.data);
    jwtManager.createUserAccess(userToken);
  }
}
