import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOG_IN } from "../../Redux/Types/types";
import Form from "../UI/Form/Form";
import Button from "../UI/Button/Button";
import classes from "./AuthPage.module.css";
import useFetch from "../../hook/use-fetch";

const AuthPage = () => {
  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [login, setLogin] = useState(true);
  const [error, setError] = useState("");
  const { sendRequest } = useFetch();

  useEffect(() => {
    if (auth.idToken !== null) {
      navigate("/profile");
    }
    // eslint-disable-next-line
  }, [auth.idToken]);

  async function handleSubmit(valueList) {
    const tempValueList = Object.values(valueList);
    let url = "";
    if (login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmyCA5w5nFFCnE7FabtEYesCo4LhcFPTI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmyCA5w5nFFCnE7FabtEYesCo4LhcFPTI";
    }
    await sendRequest(
      {
        url: url,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          email: tempValueList[0],
          password: tempValueList[1],
          returnSecureToken: true,
        },
      },
      (data) => {
        dispatch({
          type: LOG_IN,
          payload: data,
        });
      },
      (data) => {
        let errorMessage = data.error.message.replaceAll("_", " ");
        errorMessage =
          errorMessage.charAt(0).toUpperCase() +
          errorMessage.slice(1).toLowerCase();
        setError(errorMessage);
      }
    );
  }

  const handleChangeButton = () => {
    setLogin((prevState) => !prevState);
    setError("");
  };

  return (
    <div className={classes.authBody}>
      <Form
        formName={login ? "LOGIN" : "SIGN UP"}
        inputList={[
          { type: "text", text: "Email", fieldName: "email" },
          { type: "password", text: "Pasword", fieldName: "pasword" },
        ]}
        handleSubmit={handleSubmit}
        customError={error}
      />

      <Button onClick={handleChangeButton}>
        {login ? "Create new account" : "Login with existing account"}{" "}
      </Button>
    </div>
  );
};

export default AuthPage;
