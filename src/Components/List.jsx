import "../css/List.css";
import React, { useState } from "react";

const List = (props) => {
  const KEY = "@MEMO";

  const [select, setSelect] = useState(1);

  return (
    <div className="List">
      <div className="listContainer">
        {props.memo.map((item) => (
          <div
            className="listItem"
            key={item.key}
            onClick={() => setSelect(item.key)}
            style={
              item.isSelect
                ? { borderBottomColor: "#377D71", borderBottomWidth: "2px" }
                : {}
            }
          >
            <section className="first">{item.title}</section>
            <section className="second">
              <p>
                {/* {
                item.value.length > 10
                  ? item.value.substr(0, 11)
                  : item.value.substr(0, 4)} */}
                {item.value}
              </p>
              <p>
                {`${
                  item.date.getMonth() + 1
                }월${item.date.getDate()}일 ${item.date.getHours()}시${item.date.getMinutes()}분`}
              </p>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
