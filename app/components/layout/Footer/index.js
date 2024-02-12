"use client";
import React from "react";
import s from "./Footer.module.css";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Footer = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const onRouteChange = () =>
    pathname === "/registration" ? push("/login") : push("/registration");
  return (
    <footer className={s.footer}>
      {pathname === "/registration" ? (
        <p>
          <span className={s.muted}>Уже есть аккаунт? </span>
          <span className={s.redirector} onClick={onRouteChange}>
            Войти
          </span>
        </p>
      ) : (
        <p>
          <span className={s.muted}>Еще нет аккаунта? </span>
          <span className={s.redirector} onClick={onRouteChange}>
            Зарегистрироваться
          </span>
        </p>
      )}
    </footer>
  );
};

export default Footer;
