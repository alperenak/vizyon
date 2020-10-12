import React, { useState } from "react";
import styles from "./announcements.module.scss";
import duyurular from "../../../../assets/images/announcements.png";
import { ConvertDate } from "../../../../utils/utils";
import { EditSolid, TrashSolid, PlusCircleSolid } from "../../../../icons";
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
export default function Announcements({
  title = "Duyurular",
  announcementsData,
  isAdmin,
}) {
  const [active, setActive] = useState(false);
  const [modalType, setModalType] = useState("updateAnnouncements");
  const [id, setId] = useState(false);
  const token = GetToken();
  const isRoledAdmin = IsRoleAdmin();
  console.log("anon", announcementsData);
  console.log("is", isRoledAdmin);

  return (
    <>
      <RenderModal
        isActive={active}
        setIsActive={setActive}
        id={id}
        type={modalType}
      />
      <div className={styles.announcementsCard}>
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
          {announcementsData.map((item) => {
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
        <div className={styles.seeAll}>Tümünü Gör</div>
      </div>
    </>
  );
}
function RenderModal({ isActive, setIsActive, id, type }) {
  const [announcementsTitle, setAnnouncementsTitle] = useState("");
  const [addAnnouncementsTitle, setAddAnnouncementsTitle] = useState("");
  const [addAnnouncementsDetail, setAddAnnouncementsDetails] = useState("");
  const token = GetToken();
  console.log(id);
  return (
    <Modal isActive={isActive} setIsActive={setIsActive}>
      {type === "updateAnnouncements" ? (
        <>
          <Input
            value={announcementsTitle}
            placeholder="Duyurunun Başlığını giriniz"
            onChange={(e) => setAnnouncementsTitle(e.target.value)}
            inputStyle={"modal"}
          />
          <Button
            type={"modal"}
            title={"Güncelle"}
            onClick={() => {
              UpdateAnnouncements(id, announcementsTitle, token).then(() =>
                // GetAnnouncements(token)
                window.location.reload()
              );
              setIsActive(false);
            }}
          />
        </>
      ) : (
        <>
          <Input
            value={addAnnouncementsTitle}
            placeholder="Duyurunun Başlığını giriniz"
            onChange={(e) => setAddAnnouncementsTitle(e.target.value)}
            inputStyle={"modal"}
          />
          <Input
            value={addAnnouncementsDetail}
            placeholder="Duyurunun detaylarını giriniz"
            onChange={(e) => setAddAnnouncementsDetails(e.target.value)}
            inputStyle={"modal"}
          />
          <Button
            type={"modal"}
            title={"Ekle"}
            onClick={() => {
              AddAnnouncements(
                addAnnouncementsTitle,
                addAnnouncementsDetail,
                token
              ).then(() =>
                // GetAnnouncements(token)
                window.location.reload()
              );
              setIsActive(false);
            }}
          />
        </>
      )}
    </Modal>
  );
}
