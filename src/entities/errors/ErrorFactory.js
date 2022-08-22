import ObjectCreationError from "@/entities/errors/ObjectCreationError";
import ApiExceptionError from "@/entities/errors/ApiExceptionError";
import AuthError from "@/entities/errors/AuthError";
import { errorTypes } from "@/entities/errors/errorTypes";

export default class ErrorFactory {
  create(e) {
    if (e instanceof ObjectCreationError) throw e;
    if (!e.response || !e.response.data) throw new ApiExceptionError();
    const error = e.response.data;
    if (error.type && error.type === errorTypes.AUTH_ERROR)
      throw new AuthError(error);
    throw e;
  }
}
