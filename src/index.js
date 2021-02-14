import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import DataContextProvider from "./context/tokenContext";
import * as serviceWorker from "./serviceWorker";
import UserContextProvider from "./context/userContext";
import StorageContextProvider from "./context/storageContext";
import SingleUserContextProvider from "./context/singleUserContext";
import FileContextProvider from "./context/fileContext";
ReactDOM.render(
  <React.StrictMode>
    <FileContextProvider>
      <SingleUserContextProvider>
        <StorageContextProvider>
          <UserContextProvider>
            <DataContextProvider>
              <App />
            </DataContextProvider>
          </UserContextProvider>
        </StorageContextProvider>
      </SingleUserContextProvider>
    </FileContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
