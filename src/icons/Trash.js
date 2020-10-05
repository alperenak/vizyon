import * as React from "react";

function SvgTrash(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 56.991 69.749" {...props}>
      <defs>
        <linearGradient
          id="trash_svg__linear-gradient"
          x1={0.5}
          x2={0.5}
          y1={0.124}
          y2={0.376}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#ffa000" />
          <stop offset={1} stopColor="#ffa000" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="trash_svg__linear-gradient-2"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#ffdb6f" />
          <stop offset={1} stopColor="#ffb333" />
        </linearGradient>
        <style>{".trash_svg__cls-1{fill:#ffc107}"}</style>
      </defs>
      <g id="trash_svg__Group_5695" transform="translate(-1305.783 -666.219)">
        <path
          id="trash_svg__Path_7856"
          d="M118.132 130c.591 13.856 1.495 27.758 2.623 41.7a5.539 5.539 0 005.212 5.051q15.516.512 31.033 0a5.539 5.539 0 005.212-5.051c1.129-13.942 2.032-27.844 2.623-41.7-7.818-2.705-15.612-5.424-23.352-8.028-7.739 2.607-15.533 5.328-23.351 8.028z"
          className="trash_svg__cls-1"
          transform="translate(1192.794 557.003)"
        />
        <path
          id="trash_svg__Path_7868"
          d="M218.242 45.1a7.87 7.87 0 00-7.7 7.86q7.7-.1 15.4 0a7.871 7.871 0 00-7.7-7.86z"
          className="trash_svg__cls-1"
          transform="translate(1116.036 621.119)"
        />
        <path
          id="trash_svg__Path_7869"
          fill="url(#trash_svg__linear-gradient)"
          d="M118.132 130.288c.591 14.347 1.495 28.743 2.623 43.18a5.632 5.632 0 005.212 5.23q15.516.53 31.033 0a5.632 5.632 0 005.212-5.23c1.129-14.437 2.032-28.832 2.623-43.18-7.818-2.8-15.612-5.616-23.352-8.313-7.739 2.697-15.533 5.512-23.351 8.313z"
          transform="translate(1192.795 557.005)"
        />
        <path
          id="trash_svg__Path_7870"
          fill="#ffa000"
          d="M144.315 76.06q-15.352-.418-30.7 0a11.012 11.012 0 00-10.5 10.578q-.026 1.276-.049 2.552 25.9-.637 51.809 0-.023-1.276-.049-2.552a11.011 11.011 0 00-10.511-10.578z"
          transform="translate(1205.319 595.316)"
        />
        <path
          id="trash_svg__Path_7871"
          fill="url(#trash_svg__linear-gradient-2)"
          d="M142.112 137.721q-25.856-.742-51.711 0a2.727 2.727 0 00-2.639 2.619 2.449 2.449 0 002.549 2.485q25.946-.532 51.892 0a2.449 2.449 0 002.549-2.485 2.728 2.728 0 00-2.64-2.619z"
          transform="translate(1218.022 544.232)"
        />
      </g>
    </svg>
  );
}

export default SvgTrash;
