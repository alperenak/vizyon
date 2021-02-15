import React, { useEffect, useState } from "react";
import { CheckSolidCircle, TimesCircleSolid } from "../../icons";
import styles from "./alertbox.module.scss";

export default function AlertBox({ isActive, setIsActive, alertData }) {
  return (
    <>
      {isActive && (
        <RenderAlertbox setIsActive={setIsActive} alertData={alertData} />
      )}
    </>
  );
}

export function RenderAlertbox({ setIsActive, alertData }) {
  const [activeAlert, setActiveAlert] = useState(true);
  useEffect(() => {
    setTimeout(() => setActiveAlert(false), 3000);
    setTimeout(() => setIsActive(false), 4300);
  }, []);
  return (
    <div className={styles.alertBoxWrapper}>
      <div
        className={`${styles.alertboxContainer} ${
          !activeAlert && styles.closeAlertboxContainer
        }`}
      >
        <div className={styles.alertbox}>
          <div className={styles.alertMessage}>
            {alertData?.type === "error" && (
              <div className={styles.alertMessageIcon}>
                <TimesCircleSolid className={styles.errorIcon} />
              </div>
            )}
            {alertData?.type === "success" && (
              <div className={styles.alertMessageIcon}>
                <CheckSolidCircle className={styles.successIcon} />
              </div>
            )}
            <div className={styles.alertMessageTitle}>{alertData?.title}</div>
          </div>

          <div className={styles.alertProgressBar} />
        </div>
      </div>
    </div>
  );
}
