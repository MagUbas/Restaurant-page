import classes from "./Order.module.css";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../UI/Form/Form";
import Modal from "../UI/Modal/Modal";
import { CHECK_EXP, UPDATE_FORM, ADD_ORDER } from "../../Redux/Types/types";

import OrderItemList from "./OrderItemList/OrderItemList";
import useFetch from "../../hook/use-fetch";

const Order = () => {
  const menu = useSelector((state) => state.menuReducer);
  const auth = useSelector((state) => state.authReducer);
  const form = useSelector((state) => state.formReducer);
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { sendRequest, error } = useFetch();

  const dispatch = useDispatch();

  const inputList = [
    {
      type: "text",
      text: "Name",
      fieldName: "name",
      initialValue: form.form.name,
    },
    {
      type: "text",
      text: "Surname",
      fieldName: "surname",
      initialValue: form.form.surname,
    },
    {
      type: "tel",
      text: "Phone number",
      fieldName: "phoneNumber",
      initialValue: form.form.phoneNumber,
    },
    {
      type: "email",
      text: "Email",
      fieldName: "email",
      initialValue: form.form.email,
    },
    {
      type: "text",
      text: "Street",
      fieldName: "street",
      initialValue: form.form.street,
    },
    {
      type: "text",
      text: "Apartament number",
      fieldName: "apNumber",
      initialValue: form.form.apNumber,
    },
  ];

  useEffect(() => {
    if (menu.totalAmount === 0) {
      navigate("/");
    }
    dispatch({
      type: CHECK_EXP,
    });

    window.scrollTo(0, 0);

    // eslint-disable-next-line
  }, []);

  const handleSubmit = (valueList) => {
    const order = {
      items: menu.items,
      orderDate: new Date().toString(),
      totalAmount: menu.totalAmount,
    };

    dispatch({
      type: UPDATE_FORM,
      payload: valueList,
    });
    dispatch({
      type: ADD_ORDER,
      payload: order,
    });

    sendRequest({
      method: "POST",
      url: "https://restaurant-page-c1515-default-rtdb.europe-west1.firebasedatabase.app/newOrder.json",
      body: {
        form: valueList,
        order: order,
      },
    });
    if (auth.idToken !== null) {
      sendRequest({
        method: "PUT",
        url: `https://restaurant-page-c1515-default-rtdb.europe-west1.firebasedatabase.app/user/${auth.userId}/form.json`,
        body: { ...valueList },
      });
      sendRequest({
        method: "POST",
        url: `https://restaurant-page-c1515-default-rtdb.europe-west1.firebasedatabase.app/user/${auth.userId}/orders.json`,
        body: { ...order },
      });
    }

    dispatch({
      type: "RESET_MENU",
    });
    console.log(error);
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
    navigate("/");
  };
  return (
    <div className={classes.order}>
      <div className={classes.welcomeBlock}>
        <h1>Your Order</h1>
      </div>
      <OrderItemList items={menu.items} totalAmount={menu.totalAmount} />
      <Modal
        show={showModal}
        buttonList={[{ text: "Close", onClick: closeModalHandler }]}
        onClose={closeModalHandler}
      >
        {error === "" ? (
          <div className={classes.modalOrderContent}>
            <h1>Error </h1>
            <h1> please try again </h1>
            <h1> or call us </h1>
          </div>
        ) : (
          <div className={classes.modalOrderContent}>
            <h1>Your order </h1>
            <h1> is on its way </h1>
          </div>
        )}
      </Modal>
      <Form
        formName="PERSONALIA"
        inputList={inputList}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Order;
