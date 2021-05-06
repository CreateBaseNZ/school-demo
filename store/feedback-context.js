import React, { useState, createContext } from "react";

const FeedbackContext = createContext({
  formVisible: false,
  showForm: () => {},
  hideForm: () => {},
});

export const FeedbackContextProvider = (props) => {
  const [formVisible, setFormVisible] = useState(false);

  const showForm = () => {
    setFormVisible(true);
  };

  const hideForm = () => {
    setFormVisible(false);
  };

  return (
    <FeedbackContext.Provider
      value={{
        formVisible: formVisible,
        setFormVisible: setFormVisible,
        showForm: showForm,
        hideForm: hideForm,
      }}
    >
      {props.children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
