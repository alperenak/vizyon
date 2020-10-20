import React, { Component } from "react";

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
import {
  CreateNewChat,
  GetConversations,
  GetMessageDetails,
  GetToken,
  SearchChat,
  SendMessage,
} from "../../actions/action";
class Messages extends Component {
  state = {
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

  componentDidMount = async () => {
    const path = this.props.location.pathname.split("/messages/");

    this.setState({ path: path[1] });

    let res = await GetConversations(GetToken());
    this.setState({ messages: res.data });
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
        <div className={styles.searchSection}>
          <input
            type="text"
            name="search"
            value={search}
            onChange={this.onChange}
            placeholder="Search messages or user"
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
          <div className={styles.header}>Messages</div>
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

export class MessageDetails extends Component {
  state = {
    conversationID: null,
    singleMessages: [],
    sender: {},
    messageToSend: "",
  };
  componentDidMount = async () => {
    let conversationID = this.props.match.params.id;

    this.setState({ conversationID });

    await this.getMessageDetails();
  };

  getMessageDetails = async () => {
    let conversationID = this.props.match.params.id;

    let res = await GetMessageDetails({ conversationID, token: GetToken() });

    this.setState({
      singleMessages: res.data.messages,
      sender: res.data.contact,
    });
  };

  onSendMessage = async () => {
    let { conversationID, messageToSend, sender } = this.state;
    let receiver = { id: sender.id, userType: sender.userType };

    await SendMessage({
      conversationID,
      receiver,
      body: messageToSend,
      attachements: [],
      token: GetToken(),
    });

    await this.getMessageDetails();
    this.setState({ messageToSend: "" });

    var list = document.getElementById("list");
    list.scrollTop = list.offsetHeight;
  };

  onChange = (e) => {
    this.setState({ messageToSend: e.target.value });
  };

  render() {
    let { sender, singleMessages } = this.state;

    return (
      <div className={styles.messageDetailsContainer}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <img src={sender?.avatar} alt="" />
            <div
              className={sender?.onlineStatus ? styles.online : styles.offline}
            ></div>
          </div>

          <div className={styles.senderInfo}>
            <div className={styles.name}>{sender?.name}</div>
            {/* <div className={styles.clinicName}> {sender.clinic} </div> */}
          </div>

          <div className={styles.rightButtons}>
            <div
              className={styles.backButton}
              onClick={() => (window.location = "/messages")}
            >
              <img src={backButton} alt="" />
              <div className={styles.text}> Back </div>
            </div>

            <div className={styles.detailsButton}>
              <img src={detailsIcon} alt="" />
            </div>
          </div>
        </div>

        <div className={styles.messagesContainer} id="list">
          {singleMessages.length > 0 &&
            singleMessages.map((message, i) => {
              if (message.isMine)
                return <MessageSingle message={message} key={i} />;
              else
                return (
                  <MessageSingle message={message} sender={sender} key={i} />
                );
            })}
        </div>

        <div className={styles.sendMessageContainer}>
          <div className={`${styles.leftIcon} ${styles.icon}`}>
            <img src={addFile} alt="" />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="messageToSend"
              onChange={this.onChange}
              value={this.state.messageToSend}
            />
          </div>

          <div
            className={`${styles.rightIcon} ${styles.icon}`}
            onClick={this.onSendMessage}
          >
            <img src={sendButton} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export class NewMessage extends Component {
  state = { dentist: "", message: "", files: null, searchResults: null };

  onSubmit = async () => {
    let { dentist, message, files } = this.state;
    let formData = new FormData();
    formData.append("attachements", files[0]);

    formData.append("receiver", {
      id: "5f6eae3f8cf83c51024768b1",
      userType: "dentist",
    });

    formData.append("body", message);

    await CreateNewChat(formData, GetToken());
  };

  onFileChange = async (file) => {
    await this.setState({ files: { ...this.state.files, file } });
    console.log(this.state.files);
  };

  onChange = async (e) => {
    let { dentist } = this.state;

    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === "dentist") {
      let res = await SearchChat({ keyword: dentist });
      this.setState({ searchResults: res.data });
    }
  };

  render() {
    let { dentist, message } = this.state;
    return (
      <div className={styles.newQuestionContainer}>
        <div className={styles.headerSection}>
          <div className={styles.icon}>
            <img src={mailIcon} alt="" />
          </div>
          <div className={styles.header}>
            Choose a dentist or clinic and send a message!
          </div>
          <div className={styles.content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem illo debitis voluptatibus, sunt non nihil veniam
            aperiam eligendi nesciunt libero iure aliquid magnam error!
          </div>
        </div>
        <div className={styles.mainSection}>
          <div className={styles.inputWrapper}>
            <label htmlFor="dentist">Dentist or Clinic</label>
            <input
              type="text"
              name="dentist"
              placeholder="Florya Hospi"
              value={dentist}
              onChange={this.onChange}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="dentist">Your Message</label>
            <textarea
              name="message"
              value={message}
              onChange={this.onChange}
            ></textarea>
          </div>

          <label htmlFor="dentist">Photo For Treatment (optional) </label>
          <DragDrop onFileChange={this.onFileChange} />

          <button className={styles.sendMessageButton} onClick={this.onSubmit}>
            Send message
          </button>
        </div>
      </div>
    );
  }
}
