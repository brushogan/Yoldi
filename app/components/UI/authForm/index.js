"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import { baseUrl } from "@/app/utils/apiConfig";
import s from "./AuthForm.module.css";
import { toast } from "react-hot-toast";
import envelopeIcon from "@images/envelope.svg";
import lockIcon from "@images/lock-solid.svg";
import userIcon from "@images/user.svg";
import eyeIcon from "@images/eye-solid.svg";
import eyeActiveIcon from "@images/eye-solid-active.svg";

async function sendRequest(url, { arg }) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

const validateErrors = {
  name: "Имя должно состоять только из букв",
  email: "Неправильный адрес электронной почты",
  password:
    "Пароль должен содержать букв верхнего и нижнего регистра, а также цифр.",
};

const validateConditions = {
  name: /^[a-zA-Zа-яА-ЯЁё\s-]*$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

const AuthForm = ({ type }) => {
  const isLoginForm = type === "login";
  const router = useRouter();
  const [validateFields, setValidateFields] = useState({
    name: isLoginForm,
    email: false,
    password: false,
  });
  const [authData, setAuthData] = useState({
    name: isLoginForm ? "name" : "",
    email: "",
    password: "",
  });
  const [maskedPassword, setMaskedPassword] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isLoginForm) {
      const test = (name) => {
        const isValid = validateConditions[name].test(authData[name]);
        setValidateFields((prev) => ({ ...prev, [name]: isValid }));
      };
      Object.keys(authData).forEach((key) => test(key));
    }
  }, [authData]);

  const btnActiveCondition = !Object.values(authData).some((el) => el === "");

  const switchPasswordVisibility = () => {
    if (maskedPassword.length !== authData.password.length)
      setMaskedPassword("*".repeat(authData.password.length));
    setVisible((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, ...authLoginData } = authData;
    const currentData = isLoginForm ? authLoginData : authData;
    if (btnActiveCondition) {
      if (
        !Object.values(validateFields).some((el) => !!el === false) ||
        isLoginForm
      ) {
        const response = await sendRequest(`${baseUrl}auth/${type}`, {
          arg: currentData,
        });
        if (response.value) {
          localStorage.setItem("token", response.value);
          router.push("/profiles/me");
        }
        if (response.message) {
          toast.error(response.message);
          setAuthData((prev) => ({ ...prev, password: "" }));
          setMaskedPassword("");
        }
      } else {
        Object.entries(validateFields).forEach(([key, value]) => {
          if (value === false) toast(validateErrors[key]);
        });
      }
    }
  };

  const generalInputsData = [
    {
      placeHolder: "E-mail",
      icon: envelopeIcon,
      name: "email",
    },
    {
      placeHolder: "Пароль",
      icon: lockIcon,
      name: "password",
    },
  ];
  const inputsData = isLoginForm
    ? generalInputsData
    : [
        {
          placeHolder: "Имя",
          icon: userIcon,
          name: "name",
        },
        ...generalInputsData,
      ];

  return (
    <div className={s.background}>
      <form className={s.signUpForm}>
        {isLoginForm ? (
          <p className={s.formTitle}>Вход в Yoldi Agency</p>
        ) : (
          <p className={s.formTitle}>
            Регистрация
            <br /> в Yoldi Agency
          </p>
        )}
        <div className={s.inputsBlock}>
          {inputsData.map(({ placeHolder, icon, name }) => {
            const isPassword = name === "password";
            return (
              <span key={placeHolder} className={s.inputBlock}>
                <Image className={s.inputIcon} src={icon} alt={name} />
                {isPassword && (
                  <Image
                    onClick={switchPasswordVisibility}
                    className={s.eyeIcon}
                    src={authData[name] ? eyeActiveIcon : eyeIcon}
                    alt="unhideIcon"
                  />
                )}
                <input
                  type="text"
                  value={
                    isPassword && !visible ? maskedPassword : authData[name]
                  }
                  onChange={(e) => {
                    const newValue = e.target.value.trim();
                    if (name === "password" && !visible) {
                      setMaskedPassword(newValue.replace(/./g, "*"));
                      setAuthData((prev) => ({
                        ...prev,
                        [name]:
                          newValue.length >= prev[name].length
                            ? prev[name] + newValue.replace(/\*/g, "")
                            : prev[name].slice(0, -1),
                      }));
                    } else
                      setAuthData((prev) => ({ ...prev, [name]: newValue }));
                  }}
                  className={s.input}
                  placeholder={placeHolder}
                />
              </span>
            );
          })}
        </div>
        <button
          onClick={onSubmit}
          className={`${s.mutedBtn} ${btnActiveCondition ? s.active : ""}`}
        >
          {isLoginForm ? "Войти" : "Создать аккаунт"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
