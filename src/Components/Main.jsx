import "../css/Main.css";
import React from "react";

const Main = (props) => {
  const view = (arr) => {
    return (
      <div>
        <p>{arr.title}</p>
        <p>{arr.value}</p>
        <p>{arr.date}</p>
      </div>
    );
  };

  return (
    <div className="Main">
      {props.selectMemo !== null ? view(props.selectMemo) : ""}
    </div>
  );
};

export default Main;
