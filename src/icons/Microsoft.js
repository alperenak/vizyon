import * as React from "react";

function SvgMicrosoft(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 46 55" {...props}>
      <defs>
        <linearGradient
          id="Microsoft_svg__a"
          x1={0.839}
          x2={0.137}
          y1={0.882}
          y2={0.054}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#5bfff2" />
          <stop offset={1} stopColor="#66dcff" />
        </linearGradient>
      </defs>
      <path
        fill="url(#Microsoft_svg__a)"
        d="M87.806 4.628L71.707.045a1.154 1.154 0 00-.759.044l-27.6 11.459a1.146 1.146 0 00-.706 1.057V42.4a1.148 1.148 0 001.138 1.146 1.145 1.145 0 00-.352 2.234l27.6 9.167a1.189 1.189 0 00.363.057 1.154 1.154 0 00.315-.046l16.1-4.583a1.146 1.146 0 00.835-1.1V5.728a1.147 1.147 0 00-.835-1.1zM44.31 43.42l6.9-3.438a1.145 1.145 0 00.635-1.024V14.645l20.7-5.156v38.446l-28.575-4.38a1 1 0 00-.163-.014 1.168 1.168 0 00.503-.121z"
        transform="translate(-42.641)"
      />
    </svg>
  );
}

export default SvgMicrosoft;
