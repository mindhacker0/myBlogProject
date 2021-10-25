import React from "react";

import Styles from "./input.css";

const Input = (props) => {
  const { ...componentProps } = props;
  return (
    <div className={Styles.inputWrap}>
        <input
        className={Styles.input}
        {...componentProps}
        autoComplete="off"
        type="text"
        />
    </div>
  );
};

export default Input;
