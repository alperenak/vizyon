import * as React from "react";

function SvgDosyalar(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 50 50" {...props}>
      <defs>
        <filter
          id="dosyalar_svg__a"
          width={50}
          height={50}
          x={0}
          y={0}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dx={-1} dy={3} />
          <feGaussianBlur result="blur" stdDeviation={3} />
          <feFlood floodColor="#320390" floodOpacity={0.635} />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="dosyalar_svg__c"
          width={27}
          height={29}
          x={13.5}
          y={9.5}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dx={1} dy={2} />
          <feGaussianBlur result="blur-2" stdDeviation={1.5} />
          <feFlood floodColor="#34bc86" />
          <feComposite in2="blur-2" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <linearGradient
          id="dosyalar_svg__b"
          x1={0.839}
          x2={0.137}
          y1={0.882}
          y2={0.054}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#5bffd3" />
          <stop offset={1} stopColor="#b3ff66" />
        </linearGradient>
      </defs>
      <g filter="url(#dosyalar_svg__a)">
        <rect
          width={32}
          height={32}
          fill="url(#dosyalar_svg__b)"
          rx={10}
          transform="translate(10 6)"
        />
      </g>
      <g filter="url(#dosyalar_svg__c)">
        <path
          fill="#fff"
          d="M30.191 32H21.81C18.753 32 17 30.236 17 27.16V16.83a4.91 4.91 0 011.265-3.559A4.863 4.863 0 0121.81 12h8.382C33.247 12 35 13.761 35 16.83v10.33a4.891 4.891 0 01-1.246 3.583A4.819 4.819 0 0130.191 32zM22 25.736a.78.78 0 00-.668.374.786.786 0 00.653 1.206.7.7 0 00.1-.006h7.835a.79.79 0 000-1.57h-7.84a.8.8 0 00-.08-.004zm.08-4.557a.78.78 0 000 1.561h7.84a.78.78 0 000-1.561zm0-4.529v.01a.78.78 0 000 1.559h2.99a.785.785 0 000-1.57z"
        />
      </g>
    </svg>
  );
}

export default SvgDosyalar;
