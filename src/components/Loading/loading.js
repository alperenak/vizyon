import React from "react";
import styles from "./loading.module.scss";
import { LoadingIcon } from "../../icons/";
export default function Loading({ noBackground }) {
  return (
    <div className={`${styles.loadingContainer} ${styles.noBackground}`}>
      <LoadingIcon className={styles.loading} />
    </div>
  );
}
