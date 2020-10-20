import React, { useState } from "react";

/*** Styles ***/
import styles from "./message.scss";

const Message = ({ image, title, content, time, id, unread }) => {
  const [unreadMessages, setUnreadMessages] = useState(styles.bold);

  return (
    <div
      className={styles.message_container}
      onClick={() => (window.location = `/messages/details/${id}`)}
    >
      <div className={styles.avatar}>
        <img src={image} alt="" />
        {unread && unread > 0 && <div className={styles.unread}>{unread}</div>}
      </div>

      <div className={styles.content}>
        <div className={styles.name}>{title}</div>
        <div
          className={`${styles.message} ${
            unread && unread > 0 && unreadMessages
          }`}
        >
          {content}
        </div>
      </div>
      <div className={styles.time}>{`${new Date(time).getHours()}:${new Date(
        time
      ).getMinutes()}`}</div>
    </div>
  );
};

export default Message;
