import React from "react";
import s from "./Popup.module.css";

const Popup = ({ user, setUser, switchShowPopup, changeProfile }) => {
  const onChange = (e, type) => {
    const newValue = e.target.value.trim();
    setUser((prev) => ({ ...prev, [type]: newValue }));
  };

  return (
    <div className={s.container}>
      <div className={s.popup} onClick={(event) => event.stopPropagation()}>
        <h1>Редактировать профиль</h1>
        <div>
          {!user.name ? (
            <div className={s.labelError}>Имя не может быть пустым</div>
          ) : (
            <div className={s.label}>Имя</div>
          )}
          <input
            className={s.input}
            placeholder={"Имя"}
            value={user.name}
            onChange={(e) => onChange(e, "name")}
          />
          {!user.slug ? (
            <div className={s.labelError}>
              Адрес профиля не может быть пустым
            </div>
          ) : (
            <div className={s.label}>Адрес профиля</div>
          )}
          <div style={{ display: "flex" }}>
            <input
              className={s.inputExample}
              placeholder={"example.com/"}
              disabled
            />
            <input
              className={s.inputAddress}
              placeholder={"Адрес профиля"}
              value={user.slug}
              onChange={(e) => onChange(e, "slug")}
            />
          </div>
          <div className={s.label}>Описание</div>
          <textarea
            placeholder="Описание"
            className={s.textarea}
            value={user.description || ""}
            onChange={(e) => onChange(e, "description")}
          />
        </div>
        <div className={s.btnsBlock}>
          <button onClick={switchShowPopup} className={s.cancelBtn}>
            Отмена
          </button>
          <button
            onClick={changeProfile}
            className={s.saveBtn}
            disabled={!user.name || !user.slug}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
