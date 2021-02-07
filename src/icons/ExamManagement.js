import * as React from "react";

function SvgExamManagement(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 44 44" fill="none" {...props}>
      <g filter="url(#ExamManagement_svg__filter0_d)">
        <path
          d="M29 3H17C11.477 3 7 7.477 7 13v12c0 5.523 4.477 10 10 10h12c5.523 0 10-4.477 10-10V13c0-5.523-4.477-10-10-10z"
          fill="url(#ExamManagement_svg__paint0_linear)"
        />
      </g>
      <path
        d="M25.11 11.055h-.618A1.585 1.585 0 0023 10c-.688 0-1.274.44-1.492 1.055h-.617c-.873 0-1.582.71-1.582 1.582 0 .291.235.527.527.527h6.328a.527.527 0 00.527-.527c0-.873-.71-1.582-1.582-1.582z"
        fill="#fff"
      />
      <path
        d="M28.273 12.11h-.58c.034.17.053.346.053.527 0 .872-.71 1.582-1.582 1.582h-6.328c-.872 0-1.582-.71-1.582-1.582 0-.18.018-.357.053-.528h-.58c-.873 0-1.582.71-1.582 1.582v12.727c0 .872.71 1.582 1.582 1.582h10.546c.873 0 1.582-.71 1.582-1.582V13.691c0-.872-.71-1.582-1.582-1.582zm-6.855 12.656h-2.11a.527.527 0 110-1.055h2.11a.527.527 0 110 1.055zm0-3.692h-2.11a.527.527 0 110-1.055h2.11a.527.527 0 110 1.055zm0-3.691h-2.11a.527.527 0 110-1.055h2.11a.527.527 0 110 1.055zm5.119 7.537a.527.527 0 11-.746.746l-.682-.682-.682.682a.526.526 0 01-.745 0 .527.527 0 010-.746l.682-.682-.682-.682a.527.527 0 11.745-.745l.682.682.682-.682a.527.527 0 11.746.745l-.682.682.682.682zm.527-5.055l-1.582 1.582a.526.526 0 01-.745 0l-1.055-1.055a.527.527 0 11.746-.745l.681.681 1.21-1.209a.527.527 0 11.745.746zm0-3.164l-1.582 1.582a.526.526 0 01-.745 0l-1.055-1.055a.527.527 0 11.746-.745l.681.681 1.21-1.209a.527.527 0 11.745.746z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="ExamManagement_svg__paint0_linear"
          x1={33.848}
          y1={31.224}
          x2={11.384}
          y2={4.728}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F58D76" />
          <stop offset={1} stopColor="#F66" />
        </linearGradient>
        <filter
          id="ExamManagement_svg__filter0_d"
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

export default SvgExamManagement;
