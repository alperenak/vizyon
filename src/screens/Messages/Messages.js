import React, { Component, useCookies } from "react";

/*** Styles ***/
import styles from "./Messages.module.scss";

/*** Icons ***/
import noQuestionIllustration from "../../assets/icons/illustration_1.svg";
import addCircle from "../../assets/icons/Icons_add-circle.svg";
import teacherAvatar from "../../assets/images/teacherAvatar.png";

/*** Utils ***/

/*** Components ***/
import Message from "../../components/Message/Message";
import { getCookie } from "../../utils/cookie";
import backButton from "../../assets/icons/Chevron-right.svg";
import detailsIcon from "../../assets/icons/three-dots-more-indicator.svg";
import addFile from "../../assets/icons/add-file.svg";
import sendButton from "../../assets/icons/send-button.svg";
import mailIcon from "../../assets/icons/mail_blue.png";
import DragDrop from "../../components/Card/DragDrop/dragDrop";
import MessageSingle from "../../components/MessageSingle/MessageSingle";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import {
  CreateNewChat,
  GetConversations,
  GetMessageDetails,
  GetToken,
  GetUser,
  SearchChat,
  SendMessage,
} from "../../actions/action";
import { convertHourMinute, GetUserId } from "../../utils/utils";
import { TimesSolid } from "../../icons";
import Loading from "../../components/Loading/loading";
class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      tabsType: "messages",
      userId: "",
      messages: [],
      userData: [],
      role: "loading",
      dentists: [],
      files: [],
      path: null,
      conversationId: null,
      sender: {
        name: "Erhan Koca",
        clinic: "Medicana Hospitals Group",
        avatar: "https://picsum.photos/200",
        onlineStatus: false,
      },
      messageToSend: "",
    };
  }

  componentDidMount = async () => {
    const path = this.props.location.pathname.split("/messages/");
    let gettedUserId = GetUserId(getCookie("token"));
    const userId = this.props.match.params.id;
    this.setState({ path: path[1], userId: userId });
    console.log(this.state.userId);
    let res = await GetConversations(gettedUserId, getCookie("token"));
    this.setState({ messages: res.data.data });
    GetUser(getCookie("token")).then((data) => {
      this.setState({
        userData:
          data.data.data.role === "instructor"
            ? data.data.data.instructorInfo.classes
            : data.data.data.studentInfo.class.courses,
      });
      this.setState({ role: data.data.data.role });
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  getTeacherName = (instructor) => {
    if (instructor && instructor !== null) {
      return `${instructor.first_name} ${instructor.last_name}`;
    } else return "Öğretmen adı bilgisi bulunamadı";
  };
  getBranchName = (course) => {
    if (course && course !== null && course.name && course.name !== null) {
      return course.name;
    } else return "none";
  };
  onSendMessage = () => {
    let d = new Date();
    let message = {
      isMine: true,
      time: convertHourMinute(d),
      date: "07.10.2020",
      message: this.state.messageToSend,
      token: GetToken(),
    };

    this.setState({
      singleMessages: [...this.state.singleMessages, message],
      messageToSend: "",
    });
  };

  renderNoQuestion = () => {
    let { search, messages, userData } = this.state;
    return (
      <>
        <div className={styles.tabs}>
          <div
            className={`${styles.tabsButton} ${
              this.state.tabsType === "student" ? styles.tabsButtonActive : ""
            }`}
            onClick={() => this.setState({ tabsType: "student" })}
          >
            {this.state.role === "loading"
              ? ""
              : this.state.role === "instructor"
              ? "Sınıflar"
              : "Öğretmenler"}
          </div>
          <div
            className={`${styles.tabsButton} ${
              this.state.tabsType === "messages" ? styles.tabsButtonActive : ""
            }`}
            onClick={() => this.setState({ tabsType: "messages" })}
          >
            Mesajlarım
          </div>
        </div>
        {this.state.tabsType === "messages" ? (
          <div className={styles.container}>
            <h1>Mesajlar</h1>
            <div className={styles.searchSection}>
              <input
                type="text"
                name="search"
                value={search}
                onChange={this.onChange}
                placeholder="Kullanıcı ara"
              />
            </div>

            {getCookie("user_type") === "user" && (
              <div
                className={styles.newMessageBtn}
                onClick={() => (window.location = "/messages/new")}
              >
                <img src={addCircle} alt="" />
                <div>Yeni Mesaj</div>
              </div>
            )}

            <div className={styles.messagesSection}>
              <div className={styles.messagesSectionInner}>
                <div className={styles.header}>Mesajlar</div>
                <div className={styles.messageContainer}>
                  {messages.map((message, i) => {
                    return (
                      <Message
                        image={message?.contact.profile_photo}
                        title={`${message?.contact.first_name} ${message?.contact.last_name}`}
                        content={message?.lastMessage.body}
                        time={message?.lastMessage.createdAt}
                        key={i}
                        id={message.id}
                        unread={message.unread}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.usersContainer}>
            {userData && userData.length !== 0
              ? userData.map((item) => {
                  console.log(item);
                  return (
                    <div className={styles.teachersLabel}>
                      <div className={styles.avatar}>
                        <img
                          src={
                            item.instructor !== null && item.instructor
                              ? item.instructor.profile_photo
                                ? item.instructor.profile_photo.includes("http")
                                  ? item.instructor.profile_photo
                                  : teacherAvatar
                                : teacherAvatar
                              : teacherAvatar
                          }
                        />
                      </div>
                      <div className={styles.teacherInfo}>
                        <div
                          onClick={() =>
                            this.props.history.push(
                              `/messages/new/${item.instructor?._id}`
                            )
                          }
                          className={styles.name}
                        >
                          {this.state.role === "instructor"
                            ? item.name
                            : this.getTeacherName(item.instructor)}
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        )}
      </>
    );
  };

  renderNewQuestion = () => {};

  renderMainList = () => {
    let { search, messages, userData } = this.state;

    return (
      <>
        <div className={styles.tabs}>
          <div
            className={`${styles.tabsButton} ${
              this.state.tabsType === "student" ? styles.tabsButtonActive : ""
            }`}
            onClick={() => this.setState({ tabsType: "student" })}
          >
            {this.state.role === "loading"
              ? ""
              : this.state.role === "instructor"
              ? "Öğrenciler"
              : "Öğretmenler"}
          </div>
          <div
            className={`${styles.tabsButton} ${
              this.state.tabsType === "messages" ? styles.tabsButtonActive : ""
            }`}
            onClick={() => this.setState({ tabsType: "messages" })}
          >
            Mesajlarım
          </div>
        </div>
        {this.state.tabsType === "messages" ? (
          <div className={styles.container}>
            <h1>Mesajlar</h1>
            <div className={styles.searchSection}>
              <input
                type="text"
                name="search"
                value={search}
                onChange={this.onChange}
                placeholder="Kullanıcı ara"
              />
            </div>

            {getCookie("user_type") === "user" && (
              <div
                className={styles.newMessageBtn}
                onClick={() => (window.location = "/messages/new")}
              >
                <img src={addCircle} alt="" />
                <div>Yeni Mesaj</div>
              </div>
            )}

            <div className={styles.messagesSection}>
              <div className={styles.messagesSectionInner}>
                <div className={styles.header}>Mesajlar</div>
                <div className={styles.messageContainer}>
                  {messages.map((message, i) => {
                    return (
                      <Message
                        image={message?.contact.profile_photo}
                        title={`${message?.contact.first_name} ${message?.contact.last_name}`}
                        content={message?.lastMessage.body}
                        time={message?.lastMessage.createdAt}
                        key={i}
                        id={message.id}
                        unread={message.unread}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.usersContainer}>
            {userData && userData.length !== 0
              ? userData.map((item) => {
                  return (
                    <div className={styles.teachersLabel}>
                      <div className={styles.avatar}>
                        <img
                          src={
                            item.instructor !== null && item.instructor
                              ? item.instructor.profile_photo
                                ? item.instructor.profile_photo.includes("http")
                                  ? item.instructor.profile_photo
                                  : teacherAvatar
                                : teacherAvatar
                              : teacherAvatar
                          }
                        />
                      </div>
                      <div className={styles.teacherInfo}>
                        <div
                          onClick={() =>
                            this.props.history.push(
                              `/messages/new/${
                                this.state.role === "instructor"
                                  ? item._id
                                  : item.instructor?._id
                              }`
                            )
                          }
                          className={styles.name}
                        >
                          {this.state.role === "instructor"
                            ? item.name
                            : this.getTeacherName(item.instructor)}
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        )}
      </>
    );
  };

  render() {
    let { messages } = this.state;
    console.log(this.state.messages);

    return (
      <div className={styles.Wrapper}>
        {messages.length === 0
          ? this.renderNoQuestion()
          : this.renderMainList()}
      </div>
    );
  }
}

export default Messages;
