import React from "react";

import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import animationData from "../lotties/404-2.json";

const PageNotFound = () => {
  //
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="not_found_anim">
      <Lottie options={defaultOptions} />
      <div className="not_found_text">
        <Link to={"/"}>Help</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
