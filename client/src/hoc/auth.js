import React, { useEffect } from "react";
import { auth } from "../_actions/user_action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    var navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        //로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          //로그인하지 않았는데 로그인해야만 들어갈수있는 페이지 들어갈때
          if (option === true) {
            navigate("/login");
          }
        } else {
          //로그인 한 상태
          //admin이 아니지만 admin만 들어갈수있는 페이지에 들어가려고 할때
          if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          } else {
            //로그인을 했지만 로그인한 유저는 들어갈수없는 페이지에 들어가려고 할때
            if (option === false) {
              navigate("/");
            }
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
