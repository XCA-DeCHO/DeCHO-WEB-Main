import $ from "jquery";
import React, { useEffect } from "react";

const ProjectDetailsSlider = ({ arr, current, PrevSlide, NextSlide }) => {
  // Slider transform divisor and multiplier
  const divisor = `calc(100% / (${arr.length}))`;
  const multiplier = `calc(100% * (${arr.length}))`;
  const divisorNext = `calc((-100% / (${arr.length})) * ${current - 1})`;

  useEffect(() => {
    $("#data_slider_inn").css({
      transform: `translate3d(${divisorNext}, 0px, 0px)`,
    });
  }, [current, divisorNext]);

  return (
    <>
      <div className="data_slider_cover">
        <div
          id="data_slider_inn"
          className="data_slider_inn"
          style={{ width: multiplier }}
        >
          {arr.map((item, index) => {
            return (
              <div
                className="data_slide_item"
                style={{
                  width: divisor,
                }}
                key={index}
              >
                <div className="prj_name">
                  <p className="prj_title">{item?.title}</p>
                  <p className="prj_description">
                    {/*  */}
                    {item?.short_description}
                  </p>
                </div>

                <div className="prj_progress">
                  <div className="prj_progress_num">
                    <p>Target&nbsp;</p>
                    <i className="ph-arrow-right-fill"></i>&nbsp;
                    <span className="reached">{item?.balance} /</span>
                    <span className="target">
                      &nbsp;{item?.cause_approval?.goal}
                    </span>
                  </div>

                  <div className="prj_range">
                    <div
                      className="prj_range_reached"
                      style={{
                        width: `calc(100% * ${
                          item?.balance / item?.cause_approval?.goal
                        })`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsSlider;
