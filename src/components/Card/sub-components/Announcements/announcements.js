import React, { useState } from "react";
import styles from "./announcements.module.scss";
import duyurular from "../../../../assets/images/announcements.png";
import { ConvertDate } from "../../../../utils/utils";
import {
  EditSolid,
  TrashSolid,
  PlusCircleSolid,
  Down,
} from "../../../../icons";
import {
  AddAnnouncements,
  DeleteAnnouncements,
  GetAnnouncements,
  GetToken,
  IsRoleAdmin,
  UpdateAnnouncements,
} from "../../../../actions/action";
import Modal from "../../../Modal/modal";
import Button from "../../../Button/button";
import Input from "../../../Input/input";
import { useLocation } from "react-router-dom";
import Selectbox from "../../../SelectBox/selectbox";
export default function Announcements({
  title = "Duyurular",
  announcementsData,
  isAdmin,
}) {
  const [active, setActive] = useState(false);
  const [modalType, setModalType] = useState("updateAnnouncements");
  const [id, setId] = useState(false);
  const [classArray, setClassArray] = useState([]);
  const [seeAll, setSeeAll] = useState(false);
  const [mapCount, setMapCount] = useState(5);
  const [editableTitle, setEditableTitle] = useState("");
  const [details, setDetail] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const token = GetToken();
  const isRoledAdmin = IsRoleAdmin();
  console.log("anon", announcementsData);
  console.log("is", isRoledAdmin);
  const { pathname } = useLocation();
  return (
    <>
      <RenderModal
        isActive={active}
        setIsActive={setActive}
        id={id}
        type={modalType}
        editableTitle={editableTitle}
        setEditableTitle={setEditableTitle}
        detail={details}
        setDetail={setDetail}
        isPublic={isPublic}
        setIsPublic={setIsPublic}
        classArrayPopulate={classArray}
        isPublic={isPublic}
      />
      <div
        className={`${styles.announcementsCard}  ${
          pathname?.includes("/admin") ? styles.big : ""
        } ${seeAll ? styles.activeSee : ""}`}
      >
        <div className={styles.topSide}>
          <div className={styles.title}>Duyurular</div>
          {isAdmin ? (
            <div
              onClick={() => {
                setModalType("addAnnouncements");
                setActive(true);
              }}
              className={styles.addAnnouncements}
            >
              <PlusCircleSolid className={styles.addAnnouncementsIcon} />
              <div className={styles.addAnnouncementsTitle}>Duyuru Ekle</div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.announcementsSection}>
          {announcementsData.slice(0, mapCount).map((item) => {
            return (
              <div className={styles.announcements}>
                <div className={styles.imageCircle}>
                  <img
                    src={item.icon.includes("http") ? item.icon : duyurular}
                  />
                </div>
                <div className={styles.announcementsTitle}>{item.title}</div>
                {isAdmin ? (
                  <div className={styles.announcementsAdminIcon}>
                    <EditSolid
                      className={styles.editIcon}
                      onClick={() => {
                        setActive(true);
                        setId(item._id);
                        setEditableTitle(item.title);
                        setDetail(item.detail);
                        setClassArray(item.to);
                        setIsPublic(item.public);
                        setModalType("updateAnnouncements");
                      }}
                    />
                    <TrashSolid
                      className={styles.trashIcon}
                      onClick={() => {
                        DeleteAnnouncements(item._id, token).then(() => {
                          window.location.reload();
                        });
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className={styles.announcementsDate}>
                  {ConvertDate(item.createdAt)}
                </div>
              </div>
            );
          })}
        </div>
        <div
          onClick={() => {
            setSeeAll(!seeAll);
            if (!seeAll) setMapCount(announcementsData.length);
            else setMapCount(5);
          }}
          className={`${styles.seeAll} `}
        >
          {seeAll ? "Küçült" : "Tümünü Gör"}
        </div>
      </div>
    </>
  );
}
function RenderModal({
  isActive,
  setIsActive,
  id,
  type,
  editableTitle,
  setEditableTitle,
  detail,
  setDetail,
  isPublic,
  classArrayPopulate,
  setIsPublic,
}) {
  console.log("ed", editableTitle);
  const [announcementsTitle, setAnnouncementsTitle] = useState("");
  const [addAnnouncementsTitle, setAddAnnouncementsTitle] = useState(
    editableTitle
  );
  const [addAnnouncementsDetail, setAddAnnouncementsDetails] = useState("");
  const [dropdownActive, setDropdownActive] = useState();
  const [dropdownName, setDropdownName] = useState("Kimler görebilir");
  const [classArray, setClassArray] = useState([]);
  const [classIdArray, setClasIdArray] = useState([]);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDetail, setErrorDetail] = useState(false);
  const [errorTitle1, setErrorTitle1] = useState(false);
  const token = GetToken();
  console.log(announcementsTitle);
  console.log("class", classArrayPopulate);
  return (
    <Modal isActive={isActive} setIsActive={setIsActive}>
      {type === "updateAnnouncements" ? (
        <>
          <div
            id={"classDropdown"}
            onClick={() => setDropdownActive(!dropdownActive)}
            className={styles.dropdown}
          >
            <div id={"dropdownName"} className={styles.dropdownName}>
              <Down id={"dropdownIcon"} className={styles.downIcon} />
              {isPublic ? "Herkes" : "Seçilen Sınıflar"}
            </div>
            <div
              className={`${styles.dropdownContent}  ${
                dropdownActive ? styles.active : ""
              }`}
              onClick={() => {}}
            >
              {[{ name: "Herkes" }, { name: "Seçilen Sınıflar" }].map(
                (item) => {
                  return (
                    <div
                      onClick={() => setDropdownName(item.name)}
                      className={styles.dropdownItems}
                    >
                      {item.name}
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <Input
            value={editableTitle}
            placeholder="Duyurunun Başlığını giriniz"
            onChange={(e) => setEditableTitle(e.target.value)}
            inputStyle={"modal"}
          />
          <Input
            value={detail}
            placeholder="Duyurunun detaylarını giriniz"
            onChange={(e) => setDetail(e.target.value)}
            inputStyle={"modal"}
          />
          {errorTitle1 ? (
            <div className={styles.errorMessage}>
              Duyuru başlığı 8 karakterden büyük olmalı
            </div>
          ) : (
            ""
          )}
          <Selectbox
            dataToArray={classArrayPopulate}
            onChange={(e) => console.log(e)}
          />
          <Button
            type={"modal"}
            title={"Güncelle"}
            onClick={() => {
              if (editableTitle.length >= 8) {
                UpdateAnnouncements(
                  id,
                  editableTitle,
                  detail,
                  classArrayPopulate,
                  isPublic,
                  token
                )
                  .then(() =>
                    // GetAnnouncements(token)
                    window.location.reload()
                  )
                  .catch((e) => console.log(e));
                setIsActive(false);
              }
              if (editableTitle.length < 8) {
                setErrorTitle1(true);
              }
            }}
          />
        </>
      ) : (
        <>
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
              {[{ name: "Herkes" }, { name: "Seçilen Sınıflar" }].map(
                (item) => {
                  return (
                    <div
                      onClick={() => setDropdownName(item.name)}
                      className={styles.dropdownItems}
                    >
                      {item.name}
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <Input
            value={addAnnouncementsTitle}
            placeholder="Duyurunun Başlığını giriniz"
            onChange={(e) => setAddAnnouncementsTitle(e.target.value)}
            inputStyle={"modal"}
          />
          {errorTitle ? (
            <div className={styles.errorMessage}>
              Duyuru başlığı 8 karakterden büyük olmalı
            </div>
          ) : (
            ""
          )}
          <Input
            value={addAnnouncementsDetail}
            placeholder="Duyurunun detaylarını giriniz"
            onChange={(e) => setAddAnnouncementsDetails(e.target.value)}
            inputStyle={"modal"}
          />
          {errorDetail ? (
            <div className={styles.errorMessage}>
              Duyuru Detayları 8 karakterden büyük olmalı
            </div>
          ) : (
            ""
          )}

          {dropdownName === "Seçilen Sınıflar" ? (
            <Selectbox
              onChange={(e) => {
                setClassArray(e);
              }}
            />
          ) : (
            ""
          )}
          <Button
            type={"modal"}
            title={"Ekle"}
            onClick={() => {
              console.log(addAnnouncementsDetail, addAnnouncementsTitle);
              if (
                addAnnouncementsTitle.length >= 8 &&
                addAnnouncementsDetail.length >= 8
              ) {
                classArray.map((item) => {
                  setClasIdArray([...classArray, item._id]);
                });
                AddAnnouncements(
                  addAnnouncementsTitle,
                  addAnnouncementsDetail,
                  dropdownName === "Seçilen Sınıflar" ? false : true,
                  classArray.map((item) => {
                    return item.id;
                  }),
                  token
                ).then(() =>
                  // GetAnnouncements(token)
                  window.location.reload()
                );
                setIsActive(false);
              }
              if (
                addAnnouncementsTitle.length < 8 &&
                addAnnouncementsTitle !== ""
              ) {
                setErrorTitle(true);
              }
              if (
                addAnnouncementsDetail.length < 8 &&
                addAnnouncementsDetail !== ""
              ) {
                setErrorDetail(true);
              }
            }}
          />
        </>
      )}
    </Modal>
  );
}
