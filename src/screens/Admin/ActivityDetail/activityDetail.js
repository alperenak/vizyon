import React, { useState } from "react";
import { ArrowLeftSolid, Down } from "../../../icons";
import styles from "./activityDetail.module.scss";
import Card from "../../../components/Card/card";
import { useHistory } from "react-router-dom";
import Loading from "../../../components/Loading/loading";

export default function ActivityDetail({ match }) {
  const [dropdownActive, setDropdownActive] = useState();
  const [tabsType, setTabsType] = useState("Genel");
  const [dropdownName, setDropdownName] = useState("Bugün");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  return (
    <div className={styles.activityDetailContainer}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            onClick={() => history.push("/admin/activity")}
            className={styles.backButton}
          >
            <ArrowLeftSolid className={styles.backButtonIcon} />
          </div>
          <div className={styles.topSide}>
            <div
              id={"classDropdown"}
              onClick={() => setDropdownActive(!dropdownActive)}
              className={styles.dropdown}
            >
              <div id={"dropdownName"} className={styles.dropdownName}>
                <Down id={"dropdownIcon"} className={styles.downIcon} />
                {dropdownName}
              </div>
              <div
                className={`${styles.dropdownContent}  ${
                  dropdownActive ? styles.active : ""
                }`}
                onClick={() => {}}
              >
                {[
                  { name: "Bugün" },
                  { name: "Son 7 gün" },
                  { name: "Bu ay" },
                  { name: "Geçen ay" },
                  { name: "Tümü" },
                ].map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setDropdownName(item.name)}
                      className={styles.dropdownItems}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.tabs}>
              <div
                className={`${styles.tabsButton} ${
                  tabsType === "Genel" ? styles.tabsButtonActive : ""
                }`}
                onClick={() => setTabsType("Genel")}
              >
                Genel
              </div>
              <div
                className={`${styles.tabsButton} ${
                  tabsType === "Detaylar" ? styles.tabsButtonActive : ""
                }`}
                onClick={() => setTabsType("Detaylar")}
              >
                Detaylar
              </div>
            </div>
          </div>
          <Card
            type={"activityDetails"}
            tabsType={tabsType}
            match={match}
            setLoading={setLoading}
            dropdownValue={dropdownName}
            convertedDropdownValue={convertDropdownValue(dropdownName)}
          />
        </>
      )}
    </div>
  );
}
function convertDropdownValue(value) {
  if (value === "Son 7 gün") return "thisWeek";
  else if (value === "Bu ay") return "thisMonth";
  else if (value === "Geçen ay") return "lastMonth";
  else if (value === "Bugün") return "today";
  else if (value === "Tümü") return "all";
  else return false;
}
