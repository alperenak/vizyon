import * as React from "react";

function SvgRaporlar(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 44 44" fill="none" {...props}>
      <g filter="url(#Raporlar_svg__filter0_d)">
        <path
          d="M29 3H17C11.477 3 7 7.477 7 13v12c0 5.523 4.477 10 10 10h12c5.523 0 10-4.477 10-10V13c0-5.523-4.477-10-10-10z"
          fill="url(#Raporlar_svg__paint0_linear)"
        />
      </g>
      <path
        d="M29.375 11H17.292A2.294 2.294 0 0015 13.292v11.416A2.294 2.294 0 0017.292 27h12.083a2.294 2.294 0 002.292-2.292V13.292A2.294 2.294 0 0029.375 11zm-7.083 6.833V13.73c2 .304 3.541 2.02 3.541 4.103A4.171 4.171 0 0121.667 22c-.924 0-1.77-.312-2.461-.823l2.902-2.902a.622.622 0 00.184-.442zm-1.25-4.103v3.845l-2.72 2.72a4.126 4.126 0 01-.822-2.462c0-2.083 1.542-3.799 3.542-4.103zm7.5 10.978H18.125a.625.625 0 010-1.25h10.417a.625.625 0 010 1.25zm0-2.708h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.292h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.291h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="Raporlar_svg__paint0_linear"
          x1={33.848}
          y1={31.224}
          x2={11.384}
          y2={4.728}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7535A7" />
          <stop offset={0.446} stopColor="#BC66FF" />
        </linearGradient>
        <filter
          id="Raporlar_svg__filter0_d"
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

export default SvgRaporlar;
