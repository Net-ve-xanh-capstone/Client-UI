import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../public/assets/css/style.css";

import { BrowserRouter } from "react-router-dom";
import store from "./store/configureStore.js";
import { Provider } from "react-redux";
import ScrollToTop from "./utils/ScrollToTop.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App></App>
    </BrowserRouter>
  </Provider>
);
