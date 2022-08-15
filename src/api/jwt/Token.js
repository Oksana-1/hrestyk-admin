import { ObjectCreationValidator } from "@/entities/ObjectCreationValidator";

export class Token {
  constructor(token) {
    this.token = token.token;
    this.expired = token.expired;

    ObjectCreationValidator.validate(this);
  }
  get isValid() {
    return this.expired * 1000 > new Date();
  }
}
