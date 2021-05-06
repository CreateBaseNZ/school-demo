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
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={errorMessage && !isValid ? { borderColor: "#fa6f6f" } : {}}
      />
      <label>{label}</label>
      <span>{errorMessage && !isValid ? errorMessage : " "}</span>
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
    <div>
      <textarea
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={errorMessage && !isValid ? { borderColor: "#fa6f6f" } : {}}
      />
      <label>{label}</label>
      <span>{errorMessage && !isValid ? errorMessage : " "}</span>
    </div>
  );
});

export default memo(Input);
