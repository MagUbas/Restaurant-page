import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADD_ITEM, CHANGE_PASSWORD, LOG_OUT } from "../../Redux/Types/types";

import classes from "./UserPage.module.css";
import OrderItemList from "../Order/OrderItemList/OrderItemList";
import Button from "../UI/Button/Button";
import Form from "../UI/Form/Form";
import useFetch from "../../hook/use-fetch";

const UserPage = () => {
  const auth = useSelector((state) => state.authReducer);
  const form = useSelector((state) => state.formReducer);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [error, setError] = useState("");
  const [showOrderItem, setShowOrderItem] = useState({});
  const [showContent, setShowContent] = useState("");
  const { sendRequest } = useFetch();

  useEffect(() => {
    if (auth.idToken === null) {
      navigate("/");
    }

    if (form.orders.length > 0) {
      let tempShowOrderItem = {};
      form.orders.forEach((element) => {
        tempShowOrderItem = {
          ...tempShowOrderItem,
          [element.orderDate]: false,
        };
      });
      setShowOrderItem({ ...tempShowOrderItem });
    }

    //eslint-disable-next-line
  }, [auth.idToken, form.orders]);

  async function handleSubmit(valueList) {
    const tempValueList = Object.values(valueList);
    if (tempValueList[0] !== tempValueList[1]) {
      setError("Passwords need to match");
    } else {
      setError("");
      await sendRequest(
        {
          url: "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDmyCA5w5nFFCnE7FabtEYesCo4LhcFPTI",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: {
            idToken: auth.idToken,
            password: tempValueList[0],
            returnSecureToken: true,
          },
        },
        (data) => {
          dispatch({
            type: CHANGE_PASSWORD,
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
      // post(auth.idToken, tempValueList[0]);
    }
  }
  const handleReorder = (items) => {
    dispatch({
      type: "RESET_MENU",
    });
    items.forEach((elem) => {
      for (let i = 1; i <= elem.amount; i++)
        dispatch({
          type: ADD_ITEM,
          payload: elem,
        });
    });
    navigate("/order");
  };

  // const post = (idToken, password) => {
  //   fetch(
  //     "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDmyCA5w5nFFCnE7FabtEYesCo4LhcFPTI",
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         idToken: idToken,
  //         password: password,
  //         returnSecureToken: true,
  //       }),
  //     }
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         return response.json().then((data) => {
  //           let errorMessage = data.error.message.replaceAll("_", " ");
  //           errorMessage =
  //             errorMessage.charAt(0).toUpperCase() +
  //             errorMessage.slice(1).toLowerCase();
  //           setError(errorMessage);
  //         });
  //       } else {
  //         return response.json().then((data) => {
  //           setError("");
  //           dispatch({
  //             type: CHANGE_PASSWORD,
  //             payload: data,
  //           });
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:" + error.message);
  //     });
  // };
  const buttonClick = (name) => {
    if (showContent === name) {
      setShowContent("");
    } else {
      setShowContent(name);
    }
  };

  let contentORderList = (
    <p style={{ textAlign: "center", width: "100%" }}>Nothing here</p>
  );

  if (form.orders.length > 0) {
    contentORderList = form.orders.map((order) => {
      const orderNr = order.orderDate.slice(4, 21);

      return (
        <li
          key={orderNr}
          onClick={() =>
            setShowOrderItem((prevState) => ({
              ...prevState,
              [order.orderDate]: !prevState[order.orderDate],
            }))
          }
        >
          Your order from {orderNr}
          {showOrderItem[order.orderDate] ? (
            <div>
              <OrderItemList
                totalAmount={order.totalAmount}
                items={order.items}
              />
              <Button onClick={() => handleReorder(order.items)}>
                Re-order
              </Button>
            </div>
          ) : null}
        </li>
      );
    });
  }

  return (
    <div className={classes.userPage}>
      <div className={classes.buttonContainer}>
        <Button
          buttonStyle={showContent === "orders" ? { color: "white" } : null}
          onClick={() => buttonClick("orders")}
        >
          Previous orders
        </Button>
        <Button
          buttonStyle={
            showContent === "changePassword" ? { color: "white" } : null
          }
          onClick={() => buttonClick("changePassword")}
        >
          Change Password
        </Button>

        <Button
          onClick={() =>
            dispatch({
              type: LOG_OUT,
            })
          }
        >
          Log out
        </Button>
      </div>
      <div className={classes.contentContainerUser}>
        {showContent === "changePassword" ? (
          <Form
            formName={"Change Password"}
            inputList={[
              {
                type: "password",
                text: "New password",
                fieldName: "password1",
              },
              {
                type: "password",
                text: "Reapeat password",
                fieldName: "password2",
              },
            ]}
            handleSubmit={handleSubmit}
            customError={error}
          />
        ) : null}

        {showContent === "orders" ? <ul>{contentORderList}</ul> : null}
      </div>
    </div>
  );
};

export default UserPage;
