import "../css/Main.css";
import React from "react";
import { VscEdit } from "react-icons/vsc";

const Main = (props) => {
  const view = (arr) => {
    let item = arr[0];
    if (item !== undefined || null) {
      return (
        <div className="selectedItemZone">
          <p>{item.title}</p>
          <p>{item.value}</p>
          <p>{props.makeDateFormat(item.date, "all")}</p>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="Main">
      <section className="head">
        <section className="titleZone">
          <h2 className="mainTextTitle">Test Text</h2>
          <p className="time">2022년 09월 28일</p>
        </section>
        <section className="edit">
          <VscEdit />
        </section>
      </section>
      <section className="body"></section>
      {/* {view(props.selected)} */}
    </div>
  );
};

export default Main;
