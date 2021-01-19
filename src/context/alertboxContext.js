import React, { createContext, useState } from "react";

export const AlertboxContext = createContext();
const alertbox = [{}];
export default function AlertboxContextProvider(props) {
  const [alertboxData, setAlertBoxData] = useState([]);
  return (
    <AlertboxContext.Provider value={[alertboxData, setAlertBoxData]}>
      {props.children}
    </AlertboxContext.Provider>
  );
}
