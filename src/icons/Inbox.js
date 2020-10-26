import * as React from "react";

function SvgInbox(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 54 50.625" {...props}>
      <defs>
        <linearGradient
          id="Inbox_svg__a"
          x1={0.5}
          x2={0.5}
          y1={1}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#00b59c" />
          <stop offset={1} stopColor="#9cffac" />
        </linearGradient>
        <linearGradient
          id="Inbox_svg__b"
          x1={0.5}
          x2={0.5}
          y1={1}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#c3ffe8" />
          <stop offset={0.997} stopColor="#f0fff4" />
        </linearGradient>
      </defs>
      <path
        fill="url(#Inbox_svg__a)"
        d="M52.418 316H39.656a1.579 1.579 0 00-1.118.464l-5.865 5.877H21.327l-5.865-5.877a1.579 1.579 0 00-1.118-.464H1.582A1.583 1.583 0 000 317.585v15.853a1.583 1.583 0 001.582 1.585h50.836A1.583 1.583 0 0054 333.439v-15.854A1.583 1.583 0 0052.418 316z"
        transform="translate(0 -284.399)"
      />
      <path
        fill="url(#Inbox_svg__b)"
        d="M171.589 35.024h-4.756V17.585A1.584 1.584 0 00165.247 16h-6.341a1.584 1.584 0 00-1.585 1.585v17.439h-4.756a1.587 1.587 0 00-1.27 2.536l9.512 12.683a1.588 1.588 0 002.539 0l9.512-12.683a1.587 1.587 0 00-1.269-2.536z"
        transform="translate(-135.077 -16)"
      />
    </svg>
  );
}

export default SvgInbox;
