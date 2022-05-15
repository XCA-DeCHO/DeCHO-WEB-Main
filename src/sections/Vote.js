import Slider from "../components/Slider";
import React, { useState } from "react";
import ProjectDetailsSlider from "../components/ProjectDetailsSlider";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Vote = () => {
  const [current, update] = useState(1);

  const fetchUnapprovedCauses = async () =>
    fetch("https://app.decho.finance/api/v1/causes")
      .then((response) => response.json())
      .then((data) => data.data.filter((cause) => cause.status === "pending"));

  const { data, isLoading, isError } = useQuery(
    "UnapprovedCauses",
    fetchUnapprovedCauses,
    {
      refetchOnWindowFocus: false,
    }
  );

  // Slide Controls
  const PrevSlide = () => {
    if (current !== 1) {
      update((prev) => prev - 1);
    }
  };
  const NextSlide = () => {
    if (current !== data.length) {
      update((prev) => prev + 1);
    }
  };

  const darkTheme = useSelector((state) => state.status.darkTheme);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          textTransform: "uppercase",
        }}
      >
        <p style={{ marginBottom: "12px" }}>Loading</p>

        <BarLoader
          color={"#aaa"}
          loading={true}
          size={10}
          speedMultiplier={0.5}
        />
      </div>
    );
  }

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
          arr={data}
          type={"vote"}
          isLoading={isLoading}
          current={current}
          PrevSlide={PrevSlide}
          NextSlide={NextSlide}
        />
      </div>

      <div
        className="vote_card"
        style={{
          display: !isLoading && data.length === 0 ? "none" : "flex",
        }}
      >
        <p className="hd_title">Project Details</p>
        <hr className="vert_line" />

        <ProjectDetailsSlider
          arr={data}
          current={current}
          PrevSlide={PrevSlide}
          NextSlide={NextSlide}
          isDonation={false}
        />

        <div className="vote_button_website">
          {!!data[current - 1]?.id ? (
            <Link
              className="vote_button"
              to={`/preview/${data[current - 1]?.id}`}
            >
              View project
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Vote;
