import * as React from "react";

function SvgOdev(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 44 44" fill="none" {...props}>
      <g filter="url(#odev_svg__filter0_d)">
        <path
          d="M29 3H17C11.477 3 7 7.477 7 13v12c0 5.523 4.477 10 10 10h12c5.523 0 10-4.477 10-10V13c0-5.523-4.477-10-10-10z"
          fill="url(#odev_svg__paint0_linear)"
        />
      </g>
      <g clipPath="url(#odev_svg__clip0)">
        <path
          d="M17.276 18.532l5.256-5.256-1.723-1.724-2.41 2.41a.31.31 0 01-.437 0l-.438-.438a.31.31 0 010-.438l2.41-2.41-1.315-1.314a1.239 1.239 0 00-1.752 0l-3.504 3.504a1.24 1.24 0 000 1.752l3.913 3.914zm15.174-4.563a1.877 1.877 0 000-2.653l-1.768-1.768a1.877 1.877 0 00-2.654 0l-1.797 1.797 4.421 4.422 1.798-1.798zm-7.103-1.74l-11.602 11.6-.733 4.198a.83.83 0 00.96.96l4.198-.737 11.598-11.599-4.421-4.421zm7.29 11.15l-1.314-1.314-2.41 2.41a.31.31 0 01-.438 0l-.437-.438a.31.31 0 010-.438l2.409-2.41-1.724-1.724-5.257 5.257 3.914 3.914a1.239 1.239 0 001.753 0l3.504-3.504a1.239 1.239 0 000-1.753z"
          fill="#fff"
        />
      </g>
      <defs>
        <linearGradient
          id="odev_svg__paint0_linear"
          x1={33.848}
          y1={31.224}
          x2={11.384}
          y2={4.728}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF9E45" />
          <stop offset={1} stopColor="#B8A6FF" />
        </linearGradient>
        <clipPath id="odev_svg__clip0">
          <path fill="#fff" transform="translate(13 9)" d="M0 0h20v20H0z" />
        </clipPath>
        <filter
          id="odev_svg__filter0_d"
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
          <feColorMatrix values="0 0 0 0 0.196078 0 0 0 0 0.0117647 0 0 0 0 0.564706 0 0 0 0.635 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export default SvgOdev;
