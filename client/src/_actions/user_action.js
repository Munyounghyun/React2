import axios from "axios";
import { AUTH_USER, LOGIN_USER, REGISTER_USER } from "./types";

export function loginUser(dataTosubmit) {
  const request = axios
    .post("/api/users/login", dataTosubmit)
    .then((response) => response.data); //서버에서 받은 데이터를 request에 저장

  //user_reducer로 보냄
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataTosubmit) {
  const request = axios
    .post("/api/users/register", dataTosubmit) //똑같이 해줘야 api를 진입할수 있음
    .then((response) => response.data); //서버에서 받은 데이터를 request에 저장

  //user_reducer로 보냄
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get("/api/users/auth") //똑같이 해줘야 api를 진입할수 있음
    .then((response) => response.data); //서버에서 받은 데이터를 request에 저장

  //user_reducer로 보냄
  return {
    type: AUTH_USER,
    payload: request,
  };
}
