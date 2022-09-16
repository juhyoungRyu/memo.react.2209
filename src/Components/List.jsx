import "../css/List.css";
import React, { useState } from "react";

const List = (props) => {
  const KEY = "@MEMO";

  const [select, setSelect] = useState(0);

  const allSave = (arr) => {
    props.setMemo(arr);
    localStorage.setItem(KEY, JSON.stringify(arr));
  };

  return (
    <div className="List">
      <div className="listContainer">
        {props.memo.length > 0 ? (
          props.memo.map((item) => (
            <div
              className="listItem"
              key={item.key}
              onClick={() => {
                if (item.key !== select) {
                  let temp = [...props.memo];
                  temp.map((item) =>
                    item.isSelect ? (item.isSelect = false) : null
                  );
                  temp[item.key].isSelect = true;
                  setSelect(item.key);
                  allSave(temp);
                  props.setSelectMemo(item);
                }
              }}
              style={
                item.isSelect
                  ? { borderBottomColor: "#377D71", borderBottomWidth: "2px" }
                  : {}
              }
            >
              <section className="first">{item.title}</section>
              <section className="second">
                <p>
                  {item.value.length > 15
                    ? item.value.substr(0, 16)
                    : item.value}
                </p>
                <p>
                  {`${new Date(item.date).getMonth() + 1}월${new Date(
                    item.date
                  ).getDate()}일 ${new Date(item.date).getHours()}시${new Date(
                    item.date
                  ).getMinutes()}분`}
                </p>
              </section>
            </div>
          ))
        ) : (
          <small>Nothing here</small>
        )}
      </div>
    </div>
  );
};

export default List;
