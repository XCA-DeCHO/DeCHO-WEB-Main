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
        href="https://mobile.decho.finance"
        target="_blank"
        rel="noreferrer"
        className="google_play_link"
      >
        <img src="https://firebasestorage.googleapis.com/v0/b/decho-b0631.appspot.com/o/DeCHO%20for%20algorand%20ecosystem%20Color%20Logo.png?alt=media&token=ff33291c-b160-4b76-8ffc-3075167961d5" alt="" />
      </a>
    </footer>
  );
};

export default AppFooter;
