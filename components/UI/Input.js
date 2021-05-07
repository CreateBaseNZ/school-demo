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
    element,
  } = props;

  return (
    <div status={errorMessage && !isValid ? "error" : ""}>
      {element === "textarea" ? (
        <textarea
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      )}
      <label>{label}</label>
      <span>{errorMessage && !isValid ? errorMessage : ""}</span>
    </div>
  );
};

export default memo(Input);
