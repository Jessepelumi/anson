export const userValidationSchema = {
  firstName: {
    notEmpty: {
      errorMessage: "First name cannot be empty",
    },
    isString: {
      errorMessage: "First name must be a string",
    },
  },
  lastName: {
    notEmpty: {
      errorMessage: "Last name cannot be empty",
    },
    isString: {
      errorMessage: "Last name must be a string",
    },
  },
  institution: {
    notEmpty: {
      errorMessage: "Institution cannot be empty",
    },
    isString: {
      errorMessage: "Institution must be a string",
    },
  },
  nationality: {
    notEmpty: {
      errorMessage: "You must input your nationality",
    },
    isString: {
      errorMessage: "Nationality must be a string",
    },
  },
};

export const queryValidationSchema = {
  filter: {
    optional: true,
    isString: true,
    notEmpty: {
      errorMessage: "Filter cannot be empty",
    },
  },
  value: {
    optional: true,
    isString: true,
    notEmpty: {
      errorMessage: "Value cannot be empty",
    },
  },
};
