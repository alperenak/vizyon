import React from "react";
import { Dosyalar, Kampus, Odev, Uygulamalar } from "../../../icons";
import { useLocation, useHistory } from "react-router-dom";
import styles from "./subBar.module.scss";

export default function SubBar({ isActive }) {
  const pathname = useLocation().pathname;
  const history = useHistory();
  return (
    <div
      id={"subBar"}
      className={`${styles.subBar} ${isActive ? styles.active : ""} `}
    >
      <div
        onClick={() => history.push("/home")}
        id="subBarButton"
        className={`${isActive ? styles.subBarButtons : styles.displayNone} ${
          pathname === "/home" ? styles.backgroundWhite : ""
        }`}
      >
        <Kampus className={styles.kampusIcon} />
        <div className={styles.subBarButtonTitle}> Anasayfa</div>
      </div>

      <div
        onClick={() => history.push("/apps")}
        id="subBarButton"
        className={`${isActive ? styles.subBarButtons : styles.displayNone}  ${
          pathname === "/apps" ? styles.backgroundWhite : ""
        }`}
      >
        <Uygulamalar className={styles.appsIcon} />
        <div className={styles.subBarButtonTitle}> Uygulamalar</div>
      </div>

      <div
        id="subBarButton"
        onClick={() => history.push("/docs")}
        className={`${isActive ? styles.subBarButtons : styles.displayNone}  ${
          pathname === "/docs" ? styles.backgroundWhite : ""
        }`}
      >
        <Dosyalar className={styles.docsIcon} />
        <div className={styles.subBarButtonTitle}> Dosyalar</div>
      </div>
      <div
        id="subBarButton"
        onClick={() => history.push("/homeworks")}
        className={`${isActive ? styles.subBarButtons : styles.displayNone}  ${
          pathname === "/homeworks" ? styles.backgroundWhite : ""
        }`}
      >
        <Odev className={styles.docsIcon} />
        <div className={styles.subBarButtonTitle}> Ödevler</div>
      </div>
    </div>
  );
}
