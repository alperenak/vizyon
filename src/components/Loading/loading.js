import React from "react";
import styles from "./loading.module.scss";
import { LoadingIcon } from "../../icons/";
export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <LoadingIcon className={styles.loading} />
    </div>
  );
}
