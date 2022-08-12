import { ObjectCreationValidator } from "@/entities/ObjectCreationValidator";

export class Token {
  constructor(token) {
    this.token = token.token;
    this.expired = token.expired;

    ObjectCreationValidator.validate(this);
  }
}
