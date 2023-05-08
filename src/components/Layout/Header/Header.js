import classes from "./Header.module.css";
import logo from "./logo.png";
import cart from "./cart.png";
import { LOG_OUT } from "../../../Redux/Types/types";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import HeaderLink from "./HeaderLink/HeaderLink";

const Header = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const menu = useSelector((state) => state.menuReducer);
  const auth = useSelector((state) => state.authReducer);

  const navigateToCart = () => {
    let randomNumber = Math.floor(Math.random() * 1000).toString();
    navigate({
      pathname: "/menu",
      search: "?showCart=true" + randomNumber,
    });
  };

  return (
    <div className={classes.header}>
      <img
        className={classes.logoImg}
        src={logo}
        alt="Logo"
        onClick={() => navigate("/")}
      />

      <div className={classes.cartImg}>
        <img src={cart} alt="cart" onClick={navigateToCart} />

        <p
          className={
            menu.itemsAmount >= 1
              ? classes.cartItemsNumber
              : classes.cartItemsNumber0
          }
        >
          {menu.itemsAmount}
        </p>
      </div>

      <nav className={classes.menuContainer}>
        <label htmlFor="menuCheck" className={classes.menuBtn}>
          <input type="checkbox" id="menuCheck" />

          <div className={classes.menuHamburger}></div>

          <ul className={classes.menuItems}>
            <HeaderLink text="Home" path="/" onClick={() => navigate("/")} />
            <HeaderLink
              text="Cart"
              path="/menu?showCart"
              onClick={navigateToCart}
            />
            <HeaderLink
              text="Menu"
              path="/menu"
              onClick={() => navigate("/menu")}
            />
            <HeaderLink
              text="About us"
              path="/about"
              onClick={() => navigate("/about")}
            />
            <HeaderLink
              text="Contact"
              path="/contact"
              onClick={() => navigate("/contact")}
            />

            {auth.idToken !== null ? (
              <HeaderLink
                text="User page"
                path="/profile"
                onClick={() => navigate("/profile")}
              />
            ) : (
              <HeaderLink
                text="Log in"
                path="/auth"
                onClick={() => navigate("/auth")}
              />
            )}
            {auth.idToken !== null ? (
              <li
                onClick={() =>
                  dispatch({
                    type: LOG_OUT,
                  })
                }
              >
                Logout
              </li>
            ) : null}
          </ul>
        </label>
      </nav>
    </div>
  );
};

export default Header;
