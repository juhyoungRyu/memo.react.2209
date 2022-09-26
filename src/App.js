import "./App.css";
import Nav from "./Components/Nav";
import Main from "./Components/Main";
import swal from "sweetalert";
import React, { useEffect, useState } from "react";

const App = () => {
  const KEY = "@MEMO";

  const [memo, setMemo] = useState(() => {
    if (typeof window != "undefined") {
      const saved = window.localStorage.getItem(KEY);
      if (saved !== null) {
        return JSON.parse(saved);
      } else {
        return [];
      }
    }
  });

  const [select, setSelect] = useState(() => {
    if (typeof window != "undefined") {
      const saved = window.localStorage.getItem(KEY);
      if (saved !== null) {
        let selectedMemo = JSON.parse(saved).filter(
          (item) => item.isSelect === true
        );
        return selectedMemo[0].key;
      } else {
        return 0;
      }
    }
  });

  useEffect(() => {
    return console.log(select);
  }, [memo]);

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

  const makeDateFormat = (date, returnValue) => {
    const OG = new Date(date);
    switch (returnValue) {
      case "all":
        return `${
          OG.getMonth() + 1
        }월${OG.getDate()}일 ${OG.getHours()}시${OG.getMinutes()}분`;

      // case "year":
      //   return OG.getFullYear();
      // case "month":
      //   return OG.getMonth();
      // case "day":
      //   return OG.getDate();
      // case "time":
      //   return `${OG.getHours()}시${OG.getMinutes()}분`;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Nav
        openModal={openModal}
        memo={memo}
        setMemo={setMemo}
        saveStorage={saveStorage}
        makeDateFormat={makeDateFormat}
        selectState={{ select: select, setSelect: setSelect }}
      />

      <Main
        selected={memo.filter((item) => item.isSelect === true)}
        makeDateFormat={makeDateFormat}
      >
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
