import React, { useState } from "react";
import { convertHourMinute } from "../../utils/utils";

/*** Styles ***/
import "./message.scss";

const Message = ({ image, title, content, time, id, unread }) => {
  const [unreadMessages, setUnreadMessages] = useState("bold");

  return (
    <div
      className="messageContainer"
      onClick={() => (window.location = `/messages/details/${id}`)}
    >
      <div className="messageContainer__avatar">
        <img src={image} alt="" />
        {unread && unread > 0 ? (
          <div className="messageContainer__avatar__unread">
            {unread !== 0 || unread !== "0" ? unread : ""}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="messageContainer__content">
        <div className={"messageContainer__content__name"}>{title}</div>
        <div
          className={`${"messageContainer__content__message"} ${
            unread && unread > 0 && unreadMessages
          }`}
        >
          {content}
        </div>
      </div>
      <div className={"messageContainer__time"}>{`${convertHourMinute(
        new Date(time)
      )}`}</div>
    </div>
  );
};

export default Message;
