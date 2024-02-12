export const baseUrl = "https://frontend-test-api.yoldi.agency/api/";

export const fetcher = (url) =>
  fetch(url, {
    method: "GET",
  }).then((res) => res.json());

export const authRequest = (type, { arg }) =>
  fetch(`${baseUrl}auth/${type}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());

export const patchFile = (userData, key) =>
  fetch(`${baseUrl}profile`, {
    method: "PATCH",
    headers: {
      accept: "application/json",
      "X-API-KEY": String(key),
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
