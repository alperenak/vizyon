import * as React from "react";

function SvgClock(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 30 30" {...props}>
      <g transform="translate(-232 -1193)">
        <circle
          cx={15}
          cy={15}
          r={15}
          fill="rgba(0,31,92,0.19)"
          transform="translate(232 1193)"
        />
        <path
          fill="#fff"
          d="M247 1201a7 7 0 107 7 7.008 7.008 0 00-7-7zm3.175 7.966h-3.352a.592.592 0 01-.592-.592v-4.811a.592.592 0 111.183 0v4.22h2.761a.592.592 0 110 1.183z"
        />
      </g>
    </svg>
  );
}

export default SvgClock;
