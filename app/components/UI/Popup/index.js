import React from "react";
import s from "./Popup.module.css";

const Popup = ({
  userUpdates,
  setUserUpdates,
  switchShowPopup,
  changeProfile,
}) => {
  const onChange = (e, type) => {
    const newValue = e.target.value.trim();
    setUserUpdates((prev) => ({ ...prev, [type]: newValue }));
  };

  return (
    <div className={s.container}>
      <div className={s.popup} onClick={(event) => event.stopPropagation()}>
        <h1>Редактировать профиль</h1>
        <div>
          {!userUpdates.name ? (
            <div className={s.labelError}>Имя не может быть пустым</div>
          ) : (
            <div className={s.label}>Имя</div>
          )}
          <input
            className={s.input}
            placeholder={"Имя"}
            value={userUpdates.name}
            onChange={(e) => onChange(e, "name")}
          />
          {!userUpdates.slug ? (
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
              value={userUpdates.slug}
              onChange={(e) => onChange(e, "slug")}
            />
          </div>
          <div className={s.label}>Описание</div>
          <textarea
            placeholder="Описание"
            className={s.textarea}
            value={userUpdates.description || ""}
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
            disabled={!userUpdates.name || !userUpdates.slug}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
