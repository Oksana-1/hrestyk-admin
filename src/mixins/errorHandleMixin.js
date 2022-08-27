import JwtManager from "@/api/jwt/JwtManager";
import { errorTypes } from "@/entities/errors/errorTypes";

export const errorHandleMixin = {
  data() {
    return {
      jwtManager: new JwtManager(),
      error: null,
    };
  },
  methods: {
    async handleErrors(error) {
      this.error = error;
      if (error.type === errorTypes.AUTH_ERROR) {
        this.jwtManager.deleteUserAccess();
        await this.$router.push("/login");
      }
    },
    clearApiError() {
      this.error = null;
    },
  },
};
