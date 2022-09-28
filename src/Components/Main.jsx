import "../css/Main.css";
import React, { useEffect, useState } from "react";
import { VscEdit } from "react-icons/vsc";

const Main = (props) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");

  const view = (arr) => {
    let item = arr[0];
    if (item !== undefined || null) {
      setTitle(item.title);
      setDate(props.makeDateFormat(item.date, "all"));
      setValue(item.value);
    } else {
      return null;
    }
  };

  useEffect(() => {
    view(props.selected);
  }, [props.selected]);

  return (
    <div className="Main">
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
              props.setEditOpen(true);
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
