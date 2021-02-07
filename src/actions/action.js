import axios from "axios";
import { useCookies } from "react-cookie";
const uri = "https://gelisim.herokuapp.com/api/v1";
const location = window.location;

export async function GetAuthentication(username, password) {
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
  const [cookies] = useCookies(["token"]);
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

export async function getAllClass(token, limit = 100, page = 1, select) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${uri}/classes?limit=${limit}&page=${page}${
      select ? `&select=${select}` : ""
    }`,
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
export function getAllUser(token, keyword, role) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(
    `${uri}/users${
      keyword
        ? `?role=${role}&select=fullName,first_name,last_name,profile_photo,studentInfo&keyword=${keyword}`
        : ""
    }`,
    config
  );
  return response;
}
export function getAllUserByClass(token, classId) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(
    `${uri}/users?role=student&classId=${classId}`,
    config
  );
  return response;
}
export function getAllStudents(token, page, limit) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(
    `${uri}/users?role=student&limit=${limit ? limit : 100}&page=${
      page ? page : 1
    }`,
    config
  );
  return response;
}
export function getAllTeachers(token, page, limit) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(
    `${uri}/users?role=instructor&limit=${limit ? limit : 100}&page=${
      page ? page : 1
    }`,
    config
  );
  return response;
}

export async function CreateUser(token, payload) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${uri}/users`, payload, config);
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
export async function importSchedule(token, file, classId) {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  };

  const response = await axios.put(
    `${uri}/classes/${classId}/schedule`,
    file,
    config
  );
  return response;
}
export async function getAppsLog(
  token,
  start = "",
  startAt = "",
  endAt = "",
  limit = 99,
  userId = "",
  specialDate = "thisMonth",
  classId = ""
) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${uri}/logs/app-logs?from=${startAt}&until=${endAt}&limit=${limit}&start=${start}&order=asc&user=${userId}&specialDate=${specialDate}&role=student&class=${classId}
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
    `${uri}/classes/${classId}/schedule-xls/`,
    config
  );
  return response;
}
export async function GetSyllabusPdfDownloadLink(token, classId) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${uri}/classes/${classId}/schedule-pdf/`,
    config
  );
  return response;
}
export async function GetSchedulesDownloadLink(token, classId) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${uri}/classes/${classId}/exams-xls/`,
    config
  );
  return response;
}
export async function GetSchedulesPdfDownloadLink(token, classId) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${uri}/classes/${classId}/exams-pdf/`,
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
export async function GetConversations(userId, token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(`${uri}/chat/conversation?userId=${userId}`, config);
}
export async function GetNewMessages(token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(`${uri}/chat/new`, config);
}

export async function GetMessageDetails(conversationID, token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(`${uri}/chat/conversation/${conversationID}`, config);
}
export async function SendMessage({ payload, token }) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.post(`${uri}/chat/conversation/`, payload, config);
}
export async function CreateNewChat(payload, token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.post(`${uri}/chat/conversation/`, payload, config);
}
export async function SearchChat({ keyword, token }) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(`${uri}/chat/search?keyword=${keyword}/`, config);
}
export async function GetNewMessageDetail(contactID, userId, token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(
    `${uri}/chat/conversation?userId=${userId}&contactId=${contactID}`,
    config
  );
}
export async function GetConversationList(userId, token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(`${uri}/chat/conversation?userId=${userId}`, config);
}

export async function GetMicrosoftAssigments(token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(`${uri}/teams/assignments`, config);
}
export async function GetUsersbyClassesName(assignedClass, token) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.get(
    `${uri}/users?assignedClass=${assignedClass}`,
    config
  );
  return response;
}
export async function UpdateUserPassword(
  token,
  payload = { userId: "", oldPassword: "", newPassword: "" }
) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.post(`${uri}/auth/update-password`, payload, config);
  return response;
}
export async function UpdateUserPasswordWithAdmin(
  token,
  payload = { userId: "", newPassword: "" }
) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.post(
    `${uri}/auth/update-password-admin`,
    payload,
    config
  );
  return response;
}
export async function UpdateUserAppPassword(
  token,
  userId,
  passwordId,
  payload = {
    credentials: {
      username: "",
      password: "",
    },
    _id: "",
    app: "",
    user: "",
  }
) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.put(
    `${uri}/users/${userId}/password/${passwordId}`,
    payload,
    config
  );
  return response;
}
export async function GetUserAppPasswordsByPasswordId(
  token,
  userId,
  passwordId
) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(
    `${uri}/users/${userId}/password/${passwordId}`,
    config
  );
}
export async function GetUserAppPassword(token, userId) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(`${uri}/users/${userId}/password`, config);
}
export async function GetUserInformations(token, userId) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(`${uri}/users/${userId}`, config);
}
export async function GetGeneralLogs(token, userId, date) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(
    `${uri}/logs/app-logs?userId=${userId}&date=${date}`,
    config
  );
}
export async function GetClassLogs(token, classId, date) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(
    `${uri}/logs/app-logs?classId=${classId}&date=${date}`,
    config
  );
}
export async function GetDetailLogs(token, userId, date) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(
    `${uri}/logs/app-logs?userId=${userId}&date=${date}&detail=true`,
    config
  );
}
export async function GetClassDetailLogs(token, classId, date) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return await axios.get(
    `${uri}/logs/app-logs?classId=${classId}&date=${date}&detail=true`,
    config
  );
}
export async function UpdateUserInfo(
  token,
  userId,
  payload = {
    studentInfo: {
      class: {
        _id: "5fc59677a2b39930f4bf5f19",
        name: "5 E",
      },
      studentNumber: 182,
      school: "ORTOKUL",
    },
    role: "student",
    _id: "5fc59529c3d54336149b2fd7",
    fullName: "ECE ALPARSLAN",
    first_name: "ECE",
    last_name: "ALPARSLAN",
    username: "ece.alparslan@gelisimkoleji.k12.tr",
    createdAt: "2020-12-01T00:58:17.705Z",
    __v: 0,
    assignedClass: "5fc59677a2b39930f4bf5f19",
    profile_photo:
      "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png",
    id: "5fc59529c3d54336149b2fd7",
  }
) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.put(`${uri}/users/${userId}`, payload, config);
  return response;
}
export async function AddNewApp(
  token,
  payload = {
    user: "5fc06ca6d08c505e12fec7ff",
    credentials: {
      username: "ecrtosuner85589",
      password: "dunya123",
    },
  },
  appId
) {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = axios.post(
    `${uri}/gelisim-sso/app/${appId}`,
    payload,
    config
  );
  return response;
}
