import React from "react";

import classes from "./InputField.module.css";

const InputField = (props) => {
  const valid = props.error === "" ? true : false;

  return (
    <div className={valid ? classes.inputField : classes.inputFieldInvalide}>
      <label>{props.text}</label>
      <input
        type={props.type}
        name={props.fieldName}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={"Enter " + props.text.toLowerCase()}
        required
      />
      <p>{props.error}</p>
    </div>
  );
};

export default InputField;
