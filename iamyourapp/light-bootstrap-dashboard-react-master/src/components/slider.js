import React from "react";
//Import installed modules
import "jquery/dist/jquery.js";
import $ from "jquery";
import "ion-rangeslider/css/ion.rangeSlider.min.css";
import "ion-rangeslider/js/ion.rangeSlider.min.js";

class SliderRange extends React.Component {
  componentDidMount() {
    $(".js-range-slider").ionRangeSlider({
      type: "double",
      min: 0,
      max: 100,
      from: 0,
      to: 0,
      grid: true,
      skin: "big",
    });
  }
  render() {
    return (
      <div>
        <input
          class="js-range-slider"
          type="range"
          name="range-slider"
          min="0"
          max="100"
          value="0"
        />
      </div>
    );
  }
}
export default SliderRange;
