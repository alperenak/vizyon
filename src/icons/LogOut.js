import * as React from "react";

function SvgLogOut(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 44 44" fill="none" {...props}>
      <g filter="url(#LogOut_svg__filter0_d)">
        <path
          d="M29 3H17C11.477 3 7 7.477 7 13v12c0 5.523 4.477 10 10 10h12c5.523 0 10-4.477 10-10V13c0-5.523-4.477-10-10-10z"
          fill="url(#LogOut_svg__paint0_linear)"
        />
      </g>
      <path
        d="M14.933 20.674a8.092 8.092 0 012.968-7.066c.787-.64 1.963-.092 1.963.919 0 .37-.177.713-.463.944a5.698 5.698 0 00-2.08 5.03c.272 2.642 2.388 4.78 5.026 5.074a5.719 5.719 0 006.368-5.676 5.7 5.7 0 00-2.116-4.432 1.211 1.211 0 01-.46-.94c0-1 1.158-1.566 1.937-.94a8.094 8.094 0 013.027 6.312c0 4.662-3.96 8.421-8.697 8.08-3.917-.276-7.11-3.396-7.473-7.305zM22.998 10c-.662 0-1.194.536-1.194 1.194v5.5a1.194 1.194 0 102.388 0v-5.5c0-.658-.533-1.194-1.194-1.194z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="LogOut_svg__paint0_linear"
          x1={33.848}
          y1={31.224}
          x2={11.384}
          y2={4.728}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A73535" />
          <stop offset={1} stopColor="#F66" />
        </linearGradient>
        <filter
          id="LogOut_svg__filter0_d"
          x={0}
          y={0}
          width={44}
          height={44}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-1} dy={3} />
          <feGaussianBlur stdDeviation={3} />
          <feColorMatrix values="0 0 0 0 0.196078 0 0 0 0 0.0117647 0 0 0 0 0.564706 0 0 0 0.639 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export default SvgLogOut;
