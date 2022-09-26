import "../css/Main.css";
import React from "react";

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

  return <div className="Main">{view(props.selected)}</div>;
};

export default Main;
