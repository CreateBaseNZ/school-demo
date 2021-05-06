import { memo } from "react";

const Input = (props) => {
  const {
    label,
    type,
    name,
    handleChange,
    errorMessage,
    isValid,
    value,
    placeholder,
  } = props;

  return (
    <div status={errorMessage && !isValid && "error"}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <label>{label}</label>
      <span>{errorMessage && !isValid ? errorMessage : ""}</span>
    </div>
  );
};

export const InputArea = memo((props) => {
  const {
    label,
    type,
    name,
    handleChange,
    errorMessage,
    isValid,
    value,
    placeholder,
  } = props;

  return (
    <div status={errorMessage && !isValid && "error"}>
      <textarea
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <label>{label}</label>
      <span>{errorMessage && !isValid ? errorMessage : " "}</span>
    </div>
  );
});

export default memo(Input);
