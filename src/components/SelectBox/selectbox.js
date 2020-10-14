import React, { useState } from "react";
import { Down, TimesSolid } from "../../icons";
import styles from "./selectbox.module.scss";

export default function Selectbox() {
  const [dropdownActive, setDropdownActive] = useState();
  const [dropdownName, setDropdownName] = useState("Sınıf Seçiniz");
  const [dropdownArray, setDropdownArray] = useState([]);
  const [ClassesNameData, setClassNameData] = useState([
    { name: "sadsad" },
    { name: "sadsad" },
    { name: "sadsad" },
    { name: "sadsad" },
  ]);
  return (
    <div className={styles.selectbox}>
      <div
        id={"classDropdown"}
        onClick={() => setDropdownActive(!dropdownActive)}
        className={styles.dropdown}
      >
        <div id={"dropdownName"} className={styles.dropdownName}>
          <Down id={"dropdownIcon"} className={styles.downIcon} />
          {dropdownName
            ? dropdownName
            : dropdownArray.map((item) => {
                return (
                  <div className={`${styles.multiselect} ${styles.active}`}>
                    <TimesSolid className={styles.cross} />
                    <div className={styles.multiselectName}>{item}</div>
                  </div>
                );
              })}
        </div>
        <div
          className={`${styles.dropdownContent}  ${
            dropdownActive ? styles.active : ""
          }`}
          onClick={() => {}}
        >
          {ClassesNameData.map((item) => {
            return (
              <div
                onClick={() => {
                  setDropdownName(false);
                  setDropdownArray([...dropdownArray, item.name]);
                }}
                className={styles.dropdownItems}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
