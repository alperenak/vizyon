import React from "react";
import Card from "../../components/Card/card";
import styles from "./profile.module.scss";

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <Card type={"profile"} />
    </div>
  );
}
