import { memo } from "react";

export const List = memo(
  ({
    className,
    name,
    handleChange,
    errorMessage,
    isValid,
    question,
    options,
  }) => {
    return (
      <div
        className={className}
        status={errorMessage && !isValid ? "error" : ""}
      >
        {question && <p>{question}</p>}
        <div onChange={handleChange}>
          {options.map((option, index) => (
            <label key={name + index}>
              <input type="radio" name={name} value={option} />
              <div></div>
              <span>{option}</span>
            </label>
          ))}
        </div>
        <span>{errorMessage && !isValid ? errorMessage : ""}</span>
      </div>
    );
  }
);

export const Scale = memo(
  ({ className, name, handleChange, errorMessage, isValid, question }) => {
    const options = [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree",
    ];

    return (
      <div
        className={className}
        status={errorMessage && !isValid ? "error" : ""}
      >
        {question && <p>{question}</p>}
        <div onChange={handleChange}>
          {options.map((option) => (
            <label key={name + option}>
              <input type="radio" name={name} value={option} />
              <div></div>
              <span>{option}</span>
            </label>
          ))}
        </div>
        <span>{errorMessage && !isValid ? errorMessage : ""}</span>
      </div>
    );
  }
);

export const TextArea = memo(
  ({
    className,
    label,
    name,
    handleChange,
    errorMessage,
    isValid,
    value,
    placeholder,
    question,
  }) => {
    return (
      <div
        className={className}
        status={errorMessage && !isValid ? "error" : ""}
      >
        {question && <p>{question}</p>}
        <textarea
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder ? placeholder : " "}
        />
        <label>{label}</label>
        <span>{errorMessage && !isValid ? errorMessage : ""}</span>
      </div>
    );
  }
);

const Input = ({
  className,
  label,
  type,
  name,
  handleChange,
  errorMessage,
  isValid,
  value,
  placeholder,
  question,
}) => {
  return (
    <div className={className} status={errorMessage && !isValid ? "error" : ""}>
      {question && <p>{question}</p>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder ? placeholder : " "}
      />
      <label>{label}</label>
      <span>{errorMessage && !isValid ? errorMessage : ""}</span>
    </div>
  );
};

export default memo(Input);
