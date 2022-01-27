import React, { useEffect } from "react";
import axios from "axios";

const LandingPage = () => {
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response));
  }, []);

  return <div>LandingPage 랜딩 페이지</div>;
};

export default LandingPage;
