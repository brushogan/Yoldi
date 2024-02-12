"use client";
import React from "react";
import { useContext } from "react";
import { ProfileContext } from "@/app/context/ProfileContext";
import Image from "next/image";
import s from "./Header.module.css";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import logo from "@images/logo.svg";

const Header = () => {
  const { profile } = useContext(ProfileContext);
  const { push } = useRouter();
  const pathname = usePathname();
  const isAuthorized = Boolean(localStorage.getItem("token"));

  const onLoginClick = () => {
    if (pathname !== "/login") push("/login");
  };

  return (
    <header className={s.header}>
      <Toaster />
      <div className={s.logoBlock}>
        <Image
          onClick={() => push("/profiles")}
          className={s.logo}
          src={logo}
          alt="logo"
        />
        <p>
          Разрабатываем и запускаем <br />
          сложные веб проекты
        </p>
      </div>
      {isAuthorized && profile ? (
        <div className={s.headerProfile}>
          {profile.name}
          <div
            onClick={() => push("/profiles/me")}
            className={s.avatar}
            style={
              profile.image?.url
                ? {
                    backgroundImage: `url(${profile.image.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}
            }
          >
            {!profile.image?.url && profile.name[0].toUpperCase()}
          </div>
        </div>
      ) : (
        <button onClick={onLoginClick} className={s.button}>
          Войти
        </button>
      )}
    </header>
  );
};

export default Header;
