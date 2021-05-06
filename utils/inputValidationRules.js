/**
 * creates and returns a validation rule object that
 * is used by useForm hook to validate the form inputs
 *
 * @param {string} ruleName - name of the validation rule
 * @param {string} errorMessage - message to display
 * @param {function} validateFunc - validation function
 */
const createValidationRule = (ruleName, errorMessage, validateFunc) => {
  return {
    name: ruleName,
    message: errorMessage,
    validate: validateFunc,
  };
};

export const requiredRule = (inputName) => {
  return createValidationRule(
    "required",
    `${inputName} required`,
    (inputValue) => inputValue.length !== 0
  );
};

export const minLengthRule = (inputName, minCharacters) => {
  return createValidationRule(
    "minLength",
    `${inputName} should contain at least ${minCharacters} characters`,
    (inputValue) => inputValue.length >= minCharacters
  );
};

export const maxLengthRule = (inputName, maxCharacters) => {
  return createValidationRule(
    "maxLength",
    `${inputName} cannot contain more than ${maxCharacters} characters`,
    (inputValue) => inputValue.length <= maxCharacters
  );
};

export const validEmailRule = () => {
  return createValidationRule(
    "validEmail",
    `Email invalid`,
    (inputValue) =>
      !inputValue ||
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        inputValue
      )
  );
};

export const passwordMatchRule = () => {
  return createValidationRule(
    "passwordMatch",
    `Passwords do not match`,
    (inputValue, formObj) => inputValue === formObj.password.value
  );
};
