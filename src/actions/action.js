import axios from "axios";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import http from "../helpers/httpHelper";
import config from "../appConfig";
const uri = "https://gelisim.herokuapp.com/api/v1";
const location = window.location;
const errorMessageBuilder = (response) => {
  return (response.errorData && response.errorData.code) || "0";
};
export async function GetAuthentication(username, password) {
  // axios
  //   .post("https://gelisim-okullari.herokuapp.com/api/v1/auth/login", {
  //     username: username,
  //     password: password,
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     return data;
  //   });
  const response = await fetch(`${uri}/auth/login`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ username: username, password: password }), // body data type must match "Content-Type" header
  });
  return response.json();
}
export async function UpdateAnnouncements(
  id,
  title,
  detail,
  to,
  isPublic,
  token
) {
  console.log("id", to);
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  let arr = [];
  to.map((item) => {
    arr.push(item._id);
  });
  const response = await axios.put(
    `${uri}/announcements/${id}`,
    {
      title: title,
      detail: detail,
      public: arr.length === 0 ? true : false,
      to: arr,
    },
    config
  );
  return response;
}
export async function DeleteAnnouncements(id, token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${uri}/announcements/${id}`, config);
  return response;
}

export async function AddAnnouncements(title, detail, ispublic, to, token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${uri}/announcements`,
    {
      title: title,
      detail: detail,
      public: ispublic,
      to: to,
    },
    config
  );
  return response;
}

export async function GetUser(token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(`${uri}/auth/me`, config);
  return response;
}
export function GetToken() {
  const [cookies, setCookies] = useCookies(["token"]);
  return cookies.token;
}

export async function GetAnnouncements(limit, page, token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(
    `${uri}/announcements?limit=${limit}&page=${page}`,
    config
  );

  return response;
}
export async function GetAnnouncementsStudent(token, classId) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(`${uri}/announcements?classId=${classId}`, config);

  return response;
}
export async function GetStorage(token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(`${uri}/storage`, config);

  return response;
}
export function IsAuth(token) {
  if (token) {
    return true;
  } else {
    return false;
  }
}

export async function GetSSO(token, appId) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(`${uri}/gelisim-sso/app/${appId}`, config);
  return response;
}

export default function IsAdmin(data, setCookies = false) {
  if (data.data.data.role && data.data.data.role === "admin") {
    location.replace("/admin/announcements");
    if (setCookies) {
      setCookies("admin", true);
    }
  }
}
export function IsRoleAdmin() {
  const token = GetToken();
  GetUser(token).then((data) => {
    if (data.data.data.role && data.data.data.role === "admin") {
      return true;
    } else return false;
  });
}

export async function getAllClass(token, limit = 20, page = 1) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${uri}/classes?limit=${limit}&page=${1}`,
    config
  );
  return response;
}
export async function updateClass(token, classId, name) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${uri}/classes/${classId}`,
    { name: name },
    config
  );
  return response;
}
export async function deleteClass(token, classId) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${uri}/classes/${classId}`, config);
  return response;
}
export async function addClass(token, instructorId, classesName) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${uri}/classes`,
    { name: classesName, instructor: instructorId },
    config
  );
  return response;
}
export function getAllUser(token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(`${uri}/users`, config);
  return response;
}

export async function CreateUser(
  token,
  firstname,
  lastname,
  username,
  phone,
  role,
  gender
) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${uri}/users`,
    {
      first_name: firstname,
      last_name: lastname,
      username: username,
      phone: phone,
      gender: gender,
      role: role,
    },
    config
  );
  return response;
}
export async function updateUser(
  token,
  firstname,
  lastname,
  username,
  phone,
  userId
) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${uri}/users/${userId}`,
    {
      first_name: firstname,
      last_name: lastname,
      username: username,
      phone: phone,
    },
    config
  );
  return response;
}
export async function deleteUser(token, userId) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${uri}/users/${userId}`, config);
  return response;
}
export async function importSchedule(token, file) {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  };
  console.log("gelen", file);

  const response = await axios.put(`${uri}/classes/import`, file, config);
  return response;
}
export async function getAppsLog(
  token,
  start = "",
  startAt = "",
  endAt = "",
  limit = 99,
  userId = "",
  classId = ""
) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${uri}/logs/app-logs?from=${startAt}&until=${endAt}&limit=${limit}&start=${start}&order=asc&user=${userId}&role=student&class=${classId}
    `,
    config
  );
  return response;
}
export async function GetSyllabusDownloadLink(token, classId) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${uri}/classes/schedule-xls/${classId}`,
    config
  );
  return response;
}
export async function GetSchedulesDownloadLink(token, classId) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${uri}/classes/exams-xls/${classId}`,
    config
  );
  return response;
}
export async function GetAllExams(token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${uri}/classes/exams`, config);
  return response;
}
export async function UpdateExam(
  token,
  classId,
  examId,
  date,
  duration,
  courseId
) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${uri}/classes/${classId}/exams/${examId}`,
    {
      course: courseId,
      date: date,
      duration: duration,
    },
    config
  );
  return response;
}
export async function CreateExam(token, classId, date, duration, courseId) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${uri}/classes/${classId}/exams`,
    {
      course: courseId,
      date: date,
      duration: duration,
    },
    config
  );
  return response;
}
export async function DeleteExam(token, classId, examId) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(
    `${uri}/classes/${classId}/exams/${examId}`,
    config
  );
  return response;
}
export async function GetAllCourses(token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${uri}/courses?page=${1}&limit=${100}`,
    config
  );
  return response;
}
export async function GetAllApps(token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${uri}/apps`, config);
  return response;
}
export async function GetSpecifiApps(token, grade) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${uri}/apps?grade=${grade}`, config);
  return response;
}
export async function SaveSpecificApps(token, data) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${uri}/apps/usage`, data[0], config);
  return response;
}
export async function GetConversations(token) {
  // let baseUrl = config.baseUrl;
  // let tokenCookieName = "token";
  // let path = `/chat/conversation`;

  // return await http.makeGetRequest(
  //   path,
  //   baseUrl,
  //   tokenCookieName,
  //   errorMessageBuilder
  // );
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(`${uri}/chat/conversation`, config);
}
export async function GetNewMessages(token) {
  // let baseUrl = config.baseUrl;
  // let tokenCookieName = "token";
  // let path = `/chat/new`;

  // return await http.makeGetRequest(
  //   path,
  //   baseUrl,
  //   tokenCookieName,
  //   errorMessageBuilder
  // );
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(`${uri}/chat/new`, config);
}

export async function GetMessageDetails({ conversationID, token }) {
  // let baseUrl = config.baseUrl;
  // let tokenCookieName = "token";
  // let path = `/chat/conversation/${conversationID}`;

  // return await http.makeGetRequest(
  //   path,
  //   baseUrl,
  //   tokenCookieName,
  //   errorMessageBuilder
  // );
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(`${uri}/chat/conversation/${conversationID}`, config);
}
export async function SendMessage({
  conversationID,
  receiver,
  body,
  attachements,
  token,
}) {
  // let baseUrl = config.baseUrl;
  // let tokenCookieName = "token";
  // let path = `/chat/conversation/${conversationID}`;
  // let payload = { receiver, body, attachements };

  // return await http.makePostRequest(
  //   path,
  //   baseUrl,
  //   tokenCookieName,
  //   payload,
  //   errorMessageBuilder
  // );
  let payload = { receiver, body, attachements };
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${uri}/chat/conversation/${conversationID}`,
    payload,
    config
  );
  return response;
}
export async function CreateNewChat(payload, token) {
  // let baseUrl = config.baseUrl;
  // let tokenCookieName = "token";
  // let path = `/chat/conversation`;

  // return await http.makePostRequest(
  //   path,
  //   baseUrl,
  //   tokenCookieName,
  //   payload,
  //   errorMessageBuilder
  // );
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.post(`${uri}/chat/conversation/`, payload, config);
}
export async function SearchChat({ keyword, token }) {
  // let baseUrl = config.baseUrl;
  // let tokenCookieName = "token";
  // let path = `/chat/search?keyword=${keyword}`;

  // return await http.makeGetRequest(
  //   path,
  //   baseUrl,
  //   tokenCookieName,
  //   errorMessageBuilder
  // );
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(`${uri}/chat/search?keyword=${keyword}/`, config);
}
