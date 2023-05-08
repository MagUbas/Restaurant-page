import classes from "./Menu.module.css";
import MenuItem from "./MenuItem/MenuItem";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import ToCartItem from "./ToCartItem/ToCartItem";
import useFetch from "../../hook/use-fetch";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const Menu = (props) => {
  let navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const menu = useSelector((state) => state.menuReducer);
  const dispatch = useDispatch();

  const [menuList, setmenuList] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showMenuItem, setShowMenuItem] = useState({});
  const { sendRequest, error, isLoading } = useFetch();

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const submitModalHandler = () => {
    setShowModal(false);
    navigate("/order");
  };

  const removeItemHandler = (item) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: item,
    });
  };
  const addItemToCartHandler = (item) => {
    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  };

  useEffect(() => {
    sendRequest(
      {
        url: "https://restaurant-page-c1515-default-rtdb.europe-west1.firebasedatabase.app/menuList.json",
      },
      (data) => {
        setmenuList(data);
        let tempShowMenuItem = {};
        Object.keys(menuList).forEach((key) => {
          tempShowMenuItem = {
            ...tempShowMenuItem,
            [key]: false,
          };
        });
        setShowMenuItem(tempShowMenuItem);
      }
    );
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (searchParams.get("showCart") !== null && menu.cartnotEmpty) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
    // eslint-disable-next-line
  }, [searchParams.get("showCart")]);

  let menuContent = (
    <p style={{ textAlign: "center" }}>
      Menu loading <br /> Please wait
    </p>
  );
  if (error !== "") {
    menuContent = <p style={{ textAlign: "center" }}>{error}</p>;
  }
  if (!isLoading)
    menuContent = (
      <div className={classes.menuList}>
        {Object.keys(menuList).map((key) => {
          return (
            <ul key={key} className={classes.menuItemList}>
              <h1
                onClick={() =>
                  setShowMenuItem((prevState) => ({
                    ...prevState,
                    [key]: !prevState[key],
                  }))
                }
              >
                {key}
              </h1>
              {showMenuItem[key]
                ? Object.keys(menuList[key]).map((keyItem) => {
                    return (
                      <MenuItem
                        key={keyItem}
                        item={menuList[key][keyItem]}
                        onAddToCart={addItemToCartHandler}
                      />
                    );
                  })
                : null}
            </ul>
          );
        })}
      </div>
    );

  return (
    <div className={classes.menuBody}>
      <div className={classes.welcomeBlock}>
        <h1>Menu</h1>
      </div>
      <div className={classes.menuContent}>
        {menuContent}
        <Button
          disabled={!menu.cartnotEmpty}
          buttonStyle={{ width: "120px" }}
          className={classes.buttonCart}
          onClick={menu.cartnotEmpty ? showModalHandler : null}
        >
          {menu.cartnotEmpty ? "To Cart" : "Add Something!"}
        </Button>
      </div>

      <Modal
        show={showModal}
        buttonList={[
          { text: "Close", onClick: closeModalHandler },
          {
            text: "Order",
            onClick: submitModalHandler,
            disabled: !menu.cartnotEmpty,
          },
        ]}
        onClose={closeModalHandler}
      >
        <div className={classes.toCartItemList}>
          <h1 style={{ marginTop: 0 }}>Cart</h1>
          {menu.cartnotEmpty
            ? menu.items.map((item) => {
                return (
                  <ToCartItem
                    key={item.name}
                    item={item}
                    onAddItem={addItemToCartHandler}
                    onRemoveItem={removeItemHandler}
                  />
                );
              })
            : null}
          <h1>Total: {menu.totalAmount}</h1>
        </div>
      </Modal>
    </div>
  );
};

export default Menu;
