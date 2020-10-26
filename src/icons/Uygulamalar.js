import * as React from "react";

function SvgUygulamalar(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 50 50" {...props}>
      <defs>
        <filter
          id="uygulamalar_svg__Rectangle_12_Copy_2"
          width={50}
          height={50}
          x={0}
          y={0}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dx={-1} dy={3} />
          <feGaussianBlur result="blur" stdDeviation={3} />
          <feFlood floodColor="#320390" floodOpacity={0.639} />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="uygulamalar_svg__Rectangle_8749"
          width={13}
          height={13}
          x={15.5}
          y={12.5}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dx={1} dy={2} />
          <feGaussianBlur result="blur-2" stdDeviation={1} />
          <feFlood floodColor="#cc4b62" floodOpacity={0.616} />
          <feComposite in2="blur-2" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="uygulamalar_svg__Rectangle_8750"
          width={13}
          height={13}
          x={15.5}
          y={22.5}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dx={1} dy={2} />
          <feGaussianBlur result="blur-3" stdDeviation={1} />
          <feFlood floodColor="#cc4b62" floodOpacity={0.616} />
          <feComposite in2="blur-3" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="uygulamalar_svg__Rectangle_8751"
          width={13}
          height={13}
          x={25.5}
          y={12.5}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dx={1} dy={2} />
          <feGaussianBlur result="blur-4" stdDeviation={1} />
          <feFlood floodColor="#cc4b62" floodOpacity={0.616} />
          <feComposite in2="blur-4" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="uygulamalar_svg__Rectangle_8752"
          width={13}
          height={13}
          x={25.5}
          y={22.5}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dx={1} dy={2} />
          <feGaussianBlur result="blur-5" stdDeviation={1} />
          <feFlood floodColor="#cc4b62" floodOpacity={0.616} />
          <feComposite in2="blur-5" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <linearGradient
          id="uygulamalar_svg__linear-gradient"
          x1={0.839}
          x2={0.137}
          y1={0.882}
          y2={0.054}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#ff5bbe" />
          <stop offset={1} stopColor="#ffc766" />
        </linearGradient>
        <style>{".uygulamalar_svg__cls-2{fill:#fff}"}</style>
      </defs>
      <g id="uygulamalar_svg__Group_5528">
        <g filter="url(#uygulamalar_svg__Rectangle_12_Copy_2)">
          <rect
            id="uygulamalar_svg__Rectangle_12_Copy_2-2"
            width={32}
            height={32}
            fill="url(#uygulamalar_svg__linear-gradient)"
            rx={10}
            transform="translate(10 6)"
          />
        </g>
        <g filter="url(#uygulamalar_svg__Rectangle_8749)">
          <rect
            id="uygulamalar_svg__Rectangle_8749-2"
            width={7}
            height={7}
            className="uygulamalar_svg__cls-2"
            rx={3.5}
            transform="translate(17.5 13.5)"
          />
        </g>
        <g filter="url(#uygulamalar_svg__Rectangle_8750)">
          <rect
            id="uygulamalar_svg__Rectangle_8750-2"
            width={7}
            height={7}
            className="uygulamalar_svg__cls-2"
            rx={2}
            transform="translate(17.5 23.5)"
          />
        </g>
        <g filter="url(#uygulamalar_svg__Rectangle_8751)">
          <rect
            id="uygulamalar_svg__Rectangle_8751-2"
            width={7}
            height={7}
            className="uygulamalar_svg__cls-2"
            rx={2}
            transform="translate(27.5 13.5)"
          />
        </g>
        <g filter="url(#uygulamalar_svg__Rectangle_8752)">
          <rect
            id="uygulamalar_svg__Rectangle_8752-2"
            width={7}
            height={7}
            className="uygulamalar_svg__cls-2"
            rx={3.5}
            transform="translate(27.5 23.5)"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgUygulamalar;
