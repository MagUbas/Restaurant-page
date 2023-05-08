import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import { Provider } from "react-redux";
import Store from "./Redux/store";

import App from "./App";
import Menu from "./components/Menu/Menu";
import Order from "./components/Order/Order";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import AuthPage from "./components/AuthPage/AuthPage";
import UserPage from "./components/UserPage/UserPage";

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="menu" element={<Menu />} />
          <Route path="order" element={<Order />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="profile" element={<UserPage />} />
        </Route>

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
