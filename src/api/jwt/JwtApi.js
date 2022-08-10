import axios from "axios";
const SIGN_IN_URL = "/auth/jwt-policy/sign-in";
import { BASE_URL } from "@/utils/constants";
import { Token } from "@/api/jwt/Token";
import JwtManager from "@/api/jwt/JwtManager";

axios.defaults.baseURL = BASE_URL;

const jwtManager = new JwtManager();

export default class JwtApi {
  async signIn(payload) {
    const response = await axios.post(SIGN_IN_URL, JSON.stringify(payload));
    const userToken = new Token(response.data);
    jwtManager.createUserAccess(userToken);
  }
}
