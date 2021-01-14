import React, { useState } from "react";
import { Down } from "../../../../icons";
import styles from "./selectable.module.scss";

export default function Selectable({
  dropdownData = [{ value: "", id: "" }],
  onClick,
  value,
}) {
  const [dropdownActive, setDropdownActive] = useState(false);
  console.log(dropdownData);
  const [dropdownValue, setDrodownValue] = useState(
    value ? value : dropdownData[0]?.value
  );
  return (
    <div
      id={"classDropdown"}
      onClick={() => setDropdownActive(!dropdownActive)}
      className={styles.dropdown}
    >
      <div id={"dropdownName"} className={styles.dropdownName}>
        <Down id={"dropdownIcon"} className={styles.downIcon} />
        {dropdownValue}
      </div>
      <div
        className={`${styles.dropdownContent}  ${
          dropdownActive ? styles.active : ""
        }`}
        onClick={() => {}}
      >
        {dropdownData.map((item) => {
          return (
            <div
              onClick={() => {
                onClick({ value: item.value, id: item.id });
                setDrodownValue(item.value);
              }}
              className={styles.dropdownItems}
            >
              {item.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
