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
                },
              },
            }).then((v) => {
              newIdea.title = v;
              swal({
                className: "swalInputArea",
                title: "Do you have new Ideas?",
                buttons: ["Cancel", "Done"],
                content: {
                  element: "textarea",
                  attributes: {
                    placeholder: "Input your Idea",
                  },
                },
              }).then((v) => {
                newIdea.value = v;
                let temp = [...memo];
                temp[temp.length] = {
                  date: new Date(),
                  title: newIdea.title,
                  value: newIdea.value,
                  key: temp[temp.length - 1].key + 1,
                  isSelect: false,
                };
                setMemo(temp);
              });
            })
          : null}
      </Main>
    </div>
  );
};

export default App;
