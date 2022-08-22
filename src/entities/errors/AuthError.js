import { ObjectCreationValidator } from "@/entities/ObjectCreationValidator";

export default class AuthError extends Error {
  constructor(e) {
    super(e.message);
    this.type = e.type;

    ObjectCreationValidator.validate(this);
  }
}
