import React, { useEffect, useState } from "react";
import { ChevronLeftSolid, ChevronRightSolid } from "../../icons";
import styles from "./pagination.module.scss";
export default function Pagination({ totalCount, selectedPage, onClick }) {
  const arr = makeArray(totalCount);
  const [selectedCirle, setSelectedCircle] = useState(selectedPage);
  const [rightDisable, setRightDisable] = useState(false);
  const [leftDisable, setLeftDisable] = useState(true);

  function DisableLeftIcon() {
    if (selectedCirle === 1) setLeftDisable(true);
    else setLeftDisable(false);
    if (selectedCirle === totalCount) setRightDisable(true);
    else setRightDisable(false);
  }

  useEffect(() => {
    DisableLeftIcon();
    setSelectedCircle(selectedPage);
  }, [selectedPage]);
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationWrapper}>
        <div
          className={`${styles.paginationCircle} ${
            !leftDisable ? styles.hoverArrows : ""
          } ${leftDisable ? styles.disableArrow : ""}`}
          onClick={() => {
            if (selectedCirle > 1) {
              onClick(selectedCirle - 1);
            }
          }}
        >
          <ChevronLeftSolid className={styles.arrow} />
        </div>
        {arr.slice(0, totalCount).map((item, index) => {
          return (
            <div
              key={index}
              className={`${styles.paginationCircle} ${
                selectedCirle === item ? styles.selectedCircle : ""
              } ${styles.paginationNumber}`}
              onClick={() => {
                onClick(item);
                setSelectedCircle(item);
                if (item == 1) {
                  setLeftDisable(true);
                } else if (item === totalCount) {
                  setRightDisable(true);
                } else {
                  setRightDisable(false);
                  setLeftDisable(false);
                }
              }}
            >
              {item}
            </div>
          );
        })}
        <div
          className={`${styles.paginationCircle} ${
            !rightDisable ? styles.hoverArrows : ""
          } ${rightDisable ? styles.disableArrow : ""}`}
          onClick={() => {
            if (selectedCirle !== totalCount) onClick(selectedCirle + 1);
          }}
        >
          <ChevronRightSolid className={styles.arrow} />
        </div>
      </div>
    </div>
  );
}

function makeArray(count) {
  let arr = [];
  if (count !== 0) {
    for (let i = 1; i <= count; i++) arr.push(i);
  }

  return arr;
}
