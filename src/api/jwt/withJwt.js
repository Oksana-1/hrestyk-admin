import JwtManager from "@/api/jwt/JwtManager";
const jwtManager = new JwtManager();

export default function withJwt(apiMethod) {
  return async (methodPayload) => {
    const axiosWithJwt = jwtManager.createAxiosInstanceWithJwt();
    return apiMethod(axiosWithJwt, methodPayload);
  };
}
