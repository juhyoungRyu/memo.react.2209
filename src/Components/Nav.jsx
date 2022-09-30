import "../css/Nav.css";
import React from "react";
import List from "./List";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";

const Nav = (props) => {
  const KEY = "@MEMO";

  return (
    <div className="Nav">
      <section className="titleContainer">
        <p className="title">My Note</p>
        <HiOutlineTrash
          className="trash"
          onClick={() => {
            let liveArray = props.memo.filter((item) => item.isSelect !== true);
            if (liveArray.length === 0) {
              props.selectState.setSelect(null);
              props.setMemo([]);
              localStorage.removeItem(KEY);
              return null;
            } else {
              liveArray[0].isSelect = true;
              props.selectState.setSelect(liveArray[0].key);
              props.setMemo(liveArray);
              props.saveStorage(liveArray);
            }
          }}
        />
      </section>
      <List
        memo={props.memo}
        setMemo={props.setMemo}
        makeDateFormat={props.makeDateFormat}
        selectState={{
          select: props.selectState.select,
          setSelect: props.selectState.setSelect,
        }}
      />
      <section className="addContainer">
        <div
          className="addBtn"
          onClick={() => {
            props.openModal();
          }}
        >
          <AiOutlinePlusCircle />
          <p>Add new ideas</p>
        </div>
      </section>
    </div>
  );
};

export default Nav;
