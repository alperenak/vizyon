import React, { Component } from "react";

import styles from "./Messages.module.scss";

import backButton from "../../assets/icons/Chevron-right.svg";
import addFile from "../../assets/icons/add-file.svg";
import sendButton from "../../assets/icons/send-button.svg";

import {
  CreateNewChat,
  GetMessageDetails,
  GetNewMessageDetail,
  SendMessage,
} from "../../actions/action";

import MessageSingle from "../../components/MessageSingle/MessageSingle";
import { getCookie } from "../../utils/cookie";
import { GetUserId } from "../../utils/utils";

class MessageDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversationID: null,
      singleMessages: [],
      sender: {},
      messageToSend: "",
    };
  }

  componentDidMount = async () => {
    let conversationID = this.props.match.params.id;

    this.setState({ conversationID });

    await this.getMessageDetails();
  };

  getMessageDetails = async () => {
    let conversationID = this.props.match.params.id;
    let pathname = window.location.pathname;
    if (!pathname.includes("new")) {
      let res = await GetMessageDetails(conversationID, getCookie("token"));
      this.setState({
        singleMessages: res.data.data.messages,
        sender: res.data.data.contact,
      });
    } else if (pathname.includes("new")) {
      let gettedUserId = GetUserId(getCookie("token"));
      let res = await GetNewMessageDetail(
        conversationID,
        gettedUserId,
        getCookie("token")
      );
      this.setState({
        singleMessages: res.data.data.messages,
        sender: res.data.data.contact,
      });
    }
  };

  onSendMessage = async () => {
    let { messageToSend, sender } = this.state;
    let conversationID = this.props.match.params.id;
    let receiver = sender.id;
    let pathname = window.location.pathname;

    if (pathname.includes("new")) {
      let payload = {
        receiver: conversationID,
        body: messageToSend,
        attachements: [],
      };
      let postNew = await CreateNewChat(payload, getCookie("token"));
      this.setState({
        singleMessages: postNew.data.data.messages,
        sender: postNew.data.data.contact,
      });
      await this.getMessageDetails();
      this.setState({ messageToSend: "" });
    } else {
      let payload = {
        conversationID: conversationID,
        receiver: receiver,
        body: messageToSend,
        attachements: [],
      };
      await SendMessage({
        payload: payload,
        token: getCookie("token"),
      });
      await this.getMessageDetails();
      this.setState({ messageToSend: "" });
    }
    var list = document.getElementById("list");
    list.scrollTop = list.offsetHeight;
  };

  onChange = (e) => {
    this.setState({ messageToSend: e.target.value });
  };

  render() {
    let { sender } = this.state;
    return (
      <div className={styles.MessagesDetailWrapper}>
        <div className={styles.messageDetailsContainer}>
          <div className={styles.header}>
            <div className={styles.avatar}>
              <img
                src={
                  sender?.profile_photo ? sender?.profile_photo : sender.avatar
                }
                alt=""
              />
              <div
                className={
                  sender?.onlineStatus ? styles.online : styles.offline
                }
              ></div>
            </div>

            <div className={styles.senderInfo}>
              <div className={styles.name}>{`${
                sender.first_name ? sender.first_name : sender.name
              } ${sender.last_name ? sender.last_name : ""}`}</div>
            </div>
            <div className={styles.rightButtons}>
              <div
                className={styles.backButton}
                onClick={() => (window.location = "/messages")}
              >
                <img src={backButton} alt="" />
                <div className={styles.text}> Geri </div>
              </div>
              {/* <div className={styles.detailsButton}>
                <img src={detailsIcon} alt="" />
              </div> */}
            </div>
          </div>
          <div className={styles.messagesContainer} id="list">
            {this.state.singleMessages.length > 0 &&
              this.state.singleMessages.map((message, i) => {
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
      </div>
    );
  }
}

export default MessageDetails;
