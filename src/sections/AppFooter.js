import React from "react";
import { useSelector } from "react-redux";

const AppFooter = () => {
  const darkTheme = useSelector((state) => state.status.darkTheme);

  return (
    <footer className="app_footer">
      <ul className="socials">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.twitter.com/AlgoDeCHO/"
        >
          <i className="uil uil-twitter"></i>&nbsp;Twitter
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/company/xcadecho"
        >
          <i className="uil uil-linkedin"></i>&nbsp;Linkedin
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.youtube.com/channel/UCyTgP56jmR6Pal5UY1xdFWg"
        >
          <i className="uil uil-youtube"></i>&nbsp;Youtube
        </a>
        <a target="_blank" rel="noreferrer" href="https://decho.finance">
          <img
            src={`/assets/decho-${darkTheme ? "w" : "bw"}.png`}
            alt=""
            style={{ maxWidth: "14px" }}
          />
          <span style={{ paddingTop: "2px" }}>&nbsp;DeCHO</span>
        </a>
      </ul>

      <a
        href="https://play.google.com/store/apps/details?id=com.redecho"
        target="_blank"
        rel="noreferrer"
        className="google_play_link"
      >
        <img src="/assets/icons/play-store.svg" alt="" />
      </a>
    </footer>
  );
};

export default AppFooter;
