import React, { createContext, useState } from "react";

export const SingleUserContext = createContext();

export default function SingleUserContextProvider(props) {
  const [singleUser, setSingleUser] = useState("");
  return (
    <SingleUserContext.Provider value={[singleUser, setSingleUser]}>
      {props.children}
    </SingleUserContext.Provider>
  );
}
