"use client";
import { useRouter } from "next/navigation";
import React from "react";
import s from "../../../styles/InfoPage.module.css";

const Overdue = () => {
  const { push } = useRouter();

  return (
    <div className={s.infoPage}>
      <div className={s.container}>
        <h1>Ваша сессия устарела</h1>
        <h3>
          Ваша текущая сессия истекла из-за неактивности. Пожалуйста, обновите
          страницу или выполните вход снова, чтобы продолжить пользоваться нашим
          сервисом.
        </h3>
        <div className={s.btnContainer}>
          <button onClick={() => push("/login")} className={s.button}>
            Выполнить вход
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overdue;
