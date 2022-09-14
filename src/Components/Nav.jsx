import "../css/Nav.css";
import React, { useState } from "react";
import List from "./List";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";

const Nav = (props) => {
  return (
    <div className="Nav">
      <section className="titleContainer">
        <p className="title">My Note</p>
        <HiOutlineTrash className="trash" />
      </section>
      <List memo={props.memo} setMemo={props.setMemo} />
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
