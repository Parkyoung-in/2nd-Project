import React from "react";
//Import installed modules
import "jquery/dist/jquery.js";
import $ from "jquery";
import "ion-rangeslider/css/ion.rangeSlider.min.css";
import "ion-rangeslider/js/ion.rangeSlider.min.js";

class SliderTemp extends React.Component {
  componentDidMount() {
    $(".js-range-slider-temp").ionRangeSlider({
      type: "double",
      min: -10,
      max: 35,
      from: -15,
      to: -15,
      grid: true,
      skin: "big",
    });
  }
  render() {
    return (
      <div>
        <input
          class="js-range-slider-temp"
          type="range"
          name="slider_temp"
          min="-10"
          max="35"
          value="0"
        />
      </div>
    );
  }
}
export default SliderTemp;
