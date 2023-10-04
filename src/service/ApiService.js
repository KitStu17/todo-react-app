import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch((error) => {
      console.log("Oops! Something went wrong");
      console.log(error.status);
      console.log("Ooops! Something went wrong");
      if (error.status === 403) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    });
}

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then((response) => {
    if (response.token) {
      // localStorage에 토큰 저장
      localStorage.setItem(ACCESS_TOKEN, response.token);
      // 토큰 존재 시 todo 화면으로 redirection
      window.location.href = "/";
    }
  });
}

// 회원가입 요청
export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO)
    .then((response) => {
      if (response.id) {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.log("Oops! Something went wrong");
      console.log(error.status);
      console.log("Ooops! Something went wrong");
      if (error.status === 403) {
        window.location.href = "/auth/signup";
      }
      return Promise.reject(error);
    });
}

// 로그아웃 요청
export function signout() {
  // localstorage의 토큰 삭제
  localStorage.setItem(ACCESS_TOKEN, null);
  window.location.href = "/";
}
