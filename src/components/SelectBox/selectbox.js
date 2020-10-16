import React, { useEffect, useState } from "react";
import { getAllClass, GetToken } from "../../actions/action";
import { Down, TimesSolid } from "../../icons";
import SvgRar from "../../icons/Rar";
import styles from "./selectbox.module.scss";

export default function Selectbox({ onChange, dataToArray = [] }) {
  const [dropdownActive, setDropdownActive] = useState();
  const [dropdownName, setDropdownName] = useState("Sınıf Seçiniz");
  const [dropdownArray, setDropdownArray] = useState(dataToArray);
  const token = GetToken();
  const [ClassesNameData, setClassNameData] = useState([
    { name: "sadssad" },
    { name: "sadsadssadsas" },
    { name: "sadsadfafaa" },
    { name: "sadsaasdadd" },
  ]);
  console.log("tooo", dropdownArray);

  useEffect(() => {
    if (dataToArray) {
      setDropdownArray(dataToArray);
    }
    getAllClass(token, 1000, 1).then((data) =>
      setClassNameData(data.data.data)
    );
  }, [dataToArray]);
  return (
    <div className={styles.selectbox}>
      <div
        id={"classDropdown"}
        onClick={() => setDropdownActive(!dropdownActive)}
        className={styles.dropdown}
      >
        <div id={"dropdownName"} className={styles.dropdownName}>
          <Down id={"dropdownIcon"} className={styles.downIcon} />
          {dropdownArray.length !== 0
            ? dropdownArray.map((item) => {
                return (
                  <div className={`${styles.multiselect} ${styles.active}`}>
                    <TimesSolid
                      onClick={() => {
                        let arr = dropdownArray;
                        arr = arr.filter((data) => {
                          return data.name !== item.name;
                        });
                        setDropdownArray(arr);
                        setClassNameData(
                          [...ClassesNameData, { name: item.name }].sort(
                            (a, b) => a - b
                          )
                        );
                      }}
                      className={styles.cross}
                    />
                    <div
                      onChange={onChange(dropdownArray)}
                      className={styles.multiselectName}
                    >
                      {item.name}
                    </div>
                  </div>
                );
              })
            : dropdownName}
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
                  setDropdownArray([
                    ...dropdownArray,
                    { name: item.name, _id: item._id },
                  ]);
                  setClassNameData(
                    ClassesNameData.filter((data) => {
                      return data.name !== item.name;
                    }).sort((a, b) => a - b)
                  );
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
