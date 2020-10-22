import React, { Component, useCookies } from "react";

/*** Styles ***/
import styles from "./Messages.module.scss";

/*** Icons ***/
import noQuestionIllustration from "../../assets/icons/illustration_1.svg";
import addCircle from "../../assets/icons/Icons_add-circle.svg";

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
  SearchChat,
  SendMessage,
} from "../../actions/action";
class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      messages: [],
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
    this.setState({ path: path[1] });
    let res = await GetConversations(getCookie("token"));
    this.setState({ messages: res.data.data });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSendMessage = () => {
    let message = {
      isMine: true,
      time: new Date().getHours() + ":" + new Date().getMinutes(),
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
    return (
      <div className={styles.noQuestionContainer}>
        <img src={noQuestionIllustration} alt="" />
        <div className={styles.title}> There is no question.</div>
        <button>Ask questions now!</button>
      </div>
    );
  };

  renderNewQuestion = () => {};

  renderMainList = () => {
    let { search, messages } = this.state;

    return (
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
                    image={message?.contact.avatar}
                    title={message?.contact.name}
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
    );
  };

  render() {
    let { messages } = this.state;

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
