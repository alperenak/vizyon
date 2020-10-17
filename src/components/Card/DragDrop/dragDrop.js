import React, { useContext, useMemo, useState } from "react";
import styles from "./dragDrop.module.scss";
import { useDropzone } from "react-dropzone";
import { GetToken, uploadFile } from "../../../actions/action";
import Button from "../../Button/button";
import axios from "axios";
import { FileContext } from "../../../context/fileContext";
export default function DropzoneField(props) {
  const [fileData, setFileData] = useContext(FileContext);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    open,
    isDragReject,
  } = useDropzone({ noClick: true });

  const files = acceptedFiles.map((file) => {
    // console.log(file);
    return <li key={file.path}>{file.path}</li>;
  });
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#6e2af5",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };
  const token = GetToken();

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <Button title={"Choose"} type={"outlined"} onClick={open} />
      </div>
      <aside className={styles.Aside}>
        <div className={styles.fileName}>{files}</div>
      </aside>
    </section>
  );
}
