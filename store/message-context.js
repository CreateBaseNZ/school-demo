import React, { useState, createContext } from "react";

const MessageContext = createContext({
  formVisible: false,
  confirmVisible: false,
  showForm: () => {},
  hideForm: () => {},
  showConfirm: () => {},
  hideConfirm: () => {},
});

export const MessageContextProvider = (props) => {
  const [formVisible, setFormVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const showForm = () => {
    setFormVisible(true);
  };

  const hideForm = () => {
    setFormVisible(false);
  };

  const showConfirm = () => {
    setConfirmVisible(true);
  };

  const hideConfirm = () => {
    setConfirmVisible(false);
  };

  return (
    <MessageContext.Provider
      value={{
        formVisible: formVisible,
        confirmVisible: confirmVisible,
        showForm: showForm,
        hideForm: hideForm,
        showConfirm: showConfirm,
        hideConfirm: hideConfirm,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
