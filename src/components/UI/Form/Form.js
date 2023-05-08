import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import classes from "./Form.module.css";

import InputField from "./InputField/InputField";
import Validation from "./Validation/Validation";

const Form = (props) => {
  // const [valueList, setValueList] = useState([]);
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(true);
  const [showError, setShowError] = useState(false);
  const [newvalueList, setnewValueList] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let tempnewValueList = {};
    props.inputList.forEach((input) => {
      let initialValue = "";
      if (input.initialValue) {
        initialValue = input.initialValue;
      }

      tempnewValueList = {
        ...tempnewValueList,
        [input.fieldName]: initialValue,
      };
    });

    let tempErrorsList = {};
    props.inputList.forEach((input) => {
      tempErrorsList = {
        ...tempErrorsList,
        [input.fieldName]: "",
      };
    });
    setnewValueList(tempnewValueList);
    setErrors(tempErrorsList);
    setLoading(false);
    // eslint-disable-next-line
  }, [props.inputList]);

  useEffect(() => {
    if (!formValid || props.customError) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [formValid, props.customError]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const tempFormValid = Object.values(errors).every((elem) => {
      return elem === "";
    });
    setFormValid(tempFormValid);
    if (tempFormValid) {
      props.handleSubmit(newvalueList);
    }
  };

  const handleBlur = (event) => {
    const tempError = {
      ...errors,
      [event.target.name]: Validation(event.target.name, event.target.value),
    };
    setErrors(tempError);

    if (!formValid) {
      setFormValid(
        Object.values(tempError).every((elem) => {
          return elem === "";
        })
      );
    }
  };

  const handleChange = (event) => {
    let tempValue = newvalueList;
    setnewValueList({
      ...tempValue,
      [event.target.name]: event.target.value.replaceAll(" ", ""),
    });
  };

  return (
    <form className={classes.Form}>
      <fieldset>
        <legend>: {props.formName} :</legend>
        {loading ? (
          <p style={{ textAlign: "center", paddingBottom: "20px" }}>
            Loading...
          </p>
        ) : (
          <div className={classes.inputContainer}>
            {props.inputList.map((input) => {
              return (
                <InputField
                  key={input.fieldName}
                  fieldName={input.fieldName}
                  error={errors[input.fieldName]}
                  text={input.text}
                  type={input.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={newvalueList[input.fieldName]}
                />
              );
            })}
          </div>
        )}

        {showError ? (
          <p className={classes.errorForm}>
            {!props.customError ? "The form is not valid." : props.customError}
          </p>
        ) : null}
        <Button
          onClick={handleSubmit}
          buttonStyle={{ margin: "0px 0", width: "150px" }}
        >
          Send
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
