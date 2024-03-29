import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from "@/utils/helpers";
import axios from "axios";
import { Token } from "@/api/jwt/Token";
import { BASE_URL } from "@/utils/constants";

axios.defaults.baseURL = BASE_URL;

export default class JwtManager {
  constructor() {
    this.setTokens();
  }
  setTokens() {
    const storageToken = JSON.parse(getLocalStorageItem("user"));
    this.accessToken = storageToken ? new Token(storageToken) : null;
  }
  get hasUserAccess() {
    this.setTokens();
    return Boolean(this.accessToken && this.accessToken.isValid);
  }
  createAxiosInstanceWithJwt() {
    this.setTokens();
    const instance = axios.create({ baseURL: BASE_URL });
    if (this.accessToken) {
      instance.defaults.headers.common = {
        Authorization: `Bearer ${this.accessToken.token}`,
      };
    }
    return instance;
  }
  createUserAccess(token) {
    setLocalStorageItem("user", JSON.stringify(token));
  }
  deleteUserAccess() {
    removeLocalStorageItem("user");
  }
}
