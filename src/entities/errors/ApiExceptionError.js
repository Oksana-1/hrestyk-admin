import { fatalErrorMessage } from "@/translations/errors/errorMessages";
import { errorTypes } from "@/entities/errors/errorTypes";

export default class ApiExceptionError extends Error {
  constructor() {
    super(fatalErrorMessage);
    this.type = errorTypes.FATAL_ERROR;
  }
}
