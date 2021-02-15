import React from "react";
import { convertHourMinute } from "../../../../utils/utils";
import AlertBox from "../../../Alert/alert";
import { MessageCheck } from "../../../../icons";
import styles from "./newMessages.module.scss";
export default function NewMessages({ newMessagesData }) {
  return (
    <>
      <div className={styles.teachers}>
        <div className={styles.title}>
          Yeni Mesajlar ({newMessagesData.data?.data.total})
        </div>
        {newMessagesData.data?.data.total ? (
          <div className={styles.teachersSection}>
            {newMessagesData.data?.data.conversations.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${"messageContainer"} ${
                    styles.messagesContainer
                  }`}
                  onClick={() =>
                    (window.location = `/messages/details/${item.lastMessage.conversationId}`)
                  }
                >
                  <div className={`messageContainer__avatar ${styles.avatar}`}>
                    <img src={item.contact.profile_photo} alt="" />
                    {item.unread && item.unread > 0 && (
                      <div className="messageContainer__avatar__unread">
                        {item.unread}
                      </div>
                    )}
                  </div>
                  <div className="messageContainer__content">
                    <div className={"messageContainer__content__name"}>
                      {`${item.contact.first_name} ${item.contact.last_name}`}
                    </div>
                    <div
                      className={`${"messageContainer__content__message"} ${
                        item.unread && item.unread > 0 && item.lastMessage
                      }`}
                    >
                      {item.lastMessage.body}
                    </div>
                  </div>
                  <div className={"messageContainer__time"}>
                    {convertHourMinute(item.lastMessage.createdAt)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <AlertBox
            title={"Mesaj bilgisi bulunamadı"}
            type={"tertiary"}
            size={"small"}
          >
            <MessageCheck className={styles.MessageCheckIcon} />
          </AlertBox>
        )}
      </div>
    </>
  );
}
