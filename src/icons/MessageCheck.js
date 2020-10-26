import * as React from "react";

function SvgMessageCheck(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 39 39" {...props}>
      <defs>
        <filter
          id="messageCheck_svg__a"
          width={39}
          height={39}
          x={0}
          y={0}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy={3} />
          <feGaussianBlur result="blur" stdDeviation={2.5} />
          <feFlood floodColor="#13aad8" floodOpacity={0.396} />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g transform="translate(-1206.5 -1018.5)">
        <circle
          cx={15}
          cy={15}
          r={15}
          fill="rgba(91,223,255,0.13)"
          transform="translate(1211 1020)"
        />
        <g
          filter="url(#messageCheck_svg__a)"
          transform="translate(1206.497 1018.497)"
        >
          <path
            fill="#fff"
            d="M7.5 16.5a12 12 0 1122.165 6.381l.729 3.323a1.5 1.5 0 01-1.724 1.8l-3.949-.694A12 12 0 017.5 16.5z"
          />
        </g>
        <path
          fill="#7be1ff"
          d="M1224.562 1039.637a1.508 1.508 0 01-1.069-.458l-3.055-3.055a1.477 1.477 0 010-2.138 1.476 1.476 0 012.138 0l1.986 1.986 5.041-5.042a1.477 1.477 0 012.138 0 1.477 1.477 0 010 2.138l-6.11 6.11a1.508 1.508 0 01-1.069.459z"
        />
      </g>
    </svg>
  );
}

export default SvgMessageCheck;
