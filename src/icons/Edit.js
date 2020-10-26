import * as React from "react";

function SvgEdit(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 44 44" {...props}>
      <defs>
        <clipPath id="edit_svg__clip-path">
          <path
            id="edit_svg__Profile"
            d="M10.8 12H1.2A1.2 1.2 0 010 10.8v-.253a2.391 2.391 0 01.889-1.865A7.947 7.947 0 016 7.2a7.947 7.947 0 015.111 1.482A2.391 2.391 0 0112 10.547v.253a1.2 1.2 0 01-1.2 1.2zM6 6.6a3.72 3.72 0 01-2.039-.967A3.107 3.107 0 012.7 3.3a3.3 3.3 0 116.6 0 3.107 3.107 0 01-1.261 2.333A3.72 3.72 0 016 6.6z"
            className="edit_svg__cls-1"
          />
        </clipPath>
        <filter
          id="edit_svg__Path_7430"
          width={44}
          height={44}
          x={0}
          y={0}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy={3} />
          <feGaussianBlur result="blur" stdDeviation={3} />
          <feFlood floodColor="#81a7d8" floodOpacity={0.345} />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <style>{".edit_svg__cls-1{fill:#001f5c}"}</style>
      </defs>
      <g id="edit_svg__edit" transform="translate(-1404 -325)">
        <g filter="url(#edit_svg__Path_7430)" transform="translate(1404 325)">
          <path
            id="edit_svg__Path_7430-2"
            fill="#fff"
            d="M13 0A13 13 0 110 13 13 13 0 0113 0z"
            transform="translate(9 6)"
          />
        </g>
        <g id="edit_svg__Group_5608" transform="translate(-271)">
          <g id="edit_svg__Profile-2" transform="translate(1690 338)">
            <path id="edit_svg__Surface" fill="none" d="M0 0h12v12H0z" />
            <path
              id="edit_svg__Profile-3"
              d="M10.8 12H1.2A1.2 1.2 0 010 10.8v-.253a2.391 2.391 0 01.889-1.865A7.947 7.947 0 016 7.2a7.947 7.947 0 015.111 1.482A2.391 2.391 0 0112 10.547v.253a1.2 1.2 0 01-1.2 1.2zM6 6.6a3.72 3.72 0 01-2.039-.967A3.107 3.107 0 012.7 3.3a3.3 3.3 0 116.6 0 3.107 3.107 0 01-1.261 2.333A3.72 3.72 0 016 6.6z"
              className="edit_svg__cls-1"
            />
          </g>
          <g id="edit_svg__Path_7429" fill="#001f5c" stroke="none">
            <path
              d="M12.24 19.78a.967.967 0 01-.682-.283.969.969 0 01-.266-.848l.327-1.854a.956.956 0 01.266-.512l4.583-4.582c.434-.435.86-.526 1.142-.526.365 0 .714.148.983.417l.763.763c.299.298.463.694.463 1.117 0 .422-.164.819-.463 1.117l-4.581 4.582a.959.959 0 01-.516.268l-1.852.326a.902.902 0 01-.167.015z"
              transform="translate(1686.568 330.72)"
            />
            <path
              fill="#fff"
              d="M12.24 19.28a.433.433 0 00.08-.007l1.854-.327a.453.453 0 00.247-.129l4.582-4.581a1.082 1.082 0 000-1.528l-.763-.763a.896.896 0 00-.63-.27c-.242 0-.514.104-.788.38l-4.582 4.58a.465.465 0 00-.128.247l-.327 1.854a.459.459 0 00.128.408.46.46 0 00.327.136m1.854-.79h.006-.006m-1.854 1.79a1.46 1.46 0 01-1.44-1.718l.327-1.853c.05-.292.19-.563.403-.777l4.585-4.585c.554-.556 1.119-.672 1.495-.672.499 0 .973.2 1.337.563l.763.763c.393.392.609.915.609 1.47 0 .557-.216 1.08-.609 1.472l-4.582 4.581a1.44 1.44 0 01-.782.407l-1.85.326a1.46 1.46 0 01-.256.023z"
              transform="translate(1686.568 330.72)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SvgEdit;
