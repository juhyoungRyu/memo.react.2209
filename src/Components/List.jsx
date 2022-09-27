import "../css/List.css";
import React from "react";

const List = (props) => {
  const KEY = "@MEMO";

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
                if (item.key !== props.selectState.select) {
                  let temp = [...props.memo];
                  temp.map((item) =>
                    item.isSelect ? (item.isSelect = false) : null
                  );
                  // temp[item.key].isSelect = true;
                  temp.find((t) => t.key === item.key).isSelect = true;
                  props.selectState.setSelect(item.key);
                  allSave(temp);
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
                <p>{props.makeDateFormat(item.date, "all")}</p>
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
