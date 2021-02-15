import React from "react";
import styles from "./alert.module.scss";

export default function AlertComponent({ title, children, type, size }) {
  return (
    <div className={`${styles.alertBox} ${styles[type]} ${styles[size]}`}>
      {children}
      <div dangerouslySetInnerHTML={addSpanByBold(title)}></div>
    </div>
  );
}

function addSpanByBold(title) {
  let text = title;
  if (text.includes("**")) {
    text = text.replace("**", "<span>");
    text = text.replace("**", "</span>");
  }
  return { __html: text };
}
