import * as React from "react";

function SvgKampus(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 35 37.451" {...props}>
      <defs>
        <linearGradient
          id="kampus_svg__a"
          x1={0.839}
          x2={0.137}
          y1={0.882}
          y2={0.054}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#5bfff2" />
          <stop offset={1} stopColor="#66dcff" />
        </linearGradient>
        <filter
          id="kampus_svg__b"
          width={35}
          height={34.951}
          x={0}
          y={2.5}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy={4} />
          <feGaussianBlur result="blur" stdDeviation={2.5} />
          <feFlood floodColor="#09a8ce" />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g transform="translate(-599.5 -223)">
        <rect
          width={32}
          height={32}
          fill="url(#kampus_svg__a)"
          rx={10}
          transform="translate(601 223)"
        />
        <g filter="url(#kampus_svg__b)" transform="translate(599.5 223)">
          <path
            fill="#fff"
            d="M16.5 25.951a10.011 10.011 0 112 0V20a1 1 0 10-2 0v5.95zm1-16.451a6.5 6.5 0 014.6 11.1.5.5 0 10.707.707A7.5 7.5 0 1012.2 21.3a.5.5 0 00.7-.7 6.5 6.5 0 014.6-11.1zm0 3a3.5 3.5 0 012.475 5.975.5.5 0 10.707.707 4.5 4.5 0 10-6.364 0 .5.5 0 00.707-.707A3.5 3.5 0 0117.5 12.5zm0 2A1.5 1.5 0 1019 16a1.5 1.5 0 00-1.5-1.5z"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgKampus;
