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
  GetToken,
  UpdateAnnouncements,
} from "../../../../actions/action";
import Modal from "../../../Modal/modal";
import Button from "../../../Button/button";
import Input from "../../../Input/input";
import { useLocation } from "react-router-dom";
import Selectbox from "../../../SelectBox/selectbox";
export default function Announcements({ announcementsData, isAdmin }) {
  const [active, setActive] = useState(false);
  const [modalType, setModalType] = useState("updateAnnouncements");
  const [id, setId] = useState(false);
  const [classArray, setClassArray] = useState([]);
  const [seeAll, setSeeAll] = useState(false);
  const [mapCount, setMapCount] = useState(5);
  const [editableTitle, setEditableTitle] = useState("");
  const [details, setDetail] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const { pathname } = useLocation();
  return (
    <>
      <RenderModal
        isActive={active}
        setIsActive={setActive}
        id={id}
        deletedId={deletedId}
        setDeletedId={setDeletedId}
        type={modalType}
        editableTitle={editableTitle}
        setEditableTitle={setEditableTitle}
        detail={details}
        setDetail={setDetail}
        isPublic={isPublic}
        setIsPublic={setIsPublic}
        classArrayPopulate={classArray}
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
          {isAdmin ? (
            <div className={styles.homeworkTitles}>
              <div className={styles.homeworkTitleHomework}>Duyuru Başlığı</div>
              <div className={styles.homeworkTitle}>Görünürlük</div>
              <div className={styles.homeworkTitle}>Gösterilecek Sınıflar</div>
              <div className={styles.homeworkTitle}>Teslim tarihi aralığı</div>
            </div>
          ) : (
            ""
          )}
          {announcementsData && announcementsData.length !== 0 ? (
            announcementsData.slice(0, mapCount).map((item, index) => {
              return (
                <div
                  key={index}
                  className={styles.announcements}
                  onClick={() => {
                    if (!isAdmin) {
                      setActive(true);
                      setModalType("title");
                      setDetail(item.detail);
                      setEditableTitle(item.title);
                    }
                  }}
                >
                  <div className={styles.imageCircle}>
                    <img
                      src={item.icon.includes("http") ? item.icon : duyurular}
                    />
                  </div>
                  <div className={styles.announcementsTitles}>
                    <div
                      className={`${styles.announcementsTitle} ${
                        isAdmin ? styles.width : ""
                      }`}
                    >
                      {item.title}
                    </div>
                    {isAdmin ? (
                      <>
                        <div
                          className={`${styles.announcementsTitle} ${styles.class}`}
                        >
                          {item.public ? "Herkes" : "Seçili Sınıflar"}
                        </div>
                        <div className={styles.announcementsTitle}>
                          {item.to.length !== 0
                            ? item.to.map((item) => {
                                return `${item.name},`;
                              })
                            : "Bütün sınıflar"}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
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
                          setDeletedId(item._id);
                          setModalType("delete");
                          setActive(true);
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
            })
          ) : (
            <div style={{ marginLeft: 25 }}>Duyuru bigisi bulunamadı</div>
          )}
        </div>
        <div
          onClick={() => {
            setSeeAll(!seeAll);
            if (!seeAll) setMapCount(announcementsData.length);
            else setMapCount(5);
          }}
          className={`${styles.seeAll} `}
        >
          {announcementsData && announcementsData.length !== 0
            ? seeAll
              ? "Küçült"
              : "Tümünü Gör"
            : ""}
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
  deletedId,
}) {
  const [addAnnouncementsTitle, setAddAnnouncementsTitle] = useState(
    editableTitle
  );
  const [addAnnouncementsDetail, setAddAnnouncementsDetails] = useState("");
  const [dropdownActive, setDropdownActive] = useState();
  const [dropdownName, setDropdownName] = useState("Kimler görebilir");
  const [classArray, setClassArray] = useState([]);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDetail, setErrorDetail] = useState(false);
  const [errorTitle1, setErrorTitle1] = useState(false);
  const [updatingSelectbox, setUpdatingSelectbox] = useState([]);
  const token = GetToken();
  return (
    <Modal isActive={isActive} setIsActive={setIsActive}>
      {type === "title" ? (
        <div className={styles.detailWrapper}>
          <h3>{editableTitle}</h3>
          <div className={styles.announcementsDetailText}>{detail}</div>
        </div>
      ) : type === "delete" ? (
        <div className={styles.deleteQuestion}>
          <div className={styles.deleteQuestionTitle}>
            Silmek istediğinizden emin misiniz?
          </div>
          <div className={styles.deleteQuestionButtons}>
            <Button
              type={"delete"}
              onClick={() => {
                DeleteAnnouncements(deletedId, token).then(() => {
                  window.location.reload();
                });
              }}
              title={"evet"}
            />
            <Button
              type={"delete"}
              onClick={() => setIsActive(false)}
              title={"hayır"}
            />
          </div>
        </div>
      ) : type === "updateAnnouncements" ? (
        <>
          <div
            id={"classDropdown"}
            onClick={() => setDropdownActive(!dropdownActive)}
            className={styles.dropdown}
          >
            <div id={"dropdownName"} className={styles.dropdownName}>
              <Down id={"dropdownIcon"} className={styles.downIcon} />
              {dropdownName === "Kimler görebilir"
                ? isPublic
                  ? "Herkes"
                  : "Seçilen Sınıflar"
                : dropdownName}
            </div>
            <div
              className={`${styles.dropdownContent}  ${
                dropdownActive ? styles.active : ""
              }`}
              onClick={() => {}}
            >
              {[{ name: "Herkes" }, { name: "Seçilen Sınıflar" }].map(
                (item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        // if (item.name === "Seçilen Sınıflar") setIsPublic(true);
                        setDropdownName(item.name);
                      }}
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
          {!isPublic || dropdownName === "Seçilen Sınıflar" ? (
            <Selectbox
              dataToArray={classArrayPopulate}
              onChange={(e) => {
                setUpdatingSelectbox(e);
              }}
            />
          ) : (
            ""
          )}

          <Button
            type={"modal"}
            title={"Güncelle"}
            onClick={() => {
              if (editableTitle.length >= 8) {
                UpdateAnnouncements(
                  id,
                  editableTitle,
                  detail,
                  updatingSelectbox.length !== 0
                    ? updatingSelectbox
                    : classArray,
                  isPublic,
                  token
                ).catch((e) => console.error(e));
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
            >
              {[{ name: "Herkes" }, { name: "Seçilen Sınıflar" }].map(
                (item, index) => {
                  return (
                    <div
                      key={index}
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
              if (
                addAnnouncementsTitle.length >= 8 &&
                addAnnouncementsDetail.length >= 8
              ) {
                AddAnnouncements(
                  addAnnouncementsTitle,
                  addAnnouncementsDetail,
                  dropdownName === "Seçilen Sınıflar" ? false : true,
                  classArray.map((item) => {
                    return item._id;
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
