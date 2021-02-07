import * as React from "react";

function SvgClassesManagement(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 44 44" fill="none" {...props}>
      <g filter="url(#ClassesManagement_svg__filter0_d)">
        <path
          d="M29 3H17C11.477 3 7 7.477 7 13v12c0 5.523 4.477 10 10 10h12c5.523 0 10-4.477 10-10V13c0-5.523-4.477-10-10-10z"
          fill="url(#ClassesManagement_svg__paint0_linear)"
        />
      </g>
      <path
        d="M16.753 12.001h-.001c-.17 0-.33.068-.451.19a.659.659 0 00-.19.466v9.833c0 .36.29.654.645.655 1.5.004 4.011.322 5.744 2.168v-10.29a.637.637 0 00-.088-.332c-1.423-2.332-4.156-2.686-5.659-2.69zM29.889 22.489v-9.833a.66.66 0 00-.19-.466.63.63 0 00-.45-.19h-.002c-1.503.004-4.236.358-5.658 2.69a.637.637 0 00-.089.332v10.29c1.733-1.846 4.245-2.164 5.744-2.168a.652.652 0 00.645-.655z"
        fill="#fff"
      />
      <path
        d="M31.356 14.268h-.467v8.22c0 .921-.737 1.672-1.642 1.674-1.272.003-3.37.257-4.854 1.687 2.568-.64 5.276-.224 6.819.134a.634.634 0 00.546-.126.656.656 0 00.242-.513v-10.42a.65.65 0 00-.644-.656zM15.111 22.489v-8.221h-.467a.65.65 0 00-.644.655v10.421c0 .2.088.387.242.512a.633.633 0 00.546.127c1.543-.358 4.25-.774 6.82-.134-1.486-1.43-3.583-1.684-4.855-1.687-.905-.002-1.642-.753-1.642-1.673z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="ClassesManagement_svg__paint0_linear"
          x1={33.848}
          y1={31.224}
          x2={11.384}
          y2={4.728}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F51B1B" />
          <stop offset={1} stopColor="#7C1BC8" />
        </linearGradient>
        <filter
          id="ClassesManagement_svg__filter0_d"
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

export default SvgClassesManagement;
