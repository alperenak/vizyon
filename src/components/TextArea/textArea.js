import React from "react";
import styles from "./textArea.module.scss";

export default function TextArea({
  rows,
  cols,
  type,
  onChange,
  value,
  placeholder,
}) {
  return (
    <textarea
      rows={rows}
      cols={cols}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={`${styles.textArea} ${styles[type]} `}
    />
  );
}
