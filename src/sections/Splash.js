import React from "react";
import { Link } from "react-router-dom";

const Splash = () => {
  return (
    <div className="app_pages_container">
      <div className="intro_text">
        <p className="main">
          Decentralised <br /> Crowdfunding on the <br /> Algorand Blockchain
        </p>
        <p className="sub">
          DeCHO is a product that focuses on crowdfunding, DeCHO is not just
          another crowd-funding platform, it’s the innovation that sets the
          standard of what crowdfunding urgently needs to become.
        </p>
        <Link to={"/vote"} className="get_started">
          Get Started with Decho
        </Link>
      </div>

      {/*  */}

      <div className="intro_card">
        <p className="hd_title">Get started in few steps</p>
        <hr className="vert_line" />
        <div className="intro_step">
          <div className="intro_icon">
            <i className="uil uil-invoice"></i>
          </div>
          <p className="int_txt">
            View projects and their progress towards donation
          </p>
        </div>

        <div className="intro_step">
          <div className="intro_icon">
            <i className="uil uil-angle-double-left"></i>
            <i className="uil uil-angle-double-right"></i>
          </div>
          <p className="int_txt">
            Explore several projects using the side
            <span> Navigation Buttons</span>
          </p>
        </div>

        <div className="intro_step">
          <div className="intro_icon">
            <i className="ph-hand-pointing-fill"></i>
          </div>
          <p className="int_txt">
            Click interested projects to view details and <span>Vote</span>{" "}
            towards projects donation
          </p>
        </div>

        <div className="intro_step">
          <div className="intro_icon">
            <i className="ph-swap-fill" style={{ fontSize: "17px" }}></i>
          </div>
          <p className="int_txt">
            Donate to projects by sending <span>CHOICE</span> to the wallet
            address attached.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Splash;
