"use client";
import React, { useContext, useState, useEffect } from "react";
import { ProfileContext } from "@/app/context/ProfileContext";
import s from "./profile.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  baseUrl,
  getSecureData,
  patchFile,
  uploadImage,
} from "@/app/utils/apiConfig";
import useSWR, { useSWRConfig } from "swr";
import Loader from "@/app/components/UI/Loader";
import image from "@images/image.svg";
import upload from "@images/upload-solid.svg";
import camera from "@images/camera-solid.svg";
import pen from "@images/pen-solid.svg";
import signOut from "@images/sign-out-alt-solid.svg";
import trash from "@images/trash-solid.svg";
import Popup from "@/app/components/UI/Popup";
import Overdue from "@/app/components/UI/Overdue";
import { getImageBackground } from "@/app/constants/constants";

const Profile = ({ params }) => {
  const [user, setUser] = useState({});
  const [showPopup, setSHowPopup] = useState(false);
  const { setProfile } = useContext(ProfileContext);
  const { mutate } = useSWRConfig();
  const { profileId: slug } = params;
  const [token, setToken] = useState(null);
  const myPage = slug === "me" && token;
  const overdue = slug === "me" && !token;
  const { push } = useRouter();
  const getSecureData = (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": String(token),
      },
    }).then((res) => res.json());

  useEffect(() => setToken(localStorage.getItem("token")), []);

  const {
    data,
    mutate: refresh,
    isLoading,
  } = useSWR(
    `${baseUrl}${myPage ? "profile" : `user/${slug}`}/`,
    getSecureData,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (data) {
      setUser(data);
      if (myPage) {
        setProfile(data);
        localStorage.setItem("slug", data.slug);
      }
    }
  }, [data]);

  const switchShowPopup = () => setSHowPopup((prev) => !prev);

  const abandon = () => {
    push("/login");
    setProfile(null);
    localStorage.removeItem("token");
    localStorage.removeItem("slug");
  };

  const changeProfile = async () => {
    await mutate(`/profile`, patchFile(user, token)).then(refresh);
    switchShowPopup();
  };

  const onImageChange = async (e, type) => {
    const image = e.target.files?.[0];
    const fileData = new FormData();
    fileData.append("file", image, image.name);

    let id;
    const response = uploadImage(fileData);
    await response.then((res) => (id = res.id));

    const profileData = { name: data.name, slug: data.slug, [`${type}Id`]: id };

    await mutate(`/profile`, patchFile(profileData, token)).then(refresh);
  };

  const removeCover = async () => {
    const profileData = { name: data.name, slug: data.slug, coverId: null };
    await mutate(`/profile`, patchFile(profileData, token)).then(refresh);
  };

  if (overdue) {
    return <Overdue />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={s.profileContainer}>
      <div
        className={s.cover}
        style={user?.cover?.url ? getImageBackground(user.cover.url) : {}}
      >
        {myPage && (
          <div className={s.fileInput}>
            {user?.cover?.url ? (
              <>
                <Image src={trash} alt="trash" />
                <p>Удалить</p>
                <Image src={image} alt="image" />
                <button onClick={removeCover} />
              </>
            ) : (
              <>
                <Image src={upload} alt="upload" />
                <p>Загрузить</p>
                <Image src={image} alt="image" />
                <input
                  type="file"
                  onChange={(e) => onImageChange(e, "cover")}
                />
              </>
            )}
          </div>
        )}
      </div>
      <div className={s.mainBlock}>
        <div
          className={myPage ? s.myAvatar : s.avatar}
          style={user?.image?.url ? getImageBackground(user.image.url) : {}}
        >
          {myPage && (
            <>
              <input type="file" onChange={(e) => onImageChange(e, "image")} />
              <Image className={s.avatarIcon} src={camera} alt="camera" />
            </>
          )}
          {!user?.image?.url && (
            <p>{user.name ? user.name[0].toUpperCase() : ""}</p>
          )}
        </div>
        <div className={s.upperBlock}>
          <div className={s.nameBlock}>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>
          {myPage && (
            <button onClick={switchShowPopup}>
              <Image src={pen} alt="pen" />
              Редактировать
            </button>
          )}
        </div>
        <div className={s.lowerBlock}>
          <p>{user?.description}</p>
          {myPage && (
            <button onClick={abandon}>
              <Image src={signOut} alt="signOut" />
              Выйти
            </button>
          )}
        </div>
      </div>
      {showPopup && (
        <Popup
          user={user}
          setUser={setUser}
          switchShowPopup={switchShowPopup}
          changeProfile={changeProfile}
        />
      )}
    </div>
  );
};

export default Profile;
