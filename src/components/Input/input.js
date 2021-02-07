import React from "react";
import styles from "./input.module.scss";
export default function Input(props) {
  let {
    inputStyle,
    placeholder,
    children,
    type,
    onChange,
    onClick,
    value,
    method,
    ref,
  } = props;
  return (
    <div className={`${styles.inputContainer} ${styles[method]}`}>
      {children}
      <input
        onClick={onClick}
        type={type}
        placeholder={placeholder}
        className={styles[inputStyle]}
        onChange={onChange}
        value={value}
        ref={ref}
      />
    </div>
  );
}
