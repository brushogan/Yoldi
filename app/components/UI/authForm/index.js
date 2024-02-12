"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authRequest } from "@/app/utils/apiConfig";
import s from "./AuthForm.module.css";
import { toast } from "react-hot-toast";
import eyeIcon from "@images/eye-solid.svg";
import eyeActiveIcon from "@images/eye-solid-active.svg";
import {
  validateErrors,
  validateConditions,
  getInputsData,
} from "@/app/constants/constants";

const AuthForm = ({ type }) => {
  const isLoginForm = type === "login";
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
  const router = useRouter();
  const btnActiveCondition = !Object.values(authData).some((el) => el === "");

  const onChange = (e, name) => {
    const newValue = e.target.value.trim();
    if (!isLoginForm) {
      setValidateFields((prev) => ({
        ...prev,
        [name]: validateConditions[name].test(newValue),
      }));
    }
    if (name === "password" && !visible) {
      setMaskedPassword(newValue.replace(/./g, "*"));
      setAuthData((prev) => ({
        ...prev,
        [name]:
          newValue.length >= prev[name].length
            ? prev[name] + newValue.replace(/\*/g, "")
            : prev[name].slice(0, -1),
      }));
    } else setAuthData((prev) => ({ ...prev, [name]: newValue }));
  };

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
        const response = await authRequest(type, {
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

  const inputsData = getInputsData(isLoginForm);

  return (
    <div className={s.background}>
      <form className={s.signUpForm}>
        <p className={s.formTitle}>
          {isLoginForm ? (
            "Вход в Yoldi Agency"
          ) : (
            <>
              Регистрация"
              <br /> в Yoldi Agency
            </>
          )}
        </p>

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
                  onChange={(e) => onChange(e, name)}
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
