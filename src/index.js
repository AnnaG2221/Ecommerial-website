import App from './components/App'
import ReactDOM from "react-dom/client"
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import store from "./components/redux/store";
import { Provider } from "react-redux";

// ReactDOM.render( <App/>, document.querySelector('#root'))
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>

    </BrowserRouter>
  </React.StrictMode>
)

