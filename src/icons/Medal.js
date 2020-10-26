import * as React from "react";

function SvgMedal(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 54 61.44" {...props}>
      <defs>
        <linearGradient
          id="medal_svg__linear-gradient"
          x1={0.5}
          x2={0.5}
          y1={1}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#ffedad" />
          <stop offset={1} stopColor="#ffffe5" />
        </linearGradient>
        <linearGradient
          id="medal_svg__linear-gradient-2"
          x1={0.5}
          x2={0.5}
          y1={1}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#fd5900" />
          <stop offset={1} stopColor="#ffde00" />
        </linearGradient>
        <style>
          {".medal_svg__cls-1{fill:url(#medal_svg__linear-gradient)}"}
        </style>
      </defs>
      <g id="medal_svg__medal" transform="translate(-31)">
        <g id="medal_svg__Group_5729" transform="translate(31)">
          <g id="medal_svg__Medal_1_">
            <g id="medal_svg__Group_5728">
              <g id="medal_svg__Group_5727">
                <path
                  id="medal_svg__Path_7907"
                  d="M84.8.982A1.8 1.8 0 0083.2 0H68.8a1.8 1.8 0 00-1.464.758L58 14.127 48.664.758A1.8 1.8 0 0047.2 0H32.8a1.8 1.8 0 00-1.6.982 1.818 1.818 0 00.137 1.879L48.22 26.827a1.8 1.8 0 002.3.551 16.651 16.651 0 0112.029-1.187c.037.014.063.044.1.054a16.55 16.55 0 012.862 1.146 1.8 1.8 0 002.271-.565L84.664 2.861A1.818 1.818 0 0084.8.982z"
                  className="medal_svg__cls-1"
                  transform="translate(-31)"
                />
              </g>
            </g>
          </g>
        </g>
        <g id="medal_svg__Group_5730" transform="translate(38.233 21.673)">
          <path
            id="medal_svg__Path_7908"
            fill="url(#medal_svg__linear-gradient-2)"
            d="M110.767 221.9a19.927 19.927 0 01-9.137-37.551 20.248 20.248 0 0114.778-1.437 27.531 27.531 0 013.468 1.422 19.927 19.927 0 01-9.108 37.567z"
            transform="translate(-91 -182.137)"
          />
        </g>
        <g id="medal_svg__Group_5731" transform="translate(45.981 29.036)">
          <path
            id="medal_svg__Path_7909"
            d="M173.7 265.6l-5.46-2.946-5.522 2.827a1.807 1.807 0 01-2.6-1.934l1.114-6.1-4.4-4.376a1.809 1.809 0 011.035-3.075l6.149-.826 2.8-5.533a1.841 1.841 0 011.632-.991 1.806 1.806 0 011.61 1.026l2.686 5.591 6.13.957a1.809 1.809 0 01.969 3.1l-4.489 4.282.984 6.126a1.808 1.808 0 01-2.638 1.872z"
            className="medal_svg__cls-1"
            transform="translate(-156.302 -242.644)"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgMedal;
