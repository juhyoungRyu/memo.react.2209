import "./App.css";
import Nav from "./Components/Nav";
import Main from "./Components/Main";
import swal from "sweetalert";
import React, { useState, useEffect } from "react";

const App = () => {
  const KEY = "@MEMO";

  const [memo, setMemo] = useState(() => {
    if (typeof window != "undefined") {
      const saved = window.localStorage.getItem(KEY);
      if (saved !== null) {
        return JSON.parse(saved);
      } else {
        return [
          // {
          //   date: new Date(),
          //   title: "테스트용 값입니다.",
          //   value:
          //     "이 값은 현재 테스트를 진행중인 값이며 db에 저장된 값이 아닙니다",
          //   key: 1,
          //   isSelect: true,
          // },
          // {
          //   date: new Date(),
          //   title: "이주연 최고",
          //   value: "이주연은 정말 최고야!",
          //   key: 2,
          //   isSelect: false,
          // },
        ];
      }
    }
  });

  // useEffect(() => {
  //   const checkMemo = () => {
  //     const tempMemo = localStorage.getItem(KEY);
  //     if (tempMemo) {
  //       setMemo(tempMemo);
  //       console.log("memo loading");
  //     }

  //     window.addEventListener("storage", checkMemo);
  //   };
  //   return () => {
  //     window.removeEventListener("storage", checkMemo);
  //   };
  // }, []);

  const [isOpen, setIsOpen] = useState(false);
  let newIdea = {};

  const openModal = () => {
    setIsOpen((isOpen) => !isOpen);
    newIdea = { title: "", value: "", date: new Date(), isSelect: false };
  };

  const createErrorModal = (text) => {
    swal({
      icon: "error",
      text: text,
    });
  };

  const saveStorage = (arr) => {
    localStorage.setItem(KEY, JSON.stringify(arr));
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
                  placeholder:
                    "Input your New idea's title (maximun 15 letter)",
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
                }).then((result) => {
                  let textareaValue = document.querySelector(
                    ".swal-content__textarea"
                  ).value;
                  if (result === true) {
                    // 두 번째 모달에서 Done이었을 경우
                    newIdea.value = textareaValue;
                    if (!memo) {
                      console.log("memo가 없다면");
                      setMemo([]);
                    }
                    let temp = [...memo];
                    temp[temp.length] = {
                      date: new Date(),
                      title: newIdea.title,
                      value: newIdea.value,
                      key: temp[temp.length - 1]
                        ? temp[temp.length - 1].key + 1
                        : 0,
                      isSelect: temp[temp.length - 1] ? false : true,
                    };
                    setMemo(temp);
                    saveStorage(temp);
                    setIsOpen(false);
                    swal({
                      text: "Successfully recorded the idea ✅✅",
                      icon: "success",
                      button: "Check!",
                    });
                  } else {
                    // 두 번째 모달에서 Cancel이었을 경우
                    createErrorModal("You have canceled writing a note.");
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
