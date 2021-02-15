import React, { useEffect, useState } from "react";
import styles from "./activityDetails.module.scss";
import { Ders, User } from "../../../../icons";
import { ConvertDate, convertHourMinute } from "../../../../utils/utils";
import {
  GetToken,
  GetGeneralLogs,
  GetDetailLogs,
  GetUserInformations,
  GetClassLogs,
  GetClassDetailLogs,
} from "../../../../actions/action";
import { useLocation, useParams } from "react-router-dom";
import { RenderIcon } from "../../../Apps/apps";
export default function ActivityDetails({
  tabsType,
  convertedDropdownValue,
  setLoading,
}) {
  const [LogData, setLogData] = useState([]);
  const [userFullName, setUserFullName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [logsDetailData, setLogsDetailData] = useState([]);
  const token = GetToken();
  const { id } = useParams();
  const query = useQuery();
  const isClass = query.get("class");
  useEffect(() => {
    GetUserInformations(token, id).then((data) => {
      if (tabsType === "student") {
        setUserFullName(data.data.data.userInfo.fullName);
        setUserAvatar(data.data.data.userInfo.profile_photo);
      }
    });
    if (query.get("class")) {
      GetClassLogs(token, id, convertedDropdownValue)
        .then((data) => {
          setLogData(data.data.data.logs);
          setLoading(false);
        })
        .then(() => {});
      GetClassDetailLogs(token, id, convertedDropdownValue).then((data) => {
        setLogsDetailData(data.data.data.logs);
      });
    } else {
      GetGeneralLogs(token, id, convertedDropdownValue)
        .then((data) => {
          setLogData(data.data.data.logs);
          setLoading(false);
        })
        .then(() => {});
      GetDetailLogs(token, id, convertedDropdownValue).then((data) => {
        setLogsDetailData(data.data.data.logs);
      });
    }
  }, [convertedDropdownValue]);
  return (
    <>
      <div className={styles.schedule}>
        <div className={styles.topSide}>
          <div className={styles.title}>
            <div className={styles.avatar}>
              <img alt="" src={userAvatar} />
            </div>
            <div className={styles.name}>{userFullName}</div>
          </div>
        </div>
        <div className={styles.scheduleTitlesSection}>
          <table>
            <tr className={styles.scheduleTitlesRow}>
              {tabsType === "Genel" && (
                <div className={styles.scheduleTitles}>
                  <User
                    className={`${styles.scheduleTitlesIcon} ${styles.user}`}
                  />
                  <td className={styles.ogretmen}>Uygulama Adı</td>
                </div>
              )}
              {tabsType === "Detaylar" && (
                <div className={styles.scheduleTitles}>
                  <User
                    className={`${styles.scheduleTitlesIcon} ${styles.user}`}
                  />
                  <td className={styles.ogretmen}>Kullanıcı Adı</td>
                </div>
              )}
              <div className={styles.scheduleTitles}>
                <Ders
                  style={{ marginLeft: tabsType === "Detaylar" ? 0 : 140 }}
                  className={`${styles.scheduleTitlesIcon}`}
                />
                <td>Giriş Sayısı</td>
              </div>
              {tabsType === "Detaylar" && (
                <div className={styles.scheduleTitles}>
                  <Ders
                    style={{ marginLeft: 140 }}
                    className={`${styles.scheduleTitlesIcon}`}
                  />
                  <td>Tarih</td>
                </div>
              )}
            </tr>
          </table>
        </div>
        <div className={styles.scheduleSection}>
          <table>
            {tabsType === "Genel" && LogData.length !== 0 ? (
              LogData?.map((item, index) => {
                return (
                  <tr onClick={() => {}} key={index}>
                    <div className={styles.scheduleTeacher}>
                      <div className={styles.avatar}>
                        <RenderIcon
                          iconName={item.app[0].title}
                          className={styles.appIcon}
                        />
                      </div>
                      <td>{item.app[0].title}</td>
                      {!isClass && <td>{item.user}</td>}
                    </div>
                    <td>{item.count}</td>

                    <td className={styles.space}></td>
                  </tr>
                );
              })
            ) : tabsType === "Detaylar" && LogData.length !== 0 ? (
              logsDetailData.map((item, index) => {
                return (
                  <tr key={index}>
                    <div className={styles.scheduleTeacher}>
                      <div className={styles.avatar}>
                        <RenderIcon
                          iconName={item.app.title}
                          className={styles.appIcon}
                        />
                      </div>
                      <>
                        <td>{`${item.user.first_name} ${item.user.last_name}`}</td>
                        <td style={{ width: 300 }}>{item.app.title}</td>
                        <td>{`${ConvertDate(item.date)} ${convertHourMinute(
                          item.date
                        )}`}</td>
                      </>
                    </div>

                    <td className={styles.space}></td>
                    <td className={styles.space}></td>
                  </tr>
                );
              })
            ) : (
              <h3 style={{ margin: 20 }}>
                Bu kullanıcı için gösterilecek bir rapor yok
              </h3>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
