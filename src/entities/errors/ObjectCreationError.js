import { errorTypes } from "@/entities/errors/errorTypes";
export default class ObjectCreationError extends Error {
  constructor(e) {
    super(e.message);
    this.type = errorTypes.OBJECT_CREATION_VALIDATOR_ERROR;
    this.objectName = e.objectName;
    this.propName = e.propName;
  }
}
