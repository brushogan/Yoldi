export const baseUrl = "https://frontend-test-api.yoldi.agency/api/";

export const getSecureData = (url) =>
  fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": String(localStorage.getItem("token")),
    },
  }).then((res) => res.json());

export const patchFile = (userData) =>
  fetch(`${baseUrl}profile`, {
    method: "PATCH",
    headers: {
      accept: "application/json",
      "X-API-KEY": String(localStorage.getItem("token")),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((res) => res.json());

export const uploadImage = async (fileData) => {
  const response = await (
    await fetch("https://frontend-test-api.yoldi.agency/api/image", {
      method: "POST",
      body: fileData,
    })
  ).json();

  return response;
};
