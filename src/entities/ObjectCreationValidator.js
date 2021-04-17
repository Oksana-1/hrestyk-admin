export class ObjectCreationValidator {
  static validate(object) {
    Object.keys(object).forEach((propertyName) => {
      if (typeof object[propertyName] === "undefined") {
        throw new Error(
          `Object "${object.constructor.name} can't be created because the property ${propertyName} is undefined!"`
        );
      }
    });
  }
}
