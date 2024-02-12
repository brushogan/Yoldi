import envelopeIcon from "@images/envelope.svg";
import lockIcon from "@images/lock-solid.svg";
import userIcon from "@images/user.svg";

export const validateErrors = {
  name: "Имя должно состоять только из букв",
  email: "Неправильный адрес электронной почты",
  password:
    "Пароль должен содержать букв верхнего и нижнего регистра, а также цифр.",
};

export const validateConditions = {
  name: /^[a-zA-Zа-яА-ЯЁё\s-]*$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

export const getInputsData = (isLoginForm) => {
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
  return isLoginForm
    ? generalInputsData
    : [
        {
          placeHolder: "Имя",
          icon: userIcon,
          name: "name",
        },
        ...generalInputsData,
      ];
};

export const getImageBackground = (url) => ({
  backgroundImage: `url(${url})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});
