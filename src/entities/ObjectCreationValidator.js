import ObjectCreationError from "@/entities/errors/ObjectCreationError";

export class ObjectCreationValidator {
  static validate(object) {
    Object.keys(object).forEach((propertyName) => {
      if (typeof object[propertyName] === "undefined") {
        throw new ObjectCreationError({
          message: `Object "${object.constructor.name} can't be created because the property ${propertyName} is undefined!"`,
          objectName: object.constructor.name,
          propName: propertyName,
        });
      }
    });
  }
}
