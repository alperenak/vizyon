import * as React from "react";

function SvgVlog(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 54 54" {...props}>
      <defs>
        <linearGradient
          id="vlog_svg__a"
          x1={0.5}
          x2={0.5}
          y1={1}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#5558ff" />
          <stop offset={1} stopColor="#00c0ff" />
        </linearGradient>
        <linearGradient
          id="vlog_svg__b"
          x1={0.5}
          x2={0.5}
          y1={1}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#addcff" />
          <stop offset={0.503} stopColor="#eaf6ff" />
          <stop offset={1} stopColor="#eaf6ff" />
        </linearGradient>
      </defs>
      <path
        fill="url(#vlog_svg__a)"
        d="M60.27 55.492a3.131 3.131 0 003.164 3.164h9.492a3.164 3.164 0 000-6.328 3.164 3.164 0 100-6.328h-9.492a3.164 3.164 0 100 6.328 3.131 3.131 0 00-3.164 3.164zm15.82 4.746H61.852a1.583 1.583 0 00-.877.266l-2.287 1.525v-9.7a1.581 1.581 0 00-1.582-1.582h-22.36A4.751 4.751 0 0030 55.492v31.746a1.581 1.581 0 001.582 1.582H76.09a1.581 1.581 0 001.582-1.582V61.82a1.581 1.581 0 00-1.582-1.582z"
        transform="translate(-26.836 -41.148)"
      />
      <path
        fill="url(#vlog_svg__b)"
        d="M27 22.254a6.328 6.328 0 10-6.328 6.328A6.335 6.335 0 0027 22.254zM11.18 41.238h18.984a1.581 1.581 0 001.582-1.582v-4.494c0-4.857-5.967-6.58-11.074-6.58S9.6 30.3 9.6 35.162v4.494a1.581 1.581 0 001.58 1.582zM52.418 0H30.27a1.567 1.567 0 00-1.582 1.582v22.254a1.6 1.6 0 002.468 1.329l4.335-2.911h16.927A1.567 1.567 0 0054 20.672V1.582A1.567 1.567 0 0052.418 0zM46.09 15.926H36.6a1.582 1.582 0 010-3.164h9.49a1.582 1.582 0 110 3.164zm0-6.328H36.6a1.582 1.582 0 010-3.164h9.49a1.582 1.582 0 110 3.164zm6.328 34.91H1.582A1.581 1.581 0 000 46.09 7.918 7.918 0 007.91 54h38.18A7.918 7.918 0 0054 46.09a1.581 1.581 0 00-1.582-1.582z"
      />
    </svg>
  );
}

export default SvgVlog;
