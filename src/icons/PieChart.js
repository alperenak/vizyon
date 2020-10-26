import * as React from "react";

function SvgPieChart(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 54 54" {...props}>
      <defs>
        <linearGradient
          id="pie-chart_svg__a"
          x1={0.5}
          x2={0.5}
          y1={1}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#fd3a84" />
          <stop offset={1} stopColor="#ffa68d" />
        </linearGradient>
        <linearGradient
          id="pie-chart_svg__b"
          x1={0.5}
          x2={0.5}
          y1={1}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#ffc2cc" />
          <stop offset={1} stopColor="#fff2f4" />
        </linearGradient>
      </defs>
      <path
        fill="url(#pie-chart_svg__a)"
        d="M23.836 108.566a23.783 23.783 0 110-47.566 1.582 1.582 0 011.582 1.582v20.566h20.566a1.582 1.582 0 011.582 1.582 23.81 23.81 0 01-23.73 23.836z"
        transform="translate(0 -54.566)"
      />
      <path
        fill="url(#pie-chart_svg__b)"
        d="M294.836 25.418h-22.254A1.582 1.582 0 01271 23.836V1.582A1.582 1.582 0 01272.582 0a23.9 23.9 0 0123.836 23.836 1.582 1.582 0 01-1.582 1.582z"
        transform="translate(-242.418)"
      />
    </svg>
  );
}

export default SvgPieChart;
