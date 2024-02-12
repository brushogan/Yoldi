"use client";
import React from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { baseUrl, fetcher } from "../utils/apiConfig";
import Loader from "../components/UI/Loader";
import s from "./Profiles.module.css";

const ProfilesList = () => {
  const { push } = useRouter();
  const { data: users, isLoading } = useSWR(`${baseUrl}user`, fetcher);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={s.profilePage}>
      <div className={s.listContainer}>
        <h1>Список аккаунтов</h1>
        <div className={s.list}>
          {users.map(({ slug, image, name, email }) => (
            <div
              className={s.user}
              key={slug}
              onClick={() =>
                push(
                  `/profiles/${
                    slug === localStorage.getItem("slug") ? "me" : slug
                  }`
                )
              }
            >
              <div
                className={s.avatar}
                style={{ backgroundImage: `url(${image?.url})` }}
              >
                {!image?.url && name[0]}
              </div>
              <div className={s.name}>{name}</div>
              <div className={s.email}>{email}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilesList;
