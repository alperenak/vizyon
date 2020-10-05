import React, { createContext, useState } from "react";

export const StorageContext = createContext();

export default function StorageContextProvider(props) {
  const [storageData, setStorageData] = useState(false);
  return (
    <StorageContext.Provider value={[storageData, setStorageData]}>
      {props.children}
    </StorageContext.Provider>
  );
}
