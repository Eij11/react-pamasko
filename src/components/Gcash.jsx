import React, { useRef, useState, useEffect } from "react";
import gkas from "../assets/gkas.jpg";

import { IoCloseSharp } from "react-icons/io5";

import "./gcash.css";

const Gcash = (props) => {
  const modalRef = useRef(null);

  const handleClose = (e) => {
    // Close modal if click occurs outside the `popup-inner` div
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      props.setTrigger(false);
    }
  };

  return props.trigger ? (
    <div className="pop-up" onClick={handleClose}>
      <div className="popup-inner" ref={modalRef}>
        <IoCloseSharp
          className="close-icon fs-2"
          onClick={() => props.setTrigger(false)}
        />

        <div className="text-center">
          <img
            src={gkas}
            className="rounded mt-5 img-fluid"
            alt="cover"
            style={{ width: "15rem" }}
          />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Gcash;
