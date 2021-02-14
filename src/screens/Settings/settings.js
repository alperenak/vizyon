import React from "react";
import Card from "../../components/Card/card";
import styles from "./settings.module.scss";

export default function Settings() {
  return (
    <div className={styles.settings}>
      <Card type={"settings"} />
    </div>
  );
}
