import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const ProjectView = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const fetchCause = () =>
    fetch(`https://app.decho.finance/api/v1/causes/${id}`)
      .then((response) => response.json())
      .then((data) => data.data[0]);

  const { data, isLoading, isError } = useQuery(
    `fetchCause#${id}`,
    fetchCause,
    {
      refetchOnWindowFocus: false,
    }
  );

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

  if (data.status === "done") {
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
        <p style={{ marginBottom: "12px" }}>{data?.title}</p>
        <p style={{ marginBottom: "12px" }}>Project Already Funded</p>

        <BarLoader
          color={"#aaa"}
          loading={true}
          size={10}
          speedMultiplier={0.5}
        />
      </div>
    );
  }
  if (data.status === "canceled") {
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
        <p style={{ marginBottom: "12px" }}>{data?.title}</p>
        <p style={{ marginBottom: "12px" }}>Project Cancelled</p>

        <BarLoader
          color={"#aaa"}
          loading={true}
          size={10}
          speedMultiplier={0.5}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <p style={{ textTransform: "uppercase" }}>
        isError occurred fetching cause
      </p>
    );
  }

  const loading = false;
  return (
    <div className="preview_container">
      <div className="preview_image">
        <img className="" src={data?.photo_url} alt="" />
      </div>

      <div
        className="vote_card"
        style={{
          display: !loading && !data ? "none" : "flex",
        }}
      >
        <p className="hd_title">Project Details</p>
        <hr className="vert_line" />

        <div className="data_slider_cover">
          <div id="data_slider_inn" className="data_slider_inn">
            <div className="data_slide_item">
              <div className="prj_name">
                <p className="prj_title">{data?.title}</p>
                <p className="prj_description">
                  {/*  */}
                  {data?.short_description}
                </p>
              </div>

              <div className="prj_progress">
                <div className="prj_progress_num">
                  <p>Target&nbsp;</p>
                  <i className="ph-arrow-right-fill"></i>&nbsp;
                  <span className="reached">{data?.balance} /</span>
                  <span className="target">
                    &nbsp;
                    {data.status === "Approved"
                      ? data?.donations?.goal
                      : data?.cause_approval?.goal}
                  </span>
                </div>

                <div className="prj_range">
                  <div
                    className="prj_range_reached"
                    style={{
                      width: `calc(100% * ${
                        data?.balance /
                        (data.status === "Approved"
                          ? data?.donations?.goal
                          : data?.cause_approval?.goal)
                      })`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="vote_button_website">
          {data?.status === "Approved" ? (
            <button
              className="vote_button"
              onClick={() => {
                if (!!data) {
                  dispatch({
                    type: "use_modal",
                    modalData: {
                      ...data,
                      type: "donate",
                      currency: "ALGO",
                    },
                  });
                }
              }}
            >
              Donate towards project
            </button>
          ) : (
            <button
              className="vote_button"
              onClick={() => {
                if (!!data) {
                  dispatch({
                    type: "use_modal",
                    modalData: {
                      ...data,
                      type: "vote",
                      currency: "CHOICE",
                    },
                  });
                }
              }}
            >
              Vote for project
            </button>
          )}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://${data?.long_description}`}
            className="prj_website"
          >
            <i className="ph-arrow-square-out-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
