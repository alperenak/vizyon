import * as React from "react";

function SvgUserManagement(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 44 44" fill="none" {...props}>
      <g filter="url(#userManagement_svg__filter0_d)">
        <path
          d="M29 3H17C11.477 3 7 7.477 7 13v12c0 5.523 4.477 10 10 10h12c5.523 0 10-4.477 10-10V13c0-5.523-4.477-10-10-10z"
          fill="url(#userManagement_svg__paint0_linear)"
        />
      </g>
      <path
        d="M22.399 27.996a4.98 4.98 0 00-.654-.045 12.532 12.532 0 01-1.898-.249 3.418 3.418 0 01-1.478-.45 3.52 3.52 0 01-1.144-1.062 2.17 2.17 0 01-.007-1.914c.298-.44.69-.805 1.145-1.067a3.371 3.371 0 011.484-.444c.629-.13 1.265-.213 1.905-.25a20.91 20.91 0 013.521 0c.636.039 1.267.123 1.892.25a3.457 3.457 0 011.475.455c.454.261.845.622 1.146 1.058a2.172 2.172 0 010 1.881 3.414 3.414 0 01-1.144 1.076 3.312 3.312 0 01-1.492.437c-.625.132-1.26.218-1.898.257-.59.057-1.181.08-1.773.068l-1.08-.001zm-3.163-12.407a4.56 4.56 0 011.209-3.2c.799-.86 1.898-1.36 3.055-1.389a4.321 4.321 0 013.058 1.388 4.56 4.56 0 011.21 3.2 4.56 4.56 0 01-1.21 3.202c-.8.861-1.9 1.36-3.058 1.389a4.321 4.321 0 01-3.056-1.39 4.56 4.56 0 01-1.208-3.2z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="userManagement_svg__paint0_linear"
          x1={33.848}
          y1={31.224}
          x2={11.384}
          y2={4.728}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF5BBE" />
          <stop offset={1} stopColor="#FFC766" />
        </linearGradient>
        <filter
          id="userManagement_svg__filter0_d"
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

export default SvgUserManagement;
