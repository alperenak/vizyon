import React from "react";

/*** Styles ***/
import styles from "./messagesingle.scss";

const MessageSingle = ({ message, sender }) => {
  return (
    <div
      className={`${styles.messageContainer} ${
        message.isMine ? styles.isMine : styles.notMine
      }`}
    >
      {!message.isMine ? (
        <div className={styles.avatar}>
          <img src={sender.avatar} alt="" />
        </div>
      ) : (
        ""
      )}

      <div
        className={`${styles.messageBody} ${
          message.isMine ? styles.isMine : styles.notMine
        }`}
      >
        <div className={`${styles.message}`}>{message.body}</div>

        <div className={styles.time}>{`${new Date(
          message.createdAt
        ).getHours()}:${new Date(message.createdAt).getMinutes()}`}</div>
      </div>
    </div>
  );
};

export default MessageSingle;
