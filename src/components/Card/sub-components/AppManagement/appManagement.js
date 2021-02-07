import React from "react";
import styles from "./appManagement.module.scss";
import Button from "../../../Button/button";
import AppsRender from "../../../Apps/apps";
import { GetToken, SaveSpecificApps } from "../../../../actions/action";

export default function AppManagement({ dropdownValue, appData, setAppData }) {
  const token = GetToken();

  return (
    <>
      <div className={styles.apps}>
        <div className={styles.appsContainer}>
          <div className={styles.title}>
            {dropdownValue === "Sınıf Seçiniz"
              ? "Tüm Uygulamalar"
              : `${dropdownValue}ın Uygulamalar Listesi`}{" "}
            <span></span>
          </div>
          <div className={styles.appsGrid}>
            {appData.data?.data[0].Apps.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    let arr = appData;
                    arr.data.data[0].Apps[index].isSet = !item.isSet;
                    setAppData(arr);
                  }}
                >
                  <AppsRender
                    iconName={item.app.name}
                    appName={item.app.title}
                    isSelected={item.isSet}
                    onClick={(e) => {
                      if (sArray.length > 1) {
                        if (sArray[sArray.length - 2] !== e) sArray.push(e);
                      } else {
                        sArray.push(e);
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <Button
          onClick={() => {
            SaveSpecificApps(token, appData.data.data).then(() =>
              window.location.reload()
            );
          }}
          type={"primary"}
          title={"Kaydet"}
        />
      </div>
    </>
  );
}

const sArray = [];
