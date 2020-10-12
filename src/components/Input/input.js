import React from "react";
import styles from "./input.module.scss";
import { IconLock, IconUser } from "../../icons";
export default function Input(props) {
  let {
    inputStyle,
    placeholder,
    children,
    type,
    onChange,
    value,
    method,
  } = props;
  return (
    <div className={`${styles.inputContainer} ${styles[method]}`}>
      {children}
      <input
        type={type}
        placeholder={placeholder}
        className={styles[inputStyle]}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
