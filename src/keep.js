import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  var settings = {
    className: "my_slider",
    dots: false,
    infinite: true,
    speed: 500,
    centerPadding: "35% 0px 0px",
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div className="liko">
        <span>1</span>
      </div>
      <div className="liko">
        <span>2</span>
      </div>
      <div className="liko">
        <span>3</span>
      </div>
      <div className="liko">
        <span>4</span>
      </div>
      <div className="liko">
        <span>5</span>
      </div>
      <div className="liko">
        <span>6</span>
      </div>
    </Slider>
  );
}


.vote_slider {
    flex: 1;
    padding: 30px;
    height: 100%;
    overflow: hidden;
    margin-right: 30px;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: var(--brad);
    flex-direction: column;
    justify-content: center;
    // display: block;

    .my_slider {
      align-items: center;
      .slick-center .liko {
        color: blue;
      }
    }
    .slick-slider {
      flex: 1;
      align-items: center;
      .slick-list {
        height: 100%;
        .slick-track {
          height: 100%;
        }
      }
      .slick-slide {
        div {
          height: 100%;
        }
      }
      .slick-prev {
        left: 0px !important;
      }
      .slick-next {
        right: 0px !important;
      }
      .liko {
        height: 100%;
        text-align: center;
        align-items: center;
        justify-content: center;
        display: flex !important;
        border: 1px solid #000;
      }
    }
  }