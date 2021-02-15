import React from "react";
import styles from "./appManagement.module.scss";
import Button from "../../../Button/button";
import AppsRender from "../../../Apps/apps";
import {
  GetSpecifiApps,
  GetToken,
  SaveSpecificApps,
} from "../../../../actions/action";
import { useParams } from "react-router-dom";

export default function AppManagement({
  dropdownValue,
  appData,
  setAppData,
  setLoading,
  setAlertData,
  setAlertboxActive,
}) {
  const token = GetToken();
  const { id } = useParams();
  function updateAppsFunction() {
    setLoading(true);
    GetSpecifiApps(token, id ? id : 9)
      .then((item) => {
        setAppData(item);
      })
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        setAlertboxActive(true);
        setAlertData({ type: "error", title: "Uygulamalar getirilemedi" });
      });
  }
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
            setLoading(false);
            SaveSpecificApps(token, appData.data.data)
              .then(() => {
                updateAppsFunction();
                setAlertboxActive(true);
                setAlertData({
                  type: "success",
                  title: "Uygulamalar başarıyla güncellendi",
                });
              })
              .catch(() => {
                setLoading(false);
                setAlertboxActive(true);
                setAlertData({
                  type: "error",
                  title: "Uygulamalar güncellenemedi",
                });
              });
          }}
          type={"primary"}
          title={"Kaydet"}
        />
      </div>
    </>
  );
}

const sArray = [];
