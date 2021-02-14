import React from "react";
import styles from "./loading.module.scss";
import { LoadingIcon } from "../../icons/";
export default function Loading({ noBackground, fullscreen }) {
  return (
    <div
      className={`${styles.loadingContainer} ${
        noBackground ? styles.noBackground : ""
      }
      ${fullscreen ? styles.fullscreen : ""}
      `}
    >
      <LoadingIcon className={styles.loading} />
    </div>
  );
}
