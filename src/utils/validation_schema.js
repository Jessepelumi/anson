export const newUserValidation = {
  username: {
    notEmpty: {
      errorMessage: "You must enter a username",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  firstName: {
    notEmpty: {
      errorMessage: "You must enter your first name",
    },
    isString: {
      errorMessage: "First name must be a string",
    },
  },
  lastName: {
    optional: true,
  },
  phoneNumber: {
    optional: true,
  },
  skills: {
    optional: true,
  },
  nationality: {
    optional: true,
  },
  password: {
    notEmpty: {
      errorMessage: "You must enter a password",
    },
    isString: {
      errorMessage: "Password must be a string",
    },
    isLength: {
      options: { min: 8, max: 24 },
      errorMessage: "Password must be between 8 and 24 characters",
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
