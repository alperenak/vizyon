import React from "react";
import ActivityDetail from "./sub-components/ActivityDetails/activityDetails";
import styles from "./card.module.scss";
import DropzoneField from "./DragDrop/dragDrop";
import ActivityManagement from "./sub-components/Activity/activity";
import Announcements from "./sub-components/Announcements/announcements";
import Classes from "./sub-components/Classes/classes";
import ClassManagement from "./sub-components/ClassManagement/classManagement";
import Schedule from "./sub-components/Schedule/schedule";
import Syllabus from "./sub-components/Syllabus/syllabus";
import Teachers from "./sub-components/Teachers/teacher";
import UserManagement from "./sub-components/User Management/userManagement";
import SyllabusManagement from "./sub-components/SyllabusManagement/syllabusManagement";
import AppManagement from "./sub-components/AppManagement/appManagement";
import Exams from "./sub-components/Exams/exams";
import NewMessages from "./sub-components/newMessages/newMessages";
import Settings from "./sub-components/Settings/settings";
import Profile from "./sub-components/Profile/profile";

export default function Card(props) {
  return (
    <div className={styles.cardContainer}>
      <RenderByTypes {...props} />
    </div>
  );
}

function RenderByTypes(props) {
  let { type } = props;
  if (type === "announcements") {
    return <Announcements {...props} />;
  } else if (type === "syllabus") {
    return <Syllabus {...props} />;
  } else if (type === "classes") {
    return <Classes {...props} />;
  } else if (type === "teachers") {
    return <Teachers {...props} />;
  } else if (type === "classManagement") {
    return <ClassManagement {...props} />;
  } else if (type === "schedule") {
    return <Schedule {...props} />;
  } else if (type === "userManagement") {
    return <UserManagement {...props} />;
  } else if (type === "dropzone") {
    return <DropzoneField {...props} />;
  } else if (type === "activity") {
    return <ActivityManagement {...props} />;
  } else if (type === "activityDetails") {
    return <ActivityDetail {...props} />;
  } else if (type === "syllabusManagement") {
    return <SyllabusManagement {...props} />;
  } else if (type === "appManagement") {
    return <AppManagement {...props} />;
  } else if (type === "exams") {
    return <Exams {...props} />;
  } else if (type === "newMessages") {
    return <NewMessages {...props} />;
  } else if (type === "settings") {
    return <Settings {...props} />;
  } else if (type === "profile") {
    return <Profile {...props} />;
  } else {
    return <div>hata</div>;
  }
}
