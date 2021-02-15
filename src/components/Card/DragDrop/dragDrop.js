import React, { useEffect, useMemo } from "react";
import styles from "./dragDrop.module.scss";
import { useDropzone } from "react-dropzone";
import { GetToken, importSchedule } from "../../../actions/action";
import Button from "../../Button/button";
export default function DropzoneField({ setIsActive, classId }) {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
    isDragAccept,
    open,
    isDragReject,
  } = useDropzone({ noClick: true, accept: ".xlsx" });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div key={file.path}>
      {!errors && `${file.path} - ${file.size} bytes`}
      <ul>
        {errors.map((e) => (
          <li style={{ color: "red" }} key={e.code}>
            Gönderilen dosya formatı yanlış. Lütfen standart dosya yüklemesi
            yapınız.
          </li>
        ))}
      </ul>
    </div>
  ));
  const files = acceptedFiles.map((file) => {
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
    width: 400,
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
  useEffect(() => {
    let formData = new FormData();
    formData.append("file", files[0]);
  }, [acceptedFiles]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <section className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Dosyaları buraya sürükleyin</p>
          <Button title={"Dosya Seçin"} type={"outlined"} onClick={open} />
        </div>
        <aside className={styles.Aside}>
          <div className={styles.fileName}>{files}</div>
        </aside>
      </section>
      <div style={{ color: "red" }}>{fileRejectionItems}</div>
      <Button
        type={"primary"}
        title={"Yükle"}
        onClick={() => {
          setIsActive(false);
          let formdata = new FormData();
          formdata.append("file", acceptedFiles[0]);
          importSchedule(token, formdata, classId).catch(() =>
            alert(
              "Gönderilen dosya formatı yanlış. Lütfen standart dosya yüklemesi yapınız."
            )
          );
          setIsActive(false);
        }}
      />
    </div>
  );
}
