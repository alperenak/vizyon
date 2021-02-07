import React, { useEffect, useState } from "react";
import { ChevronLeftSolid, ChevronRightSolid } from "../../icons";
import styles from "./pagination.module.scss";
export default function Pagination({ totalCount, selectedPage, onClick }) {
  const arr = makeArray(totalCount);
  const [defaultCount] = useState(totalCount);
  const [selectedCirle, setSelectedCircle] = useState(selectedPage);
  const [rightDisable, setRightDisable] = useState(false);
  const [leftDisable, setLeftDisable] = useState(true);

  useEffect(() => {
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
              if (selectedCirle === 2) setLeftDisable(true);
              else setLeftDisable(false);
              if (selectedCirle === totalCount) setRightDisable(false);
              onClick(selectedCirle - 1);
              setSelectedCircle(selectedCirle - 1);
            }
          }}
        >
          <ChevronLeftSolid className={styles.arrow} />
        </div>
        {arr.slice(0, defaultCount).map((item, index) => {
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
            if (selectedCirle < totalCount) {
              if (selectedCirle === 1) setLeftDisable(false);
              if (selectedCirle === totalCount - 1) setRightDisable(true);
              else setRightDisable(false);
              onClick(selectedCirle + 1);
              setSelectedCircle(selectedCirle + 1);
            }
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
