import "../css/Main.css";
import React, { useEffect, useState } from "react";
import { VscEdit } from "react-icons/vsc";
import swal from "sweetalert";

const Main = (props) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const view = (arr) => {
    let item = arr[0];
    if (item !== undefined || null) {
      setTitle(item.title);
      setDate(props.makeDateFormat(item.date, "all"));
      setValue(item.value);
    } else {
      setTitle("");
      setDate(null);
      setValue("");
      return null;
    }
  };

  useEffect(() => {
    if (props.selected === undefined) {
      return null;
    }
    view(props.selected);
  }, [props.selected]);

  let editData = { newTitle: "", newValue: "" };

  const editModal = (prevValue) => {
    swal({
      title: "Do you want edit your Idea?",
      text: "Please input new title",
      buttons: ["Cancel", "Done"],
      content: {
        element: "input",
        attributes: {
          value: prevValue[0].title,
          maxLength: 15,
        },
      },
    })
      .then((result) => {
        if (result === null) {
          setIsOpen(false);
          return null;
        }
        editData.newTitle = result;
        swal({
          className: "editInputArea",
          title: "Do you want edit your Idea?",
          text: "Please input new value",
          buttons: {
            cancel: {
              text: "Cancel",
              value: null,
              visible: true,
              className: "",
              closeModal: true,
            },
            confirm: {
              text: "OK",
              value: true,
              visible: true,
              className: "",
              closeModal: true,
            },
          },
          content: {
            element: "textarea",
            attributes: {
              value: prevValue[0].value,
            },
          },
        })
          .then((result) => {
            let textareaValue = document.querySelector(
              ".swal-content__textarea"
            ).value;

            if (!result) {
              setIsOpen(false);
              props.createErrorModal("You have canceled editing a note.");
              return null;
            }

            editData.newValue = textareaValue;

            let temp = [...props.memo];

            temp.find((v) => v.isSelect === true).title = editData.newTitle;
            temp.find((v) => v.isSelect === true).value = editData.newValue;
            temp.find((v) => v.isSelect === true).date = new Date();

            props.setMemo(temp);
            props.saveStorage(temp);

            setIsOpen(false);
            swal({
              text: "Successfully recorded the idea ✅✅",
              icon: "success",
              button: "Check!",
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Main">
      {isOpen ? editModal(props.selected) : null}
      <section className="head">
        <section className="titleZone">
          <h2 className="mainTextTitle">{title}</h2>
        </section>
        <section className="sub">
          <p className="time">last edited : {date}</p>
          <p className="line">|</p>
          <VscEdit
            className="editBtn"
            onClick={() => {
              if (title === "") {
                swal({
                  icon: "warning",
                  text: "Please create a note first",
                  buttons: {
                    cancel: "OK",
                    confirm: "Create",
                  },
                }).then((result) => {
                  if (result === null) {
                    return null;
                  }
                  props.openModal();
                });
                return null;
              }
              setIsOpen((v) => !v);
            }}
          />
        </section>
      </section>
      <section className="body">
        <p className="noteValue">{value}</p>
      </section>
    </div>
  );
};

export default Main;
