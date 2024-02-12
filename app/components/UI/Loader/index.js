import React from "react";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loaderContainer}>
      <span className={s.loader}></span>
    </div>
  );
};

export default Loader;
