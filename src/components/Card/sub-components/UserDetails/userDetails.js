import React, { useEffect, useState } from "react";
import {
  GetSpecifiApps,
  GetToken,
  GetUserAppPassword,
  GetUserInformations,
  UpdateUserAppPassword,
  UpdateUserInfo,
  AddNewApp,
  UpdateUserPasswordWithAdmin,
} from "../../../../actions/action";
import { useHistory, useParams } from "react-router-dom";
import Input from "../../../Input/input";
import styles from "./userDetails.module.scss";
import Background from "../../../../assets/images/classroom.jpg";
import {
  Edit,
  EditSolid,
  ArrowLeftSolid,
  IconUser,
  IconLock,
  PlusCircleSolid,
  TimesCircleSolid,
  CheckSolidCircle,
} from "../../../../icons";
import Office from "../../../../assets/images/office.png";
import Actively from "../../../../assets/images/actively.png";
import BrainPop from "../../../../assets/images/brainpop.png";
import KhanAcademy from "../../../../assets/images/khan.png";
import Morpa from "../../../../assets/images/morpa.png";
import RazPlus from "../../../../assets/images/razPlus.svg";
import Okuvaryum from "../../../../assets/images/okvaryum.png";
import BrainModify from "../../../../assets/images/brainModify.png";
import HiglightsLibrary from "../../../../assets/images/higlightsLibrary.png";
import Compass from "../../../../assets/images/compass.png";
import Raunt from "../../../../assets/images/raunt.png";
import sebitVCloud from "../../../../assets/images/sebitVCloud.png";
import MyOn from "../../../../assets/images/myOn.jpg";
import MyEduClass from "../../../../assets/images/myEduClass.png";
import LinguAttack from "../../../../assets/images/linguaAttack.svg";
import MicrosoftTeams from "../../../../assets/images/microsoftTeams.png";
import Pearson from "../../../../assets/images/pearson.svg";
import Rockalingua from "../../../../assets/images/rockalingualogo.png";
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
export default function UserDetail({
  tabsType,
  setLoading,
  setAlertData,
  setAlertboxActive,
}) {
  const token = GetToken();
  const params = useParams();
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [schoolNumber, setSchoolNumber] = useState("");
  const [AllTheClasses, setAllTheClasses] = useState([]);
  const [school, setSchool] = useState("");
  const [selectedClass, SetSelectedClass] = useState("");
  const [username, setUsername] = useState("");
  const [classesName, setClassesName] = useState("Sınıf bilgisi bulunamadı");
  const [allAppsData, setAllAppsData] = useState([]);
  const [role, setRole] = useState("");
  const [oldClassId, setOldClassId] = useState("");
  const [oldClassName, setOldClassName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [appPasswordData, setAppPasswordData] = useState([]);
  const [appData, setAppData] = useState([]);
  const [payload, setPayload] = useState({});
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [modalType, setModalType] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState(false);
  const userId = params.id;

  function updateUser() {
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
        GetSpecifiApps(token, 8).then((data) => {
          setAllAppsData(data.data.data[0].Apps);
        });
        if (Cdata.role === "student") {
          setSchool(Cdata.studentInfo.school);
          setSchoolNumber(Cdata.studentInfo.studentNumber);
          setClassesName(Cdata.studentInfo.class.name);
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
          GetSpecifiApps(
            token,
            ["10", "11", "12"].includes(
              Cdata.studentInfo.class.name.slice(0, 2)
            )
              ? Cdata.studentInfo.class.name.slice(0, 2)
              : Cdata.studentInfo.class.name[0]
          )
            .then((fetchAppData) => {
              setAllAppsData(fetchAppData);
            })
            .catch((e) => console.error(e));
        }
      })
      .catch((e) => {
        setLoading(false);
        setErrorMessage(e);
      });
  }

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
        GetSpecifiApps(token, 8).then((data) => {
          setAllAppsData(data.data.data[0].Apps);
        });
        if (Cdata.role === "student") {
          setSchool(Cdata.studentInfo.school);
          setSchoolNumber(Cdata.studentInfo.studentNumber);
          setClassesName(Cdata.studentInfo.class.name);
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
          GetSpecifiApps(
            token,
            ["10", "11", "12"].includes(
              Cdata.studentInfo.class.name.slice(0, 2)
            )
              ? Cdata.studentInfo.class.name.slice(0, 2)
              : Cdata.studentInfo.class.name[0]
          )
            .then((datass) => {
              setAllAppsData(datass.data.data[0].Apps);
            })
            .catch((e) => console.error(e));
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
      {tabsType === "student" ? (
        <>
          <div
            onClick={() => history.push("/admin/user")}
            className={styles.backButton}
          >
            <ArrowLeftSolid className={styles.backButtonIcon} />
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
              <div className={styles.alertboxes}>
                <Button
                  onClick={() => {
                    setModalType("changeUserPassword");
                    setIsActiveModal(true);
                  }}
                  type={"modal"}
                  title={"Şifresini Değiştir"}
                />
              </div>
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
                      value={classesName ? classesName : "Sınıf bilgisi yok"}
                      onClick={(e) => SetSelectedClass(e)}
                    />
                  </div>
                )}
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
                      .then(() => {
                        setLoading(false);
                        updateUser();
                        setAlertboxActive(true);
                        setAlertData({
                          type: "success",
                          title: "Kullanıcı başarıyla güncellendi",
                        });
                      })
                      .catch(() => {
                        setLoading(false);
                        setAlertboxActive(true);
                        setAlertData({
                          type: "error",
                          title: "Kullanıcı Güncellenemedi",
                        });
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
                      .then(() => {
                        setLoading(false);
                        updateUser();
                        setAlertboxActive(true);
                        setAlertData({
                          type: "success",
                          title: "Kullanıcı başarıyla güncellendi",
                        });
                      })
                      .catch(() => {
                        setLoading(false);
                        setAlertboxActive(true);
                        setAlertData({
                          type: "error",
                          title: "Kullanıcı Güncellenemedi",
                        });
                      });
                  }
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            onClick={() => {
              setIsActiveModal(true);
              setModalType("add");
            }}
            className={styles.feedback}
          >
            <PlusCircleSolid className={styles.feedbackIcon} />
            <div className={styles.feedbackTitle}>Yeni Uygulama Ekle</div>
          </div>
          <div className={styles.appsPasswords}>
            <div className={styles.titles}>
              <div className={styles.appNameTitle}>Uygulama Adı</div>
              <div className={styles.usernameTitle}>Kullanıcı Adı</div>
              <div className={styles.passwordTitle}>Şifre</div>
              <div className={styles.edit}>Düzenle</div>
            </div>
            <div className={styles.renderApps}>
              {appPasswordData && appPasswordData.length !== 0
                ? appPasswordData.map((item, index) => {
                    return (
                      <div key={index} className={styles.renderAppRow}>
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
        </>
      )}
      <Modal isActive={isActiveModal} setIsActive={setIsActiveModal}>
        <RenderModalContent
          appData={appData}
          userId={userId}
          payload={payload}
          appPasswordData={appPasswordData}
          modalType={modalType}
          setAlertboxActive={setAlertboxActive}
          setLoading={setLoading}
          setAlertData={setAlertData}
          setAppPasswordData={setAppPasswordData}
          allApps={allAppsData}
          setIsActiveModal={setIsActiveModal}
        />
      </Modal>
    </div>
  );
}
export function RenderModalContent({
  appData,
  appPasswordData,
  setAlertData,
  setAlertboxActive,
  userId,
  payload,
  modalType,
  setIsActiveModal,
  setAppPasswordData,
  allApps,
  setLoading,
}) {
  const { id } = useParams();
  const [appUsername, setAppUsername] = useState({ status: true });
  const [appPassword, setAppPassword] = useState({ status: true });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const convertingApp = appPasswordData.map((item) => {
    return item.app.name;
  });
  const token = GetToken();
  function UpdateApps() {
    GetUserAppPassword(token, id)
      .then((data) => {
        setAppPasswordData(data.data.data);
      })
      .catch(() => {
        setAlertboxActive(true);
        setAlertData({
          type: "success",
          title: "Uygulama başarıyla eklendi",
        });
      });
  }

  if (modalType === "add") {
    return (
      <div>
        <h3>Kullanıcı Adı</h3>
        <Input
          inputStyle={"detail"}
          placeholder={"Kullanıcı Adı"}
          onChange={(e) => setUsername(e.target.value)}
        />
        <h3>Şifre</h3>
        <Input
          inputStyle={"detail"}
          placeholder={"Şifre"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <h3>Uygulama Ekle</h3>
        <Dropdown
          type={"selectable"}
          onClick={(e) => setSelectedApp({ value: e.value, id: e.id })}
          dropdownData={allApps
            .filter((item) => {
              return !convertingApp.includes(item.app.name);
            })
            .map((item) => {
              return {
                value: item.app.title,
                id: item.app.id ? item.app.id : item.app._id,
              };
            })}
          value={"Uygulama Seçiniz"}
        />
        <Button
          type={"change"}
          title={"Kaydet"}
          onClick={() => {
            setLoading(true);
            setIsActiveModal(false);
            let payload = {
              user: id,
              credentials: {
                username: username,
                password: password,
              },
            };
            AddNewApp(token, payload, selectedApp.id)
              .then(() => {
                setLoading(false);
                setAlertboxActive(true);
                UpdateApps();
                setAlertData({
                  type: "success",
                  title: "Uygulama başarıyla eklendi",
                });
              })
              .catch(() => {
                setAlertboxActive(true);
                setAlertData({ type: "error", title: "Uygulama eklenemedi" });
              });
          }}
        />
      </div>
    );
  } else if (modalType === "changeUserPassword") {
    return (
      <>
        <h3>Yeni Şifre</h3>
        <Input
          onChange={(e) => setNewPassword(e.target.value)}
          method={"changePassword"}
          type={"password"}
          placeholder={"Yeni Şifre"}
          inputStyle={"change"}
          value={newPassword}
        >
          <IconLock className={styles.iconLock} />
          {newPassword &&
          newPasswordAgain &&
          newPassword !== "" &&
          newPasswordAgain !== "" &&
          newPassword !== newPasswordAgain ? (
            <TimesCircleSolid className={styles.timesSolid} />
          ) : newPassword &&
            newPasswordAgain &&
            newPassword !== "" &&
            newPasswordAgain !== "" &&
            newPassword === newPasswordAgain ? (
            <CheckSolidCircle className={styles.checkSolid} />
          ) : (
            ""
          )}
        </Input>
        <Input
          onChange={(e) => setNewPasswordAgain(e.target.value)}
          method={"changePassword"}
          type={"password"}
          placeholder={"Yeni Şifre Tekrar"}
          inputStyle={"change"}
          value={newPasswordAgain}
        >
          <IconLock className={styles.iconLock} />
          {newPassword &&
          newPasswordAgain &&
          newPassword !== "" &&
          newPasswordAgain !== "" &&
          newPassword !== newPasswordAgain ? (
            <TimesCircleSolid className={styles.timesSolid} />
          ) : newPassword &&
            newPasswordAgain &&
            newPassword !== "" &&
            newPasswordAgain !== "" &&
            newPassword === newPasswordAgain ? (
            <CheckSolidCircle className={styles.checkSolid} />
          ) : (
            ""
          )}
        </Input>
        {errorMessage ? (
          <div className={styles.errorMessage}>{errorMessage}</div>
        ) : (
          ""
        )}
        <Button
          type={"change"}
          title={"Kaydet"}
          onClick={() => {
            if (
              newPassword &&
              newPasswordAgain &&
              newPassword !== "" &&
              newPasswordAgain !== "" &&
              newPassword === newPasswordAgain
            ) {
              setIsActiveModal(false);
              setLoading(true);
              UpdateUserPasswordWithAdmin(token, {
                userId: id,
                newPassword: newPassword,
              })
                .then(() => {
                  setLoading(false);
                  setAlertboxActive(true);
                  setAlertData({
                    type: "success",
                    title: "Kullanıcının şifresi başarıyla değiştirildi",
                  });
                })
                .catch(() => {
                  setLoading(false);
                  setAlertboxActive(true);
                  setAlertData({
                    type: "error",
                    title: "Kullanıcının şifresi değiştirilemedi",
                  });
                });
            } else setErrorMessage("Şifreler Uyuşmuyor");
          }}
        />
      </>
    );
  } else
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
              setLoading(true);
              setIsActiveModal(false);
              UpdateUserAppPassword(token, userId, payload._id, {
                credentials: credentials,
                _id: payload._id,
                app: payload.app,
                user: payload.user,
              })
                .then(() => {
                  setLoading(false);
                  UpdateApps();
                  setAlertboxActive(true);
                  setAlertData({
                    type: "success",
                    title: "Uygulama şifresi başarıyla değiştirildi",
                  });
                })
                .catch(() => {
                  setAlertboxActive(true);
                  setAlertData({
                    type: "error",
                    title: "Uygulama şifresi değiştirilemedi",
                  });
                });
            }
          }}
        />
      </div>
    );
}
export function RenderIcon(props) {
  let { iconName } = props;

  if (iconName === "office365" || iconName.includes("Office")) {
    return <img src={Office} {...props} className={styles.office} />;
  } else if (iconName === "khanAcademy" || iconName.includes("Khan")) {
    return <img src={KhanAcademy} {...props} />;
  } else if (iconName === "udemy" || iconName.includes("Udemy")) {
    return <img src={Udemy} {...props} />;
  } else if (iconName === "razkids" || iconName.includes("Raz Kids")) {
    return <img src={RazKids} {...props} />;
  } else if (iconName === "morpa" || iconName.includes("Morpa")) {
    return <img src={Morpa} {...props} className={styles.morpa} />;
  } else if (
    iconName === "okuvaryumstudent" ||
    iconName.includes("Okuvaryum")
  ) {
    return <img src={Okuvaryum} {...props} />;
  } else if (
    iconName === "okuvaryumteacher" ||
    iconName.includes("Okuvaryum Öğretmen")
  ) {
    return <img src={Okuvaryum} {...props} />;
  } else if (iconName === "brainpop" || iconName.includes("Brain Pop")) {
    return <img src={BrainPop} {...props} className={styles.brain} />;
  } else if (iconName === "activelylearn" || iconName.includes("Actively")) {
    return <img src={Actively} {...props} className={styles.actively} />;
  } else if (iconName === "vocabularyaz" || iconName.includes("Vocabulary")) {
    return <img src={VocabularyAz} {...props} className={styles.actively} />;
  } else if (iconName === "scienceaz" || iconName.includes("Science")) {
    return <img src={ScienceAz} {...props} className={styles.actively} />;
  } else if (iconName === "writingaz" || iconName.includes("Writing")) {
    return <img src={WritingAz} {...props} className={styles.actively} />;
  } else if (iconName === "razplus" || iconName.includes("Raz Plus")) {
    return <img src={RazPlus} {...props} className={styles.actively} />;
  } else if (iconName === "eba" || iconName.includes("Eba")) {
    return <img src={Eba} {...props} className={styles.actively} />;
  } else if (iconName === "k12" || iconName.includes("K12")) {
    return <img src={Meb} {...props} className={styles.actively} />;
  } else if (iconName === "unlocklearning" || iconName.includes("Cambridge")) {
    return <img src={Cambridge} {...props} className={styles.actively} />;
  } else if (iconName === "zoom" || iconName.includes("Zoom")) {
    return <img src={Zoom} {...props} className={styles.actively} />;
  } else if (iconName === "brainmodify" || iconName.includes("Brain Modify")) {
    return <img src={BrainModify} {...props} className={styles.actively} />;
  } else if (iconName === "rockalingua" || iconName.includes("Rock")) {
    return <img src={Rockalingua} {...props} className={styles.actively} />;
  } else if (
    iconName === "pearsonenglishportal" ||
    iconName.includes("Pearson")
  ) {
    return <img src={Pearson} {...props} className={styles.actively} />;
  } else if (iconName === "microsoftteams" || iconName.includes("Microsoft")) {
    return <img src={MicrosoftTeams} {...props} className={styles.actively} />;
  } else if (iconName === "linguaattack" || iconName.includes("Lingua")) {
    return <img src={LinguAttack} {...props} className={styles.actively} />;
  } else if (iconName === "myeduclass" || iconName.includes("MyEdu")) {
    return <img src={MyEduClass} {...props} className={styles.actively} />;
  } else if (iconName === "myon" || iconName.includes("MyOn")) {
    return <img src={MyOn} {...props} className={styles.actively} />;
  } else if (iconName === "myeduclass" || iconName.includes("MyEdu")) {
    return <img src={MyEduClass} {...props} className={styles.actively} />;
  } else if (iconName === "vcloud" || iconName.includes("Vcloud")) {
    return <img src={sebitVCloud} {...props} className={styles.actively} />;
  } else if (iconName === "raunt" || iconName.includes("Raunt")) {
    return <img src={Raunt} {...props} className={styles.actively} />;
  } else if (iconName === "compass" || iconName.includes("Compass")) {
    return <img src={Compass} {...props} className={styles.actively} />;
  } else if (
    iconName === "highlightslibrary" ||
    iconName.includes("Higlight")
  ) {
    return (
      <img src={HiglightsLibrary} {...props} className={styles.actively} />
    );
  } else if (iconName === "zoom" || iconName.includes("Zoom")) {
    return <img src={Zoom} {...props} className={styles.actively} />;
  } else return "none";
}
