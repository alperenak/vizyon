import React, { useEffect, useState } from "react";
import { Down } from "../../../../icons";
import styles from "./selectable.module.scss";

export default function Selectable({
  dropdownData = [{ value: "", id: "" }],
  onClick,
  value,
  zIndex,
}) {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [dropdownValue, setDrodownValue] = useState("");
  useEffect(() => {
    setDrodownValue(value ? value : dropdownData[0].value);
  }, [value]);
  return (
    <div
      id={"classDropdown"}
      onClick={() => setDropdownActive(!dropdownActive)}
      className={`${styles.dropdown} ${zIndex ? styles.zIndex : ""}`}
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
        {dropdownData.map((item, index) => {
          return (
            <div
              key={index}
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
