import * as React from "react";

function SvgAnnouncements(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 44 44" fill="none" {...props}>
      <g filter="url(#Announcements_svg__filter0_d)">
        <path
          d="M29 3H17C11.477 3 7 7.477 7 13v12c0 5.523 4.477 10 10 10h12c5.523 0 10-4.477 10-10V13c0-5.523-4.477-10-10-10z"
          fill="url(#Announcements_svg__paint0_linear)"
        />
      </g>
      <g clipPath="url(#Announcements_svg__clip0)" fill="#fff">
        <path d="M30.189 20.233a.361.361 0 01-.112.066l-9.265 3.39a.354.354 0 01-.389-.1l-2.795-3.201a.354.354 0 01-.047-.399l4.606-8.724a.354.354 0 01.58-.068l7.456 8.536a.353.353 0 01-.034.5zm-9.392 2.706l8.553-3.128-6.777-7.76-4.251 8.054 2.475 2.834z" />
        <path d="M20.923 23.622l-1.867 1.631a1.418 1.418 0 01-1.999-.135l-1.398-1.6a1.418 1.418 0 01.135-2l1.868-1.63a.354.354 0 01.5.034l2.795 3.2a.354.354 0 01-.034.5zm-4.663-1.57a.709.709 0 00-.067 1l1.397 1.6a.709.709 0 001 .068l1.6-1.398-2.33-2.668-1.6 1.398z" />
        <path d="M25.252 26.425l-1.6 1.398a.354.354 0 01-.465.001l-3.795-3.269a.354.354 0 11.463-.535l3.562 3.067 1.07-.934-3.13-2.866a.356.356 0 01-.023-.5.36.36 0 01.5-.023l3.423 3.134a.353.353 0 01-.005.527zM26.13 13.432a.354.354 0 01-.574-.36l.669-2.464a.354.354 0 01.683.186l-.669 2.465a.35.35 0 01-.108.173zM31.924 16.837a.35.35 0 01-.186.084l-2.533.33a.355.355 0 01-.092-.702l2.532-.33a.355.355 0 01.28.617zM29.362 13.902l-1.6 1.398a.354.354 0 01-.466-.534l1.6-1.398a.354.354 0 01.466.534z" />
        <path
          d="M20.633 22.867l-2.266-2.834 3.966-7.933 7.367 7.933-9.067 2.834z"
          stroke="#fff"
        />
        <path d="M20.633 23.433L17.8 20.6l-2.267 1.7 1.134 1.7.566.567 1.134.566 2.266-1.7z" />
        <path d="M23.467 27.4l-3.4-2.833V24l.566-.567h1.134l2.833 2.834-1.133 1.133z" />
      </g>
      <defs>
        <linearGradient
          id="Announcements_svg__paint0_linear"
          x1={33.848}
          y1={31.224}
          x2={11.384}
          y2={4.728}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9BADEB" />
          <stop offset={1} stopColor="#66E3FF" />
        </linearGradient>
        <clipPath id="Announcements_svg__clip0">
          <path
            fill="#fff"
            transform="rotate(-41.13 29.731 -5.569)"
            d="M0 0h17v17H0z"
          />
        </clipPath>
        <filter
          id="Announcements_svg__filter0_d"
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

export default SvgAnnouncements;
