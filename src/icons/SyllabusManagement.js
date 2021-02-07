import * as React from "react";

function SvgSyllabusManagement(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 44 44" fill="none" {...props}>
      <g filter="url(#SyllabusManagement_svg__filter0_d)">
        <path
          d="M29 3H17C11.477 3 7 7.477 7 13v12c0 5.523 4.477 10 10 10h12c5.523 0 10-4.477 10-10V13c0-5.523-4.477-10-10-10z"
          fill="url(#SyllabusManagement_svg__paint0_linear)"
        />
      </g>
      <path
        d="M30.115 12.178h-1.368v-.934c0-.687-.557-1.244-1.244-1.244h-.05c-.687 0-1.244.557-1.244 1.244v.934h-6.418v-.934c0-.687-.557-1.244-1.244-1.244h-.05c-.687 0-1.244.557-1.244 1.244v.934h-1.368c-.687 0-1.244.557-1.244 1.244v13.334c0 .687.557 1.244 1.244 1.244h14.23c.687 0 1.244-.557 1.244-1.244V13.422c0-.687-.557-1.244-1.244-1.244zm-.846 13.857H16.731v-10.1h12.538v10.1z"
        fill="#fff"
      />
      <path
        d="M18.435 20.505h2.164a.2.2 0 00.2-.199v-2.164a.2.2 0 00-.2-.2h-2.164a.2.2 0 00-.199.2v2.164c0 .11.09.2.199.2zM21.918 20.505h2.164a.2.2 0 00.2-.199v-2.164a.2.2 0 00-.2-.2h-2.164a.2.2 0 00-.2.2v2.164c0 .11.09.2.2.2zM25.4 20.505h2.165a.2.2 0 00.199-.199v-2.164a.2.2 0 00-.199-.2h-2.164a.2.2 0 00-.2.2v2.164c0 .11.09.2.2.2zM18.435 23.988h2.164c.11 0 .2-.09.2-.2v-2.163c0-.11-.09-.2-.2-.2h-2.164c-.11 0-.199.09-.199.2v2.164c0 .11.09.199.199.199zM21.918 23.988h2.164c.11 0 .2-.09.2-.2v-2.163c0-.11-.09-.2-.2-.2h-2.164a.2.2 0 00-.2.2v2.164a.2.2 0 00.2.199zM25.4 23.988h2.165c.11 0 .199-.09.199-.2v-2.163c0-.11-.09-.2-.199-.2h-2.164c-.11 0-.2.09-.2.2v2.164c0 .11.09.199.2.199z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="SyllabusManagement_svg__paint0_linear"
          x1={33.848}
          y1={31.224}
          x2={11.384}
          y2={4.728}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#68FF5B" />
          <stop offset={1} stopColor="#66BFFF" />
        </linearGradient>
        <filter
          id="SyllabusManagement_svg__filter0_d"
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

export default SvgSyllabusManagement;
