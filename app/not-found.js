"use client";
import { useRouter } from "next/navigation";
import React from "react";
import s from "./styles/InfoPage.module.css";

const NotFound = () => {
  const { push } = useRouter();

  return (
    <div className={s.infoPage}>
      <div className={s.container}>
        <h1>Страница не найдена</h1>
        <h3>
          Извините, но страница, которую вы ищете, не существует. Возможно, вы
          ввели неправильный URL, или страница была перемещена или удалена.
        </h3>
        <h3>
          Пожалуйста, проверьте URL еще раз, или перейдите на главную страницу
          сайта. Если вы считаете, что это ошибка, пожалуйста, сообщите об этом
          администратору сайта.
        </h3>
        <div className={s.btnContainer}>
          <button onClick={() => push("/profiles")} className={s.button}>
            На главную
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
