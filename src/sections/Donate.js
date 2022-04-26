import { useDispatch, useSelector } from "react-redux";
import Slider from "../components/Slider";
import React, { useEffect, useState } from "react";
import ProjectDetailsSlider from "../components/ProjectDetailsSlider";

const Donate = () => {
  // Current Slide Index
  const dispatch = useDispatch();
  const [current, update] = useState(1);

  // Toggle to show error component function
  const [isError, setIsError] = useState(false);
  const [donations, setDonations] = useState([]);

  // Fetching data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://app.decho.finance/api/v1/causes")
      .then((response) => response.json())
      .then((data) => {
        setIsError(false);
        setDonations(data.data.filter((cause) => cause.status === "Approved"));
        setLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setLoading(false);
      });
  }, []);

  // Slide Controls
  const PrevSlide = () => {
    if (current !== 1) {
      update((prev) => prev - 1);
    }
  };
  const NextSlide = () => {
    if (current !== donations.length) {
      update((prev) => prev + 1);
    }
  };

  const darkTheme = useSelector((state) => state.status.darkTheme);

  return (
    <div className="app_pages_container">
      <div
        className="vote_slider"
        style={{ paddingTop: isError === null ? "20px" : "50px" }}
      >
        <div
          className="error_component"
          style={{
            background:
              isError === true
                ? "rgba(255,0,0, 0.06)"
                : isError === false
                ? "rgba(0,255,0, 0.08)"
                : "transparent",

            border:
              isError === true || isError === false
                ? darkTheme
                  ? "1px solid #444"
                  : "1px solid #eee"
                : "",
          }}
        >
          {isError === true ? (
            <>
              <span>
                <i
                  className="ph-x-circle-fill"
                  style={{ color: "#e84e4e" }}
                ></i>
              </span>
              <p>Error fetching data!!</p>
            </>
          ) : isError === false ? (
            <>
              <span>
                <i
                  className="ph-check-circle-fill"
                  style={{ color: "#1fa647" }}
                ></i>
              </span>
              <p>Data fetched successfully 🤙</p>
            </>
          ) : null}
        </div>

        <Slider
          arr={donations}
          type={"donate"}
          loading={loading}
          current={current}
          PrevSlide={PrevSlide}
          NextSlide={NextSlide}
        />
      </div>

      <div
        className="vote_card"
        style={{
          display: !loading && donations.length === 0 ? "none" : "flex",
        }}
      >
        <p className="hd_title">Project Details</p>
        <hr className="vert_line" />

        <ProjectDetailsSlider
          arr={donations}
          current={current}
          PrevSlide={PrevSlide}
          NextSlide={NextSlide}
          isDonation={true}
        />

        <div className="vote_button_website">
          <button
            className="vote_button"
            onClick={() => {
              if (!!donations[current - 1]) {
                dispatch({
                  type: "use_modal",
                  modalData: {
                    ...donations[current - 1],
                    type: "donate",
                    currency: "ALGO",
                  },
                });
              }
            }}
          >
            Donate towards project
          </button>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://${donations[current - 1]?.long_description}`}
            className="prj_website"
          >
            <i className="ph-arrow-square-out-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Donate;
