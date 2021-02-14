import React, { useEffect, useState } from "react";
import {
  getAllClass,
  GetToken,
  GetUserAppPassword,
  GetUserInformations,
  UpdateUserAppPassword,
  UpdateUserInfo,
  UpdateUserPassword,
} from "../../../../actions/action";
import { useHistory, useParams } from "react-router-dom";
import Input from "../../../Input/input";
import Loading from "../../../Loading/loading";
import styles from "./userDetails.module.scss";
import Background from "../../../../assets/images/classroom.jpg";
import {
  Edit,
  EditSolid,
  ArrowLeftSolid,
  IconUser,
  IconLock,
  PlusCircleSolid,
} from "../../../../icons";
import Office from "../../../../assets/images/office.png";
import Actively from "../../../../assets/images/actively.png";
import BrainPop from "../../../../assets/images/brainpop.png";
import KhanAcademy from "../../../../assets/images/khan.png";
import Morpa from "../../../../assets/images/morpa.png";
import Okuvaryum from "../../../../assets/images/okvaryum.png";
import RazPlus from "../../../../assets/images/razPlus.svg";
import ScienceAz from "../../../../assets/images/ScienceAz.svg";
import WritingAz from "../../../../assets/images/writingAz.svg";
import VocabularyAz from "../../../../assets/images/vocabulary.png";
import Eba from "../../../../assets/images/eba.png";
import Cambridge from "../../../../assets/images/cambridge.png";
import Meb from "../../../../assets/images/meb.jpg";
import RazKids from "../../../../assets/images/razkids.png";
import Udemy from "../../../../assets/images/udemy.png";
import Zoom from "../../../../assets/images/zoom.png";
import Button from "../../../Button/button";
import Dropdown from "../../../Dropdown/dropdown";
import Modal from "../../../Modal/modal";
export default function UserDetail({ tabsType }) {
  const token = GetToken();
  const params = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [schoolNumber, setSchoolNumber] = useState("");
  const [AllTheClasses, setAllTheClasses] = useState([]);
  const [school, setSchool] = useState("");
  const [selectedClass, SetSelectedClass] = useState("");
  const [username, setUsername] = useState("");
  const [className, setClassName] = useState("");
  const [role, setRole] = useState("");
  const [oldClassId, setOldClassId] = useState("");
  const [oldClassName, setOldClassName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [appPasswordData, setAppPasswordData] = useState([]);
  const [appData, setAppData] = useState([]);
  const [payload, setPayload] = useState({});
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const userId = params.id;
  console.log(
    firstName,
    lastName,
    oldClassName,
    className,
    school,
    schoolNumber
  );
  useEffect(() => {
    GetUserInformations(token, params.id)
      .then((data) => {
        //test
        setLoading(false);
        let Cdata;
        if (data.data.data.userInfo) Cdata = data.data.data.userInfo;
        else Cdata = data.data.data;

        setAllTheClasses(data.data.data.classes);
        setRole(Cdata.role);
        setUserData(Cdata);
        setFirstName(Cdata.first_name);
        setLastName(Cdata.last_name);
        setProfilePhoto(Cdata.profile_photo);
        setUsername(Cdata.username);
        if (Cdata.role === "student") {
          setSchool(Cdata.studentInfo.school);
          setSchoolNumber(Cdata.studentInfo.studentNumber);
          setClassName(Cdata.studentInfo.class.name);
          setOldClassId(
            Cdata.studentInfo.class.id
              ? Cdata.studentInfo.class.id
              : Cdata.studentInfo.class._id
          );
          SetSelectedClass({
            value: Cdata.studentInfo.class.name,
            id: Cdata.studentInfo.class.id
              ? Cdata.studentInfo.class.id
              : Cdata.studentInfo.class._id,
          });
          setOldClassName(Cdata.studentInfo.class.name);
        }
      })
      .catch((e) => {
        setLoading(false);
        setErrorMessage(e);
      });

    GetUserAppPassword(token, params.id)
      .then((data) => {
        setAppPasswordData(data.data.data);
      })
      .catch((e) => setErrorMessage(e));
  }, []);
  return (
    <div className={styles.userDetailContainer}>
      {loading ? (
        <Loading noBackground={true} />
      ) : tabsType === "student" ? (
        <>
          <div
            onClick={() => history.push("/admin/user")}
            className={styles.backButton}
          >
            <ArrowLeftSolid className={styles.backButtonIcon} />
          </div>
          <div
            onClick={() => {
              setModalType("add");
            }}
            className={styles.feedback}
          >
            <PlusCircleSolid className={styles.feedbackIcon} />
            <div className={styles.feedbackTitle}>Yeni Sınıf Oluştur</div>
          </div>
          <div className={styles.detailSection}>
            <div className={styles.classesCard}>
              <div className={styles.classBackground}>
                <img src={Background} />
              </div>
              <div className={styles.teacherAvatarBackground}>
                <div className={styles.teacherAvatar}>
                  <img src={userData?.profile_photo} />
                  <Edit className={styles.editIcon} />
                </div>
              </div>
              <div className={styles.name}>{`${firstName} ${lastName}`}</div>
              <div className={styles.alertboxes}></div>
            </div>
            <div className={styles.formSection}>
              {/* 1.row */}
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <h3>Adı</h3>
                  <Input
                    value={firstName}
                    placeholder="Adı"
                    inputStyle="detail"
                    onChange={(e) => setFirstName(e.target.value)}
                  ></Input>
                </div>
                <div className={styles.inputGroup}>
                  <h3>Soyadı</h3>
                  <Input
                    value={lastName}
                    placeholder="Soyadı"
                    onChange={(e) => setLastName(e.target.value)}
                    inputStyle="detail"
                  ></Input>
                </div>
              </div>
              {/* 2.row */}
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <h3>Kullanıcı Adı</h3>
                  <Input
                    value={username}
                    placeholder="Kullanıcı Adı"
                    inputStyle="detail"
                    onChange={(e) => setUsername(e.target.value)}
                  ></Input>
                </div>
                {role === "student" && (
                  <div className={styles.inputGroup}>
                    <h3>Okul</h3>
                    <Input
                      value={school}
                      placeholder="Okul Adı"
                      onChange={(e) => setSchool(e.target.value)}
                      inputStyle="detail"
                    ></Input>
                  </div>
                )}
              </div>
              <div className={styles.inputRow}>
                {role === "student" && (
                  <div className={styles.inputGroup}>
                    <h3>Okul Numarası</h3>
                    <Input
                      value={schoolNumber}
                      placeholder="Öğrenci Numarası"
                      inputStyle="detail"
                      onChange={(e) => setSchoolNumber(e.target.value)}
                    ></Input>
                  </div>
                )}
                {role === "student" && (
                  <div className={styles.inputGroup}>
                    <h3>Sınıf</h3>

                    <Dropdown
                      type={"selectable"}
                      dropdownData={AllTheClasses.map((item) => {
                        return {
                          value: item.name,
                          id: item.id ? item.id : item._id,
                        };
                      })}
                      value={className ? className : "Sınıf bilgisi bulunamadı"}
                      onClick={(e) => SetSelectedClass(e)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <Button
            type="change"
            title="Kaydet"
            onClick={() => {
              setLoading(true);
              if (role === "student") {
                let date = new Date();
                let payload = {
                  studentInfo: {
                    class: {
                      _id: selectedClass.id,
                      name: oldClassName,
                    },
                    studentNumber: schoolNumber,
                    school: school,
                  },
                  _id: params.id,
                  fullName: `${firstName} ${lastName}`,
                  first_name: firstName,
                  last_name: lastName,
                  username: username,
                  createdAt: date,
                  __v: 0,
                  assignedClass: oldClassId,
                  profile_photo: profilePhoto,
                  id: params.id,
                };
                UpdateUserInfo(token, params.id, payload)
                  .then((data) => {
                    console.log(data.data);
                    setLoading(false);
                    alert("Başarı ile kaydedildi");
                  })
                  .catch((e) => {
                    setErrorMessage(e);
                    setLoading(false);
                    alert(e.error);
                  });
              } else if (role === "instructor") {
                let date = new Date();
                let payload = {
                  _id: params.id,
                  fullName: `${firstName} ${lastName}`,
                  first_name: firstName,
                  last_name: lastName,
                  username: username,
                  profile_photo: profilePhoto,
                  createdAt: date,
                  __v: 0,
                  id: params.id,
                };
                UpdateUserInfo(token, params.id, payload)
                  .then((data) => {
                    console.log(data.data);
                    setLoading(false);
                    alert("Başarı ile kaydedildi");
                  })
                  .catch((e) => {
                    setErrorMessage(e);
                    setLoading(false);
                    alert(e.error);
                  });
              }
            }}
          />
        </>
      ) : (
        <div className={styles.appsPasswords}>
          <div className={styles.titles}>
            <div className={styles.appNameTitle}>Uygulama Adı</div>
            <div className={styles.usernameTitle}>Kullanıcı Adı</div>
            <div className={styles.passwordTitle}>Şifre</div>
            <div className={styles.edit}>Düzenle</div>
          </div>
          <div className={styles.renderApps}>
            {appPasswordData && appPasswordData.length !== 0
              ? appPasswordData.map((item) => {
                  return (
                    <div className={styles.renderAppRow}>
                      <div className={styles.appAvatarWrapper}>
                        <div className={styles.appAvatar}>
                          <RenderIcon
                            iconName={item.app.name}
                            className={styles.icon}
                          />
                        </div>
                        <div className={styles.appName}>{item.app.title}</div>
                      </div>

                      <div className={styles.appUsername}>
                        {item.credentials.email
                          ? item.credentials.email
                          : item.credentials.username
                          ? item.credentials.username
                          : ""}
                      </div>
                      <div className={styles.appPassword}>
                        {item.credentials.password}
                      </div>
                      <EditSolid
                        onClick={() => {
                          setAppData({
                            appName: item.app.title,
                            username: item.credentials.email
                              ? item.credentials.email
                              : item.credentials.username,
                            password: item.credentials.password,
                          });
                          setPayload({
                            _id: item._id,
                            app: item.app._id,
                            user: userId,
                          });
                          setModalType("edit");
                          setIsActiveModal(true);
                        }}
                        className={styles.editIcon}
                      />
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      )}
      <Modal isActive={isActiveModal} setIsActive={setIsActiveModal}>
        <RenderModalContent
          appData={appData}
          userId={userId}
          payload={payload}
        />
      </Modal>
    </div>
  );
}
export function RenderModalContent({ appData, userId, payload }) {
  const [appUsername, setAppUsername] = useState({ status: true });
  const [appPassword, setAppPassword] = useState({ status: true });
  const token = GetToken();
  return (
    <div>
      <h3>Uygulama Şifresi Değiştirme</h3>
      <Input
        onChange={(e) => setAppUsername(e.target.value)}
        method={"changePassword"}
        value={
          appUsername && appUsername.status ? appData.username : appUsername
        }
        type={"text"}
        placeholder={"Kullanıcı Adın"}
        inputStyle={"change"}
      >
        <IconUser className={styles.modalIcon} />
      </Input>
      <Input
        onChange={(e) => setAppPassword(e.target.value)}
        method={"changePassword"}
        type={"password"}
        placeholder={"Eski şifren"}
        inputStyle={"change"}
        value={
          appPassword && appPassword.status ? appData.password : appPassword
        }
      >
        <IconLock className={styles.modalIcon} />
      </Input>
      <Button
        type={"change"}
        title={"Kaydet"}
        onClick={() => {
          if (appData.username) {
            const credentials = {
              username:
                typeof appUsername === "string"
                  ? appUsername
                  : appData.username,
              password:
                typeof appPassword === "string"
                  ? appPassword
                  : appData.password,
            };
            UpdateUserAppPassword(token, userId, payload._id, {
              credentials: credentials,
              _id: payload._id,
              app: payload.app,
              user: payload.user,
            })
              .then(() => {
                alert("Uygulama şifresi değiştirme başarılı");
                window.location.reload();
              })
              .catch(() => alert("Bir hata oluştu"));
          }
          //  else if (appData.email) {
          //   const credentials = {
          //     email:
          //       typeof appUsername === "string" ? appUsername : appData.email,
          //     password:
          //       typeof appPassword === "string"
          //         ? appPassword
          //         : appData.password,
          //   };
          //   UpdateUserAppPassword(token, userId, payload._id, {
          //     credentials: credentials,
          //     _id: payload._id,
          //     app: payload.app,
          //     user: payload.user,
          //   })
          //     .then(() => {
          //       alert("Uygulama şifresi değiştirme başarılı");
          //       window.location.reload();
          //     })
          //     .catch(() => alert("Bir hata oluştu"));
          // }
        }}
      />
    </div>
  );
}
export function RenderIcon(props) {
  let { iconName } = props;
  console.log(iconName);
  if (iconName === "office365") {
    return <img src={Office} {...props} className={styles.office} />;
  } else if (iconName === "khanAcademy") {
    return <img src={KhanAcademy} {...props} />;
  } else if (iconName === "udemy") {
    return <img src={Udemy} {...props} />;
  } else if (iconName === "razkids") {
    return <img src={RazKids} {...props} />;
  } else if (iconName === "morpa") {
    return <img src={Morpa} {...props} className={styles.morpa} />;
  } else if (iconName === "okuvaryumstudent") {
    return <img src={Okuvaryum} {...props} />;
  } else if (iconName === "okuvaryumteacher") {
    return <img src={Okuvaryum} {...props} />;
  } else if (iconName === "brainpop") {
    return <img src={BrainPop} {...props} className={styles.brain} />;
  } else if (iconName === "activelylearn") {
    return <img src={Actively} {...props} className={styles.actively} />;
  } else if (iconName === "vocabularyaz") {
    return <img src={VocabularyAz} {...props} className={styles.actively} />;
  } else if (iconName === "scienceaz") {
    return <img src={ScienceAz} {...props} className={styles.actively} />;
  } else if (iconName === "writingaz") {
    return <img src={WritingAz} {...props} className={styles.actively} />;
  } else if (iconName === "razplus") {
    return <img src={RazPlus} {...props} className={styles.actively} />;
  } else if (iconName === "eba") {
    return <img src={Eba} {...props} className={styles.actively} />;
  } else if (iconName === "k12") {
    return <img src={Meb} {...props} className={styles.actively} />;
  } else if (iconName === "unlocklearning") {
    return <img src={Cambridge} {...props} className={styles.actively} />;
  } else if (iconName === "zoom") {
    return <img src={Zoom} {...props} className={styles.actively} />;
  } else return "none";
}
let ad = {
  studentInfo: {
    class: { _id: "5fc06aafd08c505e12fe4ba4", name: "9 6. GRUP" },
    studentNumber: 357,
    school: "FEN LİSESİ",
  },
  _id: "5fc06ca7d08c505e12fec811",
  fullName: "DURU NALBAT",
  first_name: "DURU",
  last_name: "NALBAT",
  username: "duru.nalbat@gelisimkoleji.k12.tr",
  createdAt: "2021-01-14T21:44:07.801Z",
  __v: 0,
  assignedClass: "5fc06ac4d08c505e12fe54dc",
  profile_photo:
    "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png",
  id: "5fc06ca7d08c505e12fec811",
};
