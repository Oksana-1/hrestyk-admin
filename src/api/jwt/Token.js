import { ObjectCreationValidator } from "@/entities/ObjectCreationValidator";

export class Token {
  constructor(token) {
    this.token = token.token;

    ObjectCreationValidator.validate(this);
  }
}
