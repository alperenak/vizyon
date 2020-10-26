import * as React from "react";

function SvgFolderImages(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 84.706 66" {...props}>
      <defs>
        <linearGradient
          id="folderImages_svg__a"
          x1={0.049}
          x2={0.967}
          y1={0.452}
          y2={0.66}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#ffc107" />
          <stop offset={1} stopColor="#ffc107" />
        </linearGradient>
        <linearGradient
          id="folderImages_svg__c"
          x1={0.97}
          x2={-0.015}
          y1={0.914}
          y2={0.026}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#fff5e5" />
          <stop offset={0.507} stopColor="#fde69e" />
          <stop offset={1} stopColor="#ffdd76" />
        </linearGradient>
        <linearGradient
          id="folderImages_svg__d"
          x1={0.431}
          x2={0.724}
          y1={1}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#ffa000" />
          <stop offset={1} stopColor="#ffd65a" />
        </linearGradient>
        <clipPath id="folderImages_svg__b">
          <rect
            width={50}
            height={34}
            fill="url(#folderImages_svg__a)"
            rx={5}
            transform="translate(722 879)"
          />
        </clipPath>
      </defs>
      <path
        fill="#ffa000"
        d="M68.824 6H15.882a8.823 8.823 0 00-8.823 8.823v3.53a1.765 1.765 0 001.765 1.765H23.93a1.789 1.789 0 011.676 1.186l1.924 5.82a5.333 5.333 0 005.012 3.582h43.34a1.765 1.765 0 001.765-1.765V14.823A8.824 8.824 0 0068.824 6z"
      />
      <g clipPath="url(#folderImages_svg__b)" transform="translate(-699 -879)">
        <rect
          width={50}
          height={34}
          fill="url(#folderImages_svg__c)"
          rx={6}
          transform="translate(722 879)"
        />
        <path
          fill="url(#folderImages_svg__d)"
          d="M33.933 159.826a4.413 4.413 0 10-4.413-4.413 4.418 4.418 0 004.413 4.413zm3.982 8.4a1.471 1.471 0 00-2.08 0l-4.844 4.844-10.742-13.431a1.471 1.471 0 00-2.189-.121L0 177.479v1.471a1.457 1.457 0 001.471 1.471h47.271a1.692 1.692 0 001.059-.412z"
          transform="translate(722.199 732.428)"
        />
      </g>
      <path
        fill="#ffc107"
        d="M79.412 27.176H32.541a1.814 1.814 0 01-1.676-1.186l-1.924-5.82a5.336 5.336 0 00-5.012-3.582H5.294A5.294 5.294 0 000 21.882a50.031 50.031 0 002.086 14.339l7.059 23.478a8.823 8.823 0 008.467 6.3h49.835a8.823 8.823 0 008.291-5.735l7.624-20.337a21.4 21.4 0 001.345-7.458 5.294 5.294 0 00-5.295-5.293z"
      />
    </svg>
  );
}

export default SvgFolderImages;
