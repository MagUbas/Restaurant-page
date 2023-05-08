import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import classes from "./App.module.css";
import Button from "./components/UI/Button/Button";
import useFetch from "./hook/use-fetch";

import {
  CHECK_EXP,
  UPDATE_ORDER,
  UPDATE_FORM,
  RESET_FORM,
} from "./Redux/Types/types";

import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const auth = useSelector((state) => state.authReducer);
  const { sendRequest } = useFetch();

  const fetchFormHandler = () => {
    sendRequest(
      {
        url: `https://restaurant-page-c1515-default-rtdb.europe-west1.firebasedatabase.app/user/${auth.userId}.json`,
      },
      (data) => {
        const dataValues = Object.values(data);
        dispatch({
          type: UPDATE_FORM,
          payload: dataValues[0],
        });
        dispatch({
          type: UPDATE_ORDER,
          payload: dataValues[1],
        });
      }
    );
  };

  useEffect(() => {
    if (auth.idToken !== null) {
      dispatch({
        type: CHECK_EXP,
      });
      fetchFormHandler();
    } else {
      dispatch({
        type: RESET_FORM,
      });
    }

    setTimeout(() => {
      window.location.reload(true);
    }, 500000);

    // eslint-disable-next-line
  }, [auth]);

  let content = (
    <div className={classes.main}>
      <div className={classes.banner}>
        <h3>Kuchnia fusion w nowym wydaniu</h3>
        <Button onClick={() => navigate("/menu")}>Menu</Button>
      </div>
    </div>
  );
  return (
    <div className={classes.bodyApp}>
      <Header />
      <div className={classes.contentApp}>
        {window.location.pathname === "/" ? content : null}
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default App;
