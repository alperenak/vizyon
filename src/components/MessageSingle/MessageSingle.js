import React from "react";

const MessageSingle = ({ message, sender }) => {
  return (
    <div
      className={`${"messageContainer"} ${
        message.isMine
          ? "messageContainer__isMine"
          : "messageContainer__notMine"
      }`}
    >
      {!message.isMine ? (
        <div className="messageContainer__avatar">
          <img src={sender.profile_photo} alt="" />
        </div>
      ) : (
        ""
      )}

      <div
        className={`${"messageContainer__messageBody"} ${
          message.isMine
            ? "messageContainer__messageBody__isMine"
            : "messageContainer__messageBody__notMine"
        }`}
      >
        <div className={`${"messageContainer__messageBody__message"}`}>
          {message.body}
        </div>

        <div className={"messageContainer__messageBody__time"}>{`${new Date(
          message.createdAt
        ).getHours()}:${new Date(message.createdAt).getMinutes()}`}</div>
      </div>
    </div>
  );
};

export default MessageSingle;
