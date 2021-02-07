import React, { Component } from "react";

import styles from "./messages.scss";

import mailIcon from "../../icons/mail_blue.png";

import DragDrop from "../../components/DrapDrop/dragDrop";
import store from "../../store";

class NewMessage extends Component {
  state = { dentist: "", message: "", files: null, searchResults: null };

  onSubmit = async () => {
    let { message, files } = this.state;
    let formData = new FormData();
    formData.append("attachements", files[0]);

    formData.append("receiver", {
      id: "5f6eae3f8cf83c51024768b1",
      userType: "dentist",
    });

    formData.append("body", message);

    await store.CreateNewChat(formData);
  };

  onFileChange = async (file) => {
    await this.setState({ files: { ...this.state.files, file } });
  };

  onChange = async (e) => {
    let { dentist } = this.state;

    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === "dentist") {
      let res = await store.SearchChat({ keyword: dentist });
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

export default NewMessage;
