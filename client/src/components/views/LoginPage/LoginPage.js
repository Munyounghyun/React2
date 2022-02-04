import { Axios } from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";

const LoginPage = (props) => {
  var navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Email", Email);
    console.log("Password", Password);

    let body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/");
      } else {
        alert("Error");
      }
    });
  };
  const onRegister = (event) => {
    navigate("/register");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>Email</label>
        <input
          placeholder="이메일"
          type="email"
          value={Email}
          onChange={onEmailHandler}
        />
        <label>Password</label>
        <input
          placeholder="비밀번호"
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        />
        <br />
        <button
          style={{ marginBottom: "10px" }}
          type="submit"
          onClick={onSubmitHandler}
        >
          Login
        </button>
        <button onClick={onRegister}>회원가입</button>
      </form>
    </div>
  );
};

export default LoginPage;
