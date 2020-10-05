import * as React from "react";

function SvgComunication(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 54 54" {...props}>
      <defs>
        <linearGradient
          id="comunication_svg__a"
          x1={0.5}
          x2={0.5}
          y1={1}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#ffe59a" />
          <stop offset={1} stopColor="#ffffd5" />
        </linearGradient>
        <linearGradient
          id="comunication_svg__b"
          x1={0.5}
          x2={0.5}
          y1={1}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#fd5900" />
          <stop offset={1} stopColor="#ffde00" />
        </linearGradient>
      </defs>
      <path
        fill="url(#comunication_svg__a)"
        d="M95.551 0h-27.97C63.46 0 61 4.14 61 11.074c0 6.9 2.3 10.909 6.328 11.07v1.586a1.583 1.583 0 002.29 1.415l5.994-3h11.909l5.994 3A1.584 1.584 0 0095.8 23.73v-1.586c3.967-.168 6.328-4.278 6.328-11.07C102.133 4.037 99.735 0 95.551 0z"
        transform="translate(-54.566)"
      />
      <path
        fill="url(#comunication_svg__b)"
        d="M17.4 115.523a6.328 6.328 0 10-6.328 6.328 6.335 6.335 0 006.328-6.328zm-6.328 6.328C5.967 121.852 0 123.574 0 128.432v4.494a1.581 1.581 0 001.582 1.582h18.984a1.581 1.581 0 001.582-1.582v-4.494c0-4.858-5.966-6.58-11.074-6.58zm38.18-6.328a6.328 6.328 0 10-6.328 6.328 6.335 6.335 0 006.33-6.328zm-6.328 6.328c-5.108 0-11.074 1.723-11.074 6.58v4.494a1.581 1.581 0 001.582 1.582h18.986A1.581 1.581 0 0054 132.926v-4.494c0-4.858-5.967-6.58-11.074-6.58zM20.672 90a1.582 1.582 0 101.582 1.582A1.582 1.582 0 0020.672 90zM27 90a1.582 1.582 0 101.582 1.582A1.582 1.582 0 0027 90zm6.328 3.164a1.582 1.582 0 10-1.582-1.582 1.582 1.582 0 001.582 1.582z"
        transform="translate(0 -80.508)"
      />
    </svg>
  );
}

export default SvgComunication;
