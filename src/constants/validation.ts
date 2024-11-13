export const VALIDATION_MESSAGE = {
  get: function (title: string, validator: string, min?: number, max?: number) {
    switch (validator) {
      case "required":
        return `${title} is required.`;
      case "uuid":
        return `Invalid ${title} uuid format`;
      case "empty":
        return `${title} uuid format`;
      case "number":
        return `${title} must be a number`;
      case "boolean":
        return `${title} must be true or false`;
      case "min_max":
        return `${title} must be between ${min}, ${max} character`;
      case "max":
        return `${title} must not exceed ${max} character`;
      case "exact":
        return `${title} must be exact ${min} character`;
      case "array":
        return `${title} must be an array`;
      case "positive":
        return `${title} must contain only positive numbers`;
      case "max_number":
        return `${title} must be less than or equal to ${min}`;
      case "min_number":
        return `${title} must be greater than or equal to ${min}`;
      case "lesser_than":
        return `${title} must be less than ${min}`;
      case "greater_than":
        return `${title} must be greater than ${min}`;
      default:
        return `${title} is invalid`;
    }
  },
};

export const GLOBAL_ERROR_MESSAGE = "An error occurred";
