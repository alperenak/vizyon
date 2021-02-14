import React, { createContext, useState } from "react";

export const FileContext = createContext();

export default function FileContextProvider(props) {
  const [fileData, setFileData] = useState(false);
  return (
    <FileContext.Provider value={[fileData, setFileData]}>
      {props.children}
    </FileContext.Provider>
  );
}
