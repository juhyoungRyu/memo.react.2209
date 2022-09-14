import "./App.css";
import Nav from "./Components/Nav";
import Main from "./Components/Main";
import swal from "sweetalert";
import React, { useState } from "react";

const App = () => {
  const KEY = "@MEMO";

  const [memo, setMemo] = useState(() => {
    if (typeof window != "undefined") {
      const saved = window.localStorage.getItem(KEY);
      if (saved !== null) {
        return JSON.parse(saved);
      } else {
        return [
          {
            date: new Date(),
            title: "테스트용 값입니다.",
            value:
              "이 값은 현재 테스트를 진행중인 값이며 db에 저장된 값이 아닙니다",
            key: 1,
            isSelect: true,
          },
          {
            date: new Date(),
            title: "이주연 최고",
            value: "이주연은 정말 최고야!",
            key: 2,
            isSelect: false,
          },
        ];
      }
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  let newIdea = {};

  const openModal = () => {
    setIsOpen((isOpen) => !isOpen);
    newIdea = { title: "", value: "", date: new Date(), isSelect: false };
  };

  return (
    <div className="App">
      <Nav openModal={openModal} memo={memo} setMemo={setMemo} />

      <Main>
        {isOpen
          ? swal({
              title: "Do you have new Ideas?",
              buttons: ["Cancel", "Done"],
              content: {
                element: "input",
                attributes: {
                  placeholder: "Input your Idea's Title",
                  maxLength: 15,
                },
              },
            }).then((result) => {
              // 첫 모달에서 Done이었을 경우
              if (result !== null) {
                newIdea.title = result;
                swal({
                  className: "swalInputArea",
                  title: "Do you have new Ideas?",
                  // buttons: ["Cancel", "Done"],
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
                      placeholder: "Input your Idea",
                    },
                  },
                })
                  .then((result) => {
                    // 두 번째 모달에서 Done이었을 경우
                    let textareaValue = document.querySelector(
                      ".swal-content__textarea"
                    ).value;
                    if (result !== null) {
                      newIdea.value = textareaValue;
                      let temp = [...memo];
                      temp[temp.length] = {
                        date: new Date(),
                        title: newIdea.title,
                        value: newIdea.value,
                        key: temp[temp.length - 1].key + 1,
                        isSelect: false,
                      };
                      setMemo(temp);
                    } else {
                      // 두 번째 모달에서 Cancel이었을 경우
                      swal.close();
                    }
                  })
                  .then((result) => {
                    if (result === undefined) {
                      swal({
                        text: "Successfully recorded the idea ✅✅",
                        icon: "success",
                        button: "Check!",
                      });
                    } else {
                      // 첫 모달에서 cancel이었을 경우
                      swal.close();
                    }
                  });
              }
            })
          : null}
      </Main>
    </div>
  );
};

export default App;
