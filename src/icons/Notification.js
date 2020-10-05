import * as React from "react";

function SvgNotification(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 22.5 25.5" {...props}>
      <defs>
        <filter
          id="notification_svg__Path_425-2"
          width={20.001}
          height={19.533}
          x={0}
          y={2}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dx={-1} dy={2} />
          <feGaussianBlur result="blur" stdDeviation={0.5} />
          <feFlood floodColor="#390b93" floodOpacity={0.282} />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="notification_svg__Path_426"
          width={8.884}
          height={6.425}
          x={5.567}
          y={19.075}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dx={-1} dy={2} />
          <feGaussianBlur result="blur-2" stdDeviation={0.5} />
          <feFlood floodColor="#390b93" floodOpacity={0.282} />
          <feComposite in2="blur-2" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <style>{".notification_svg__cls-1{fill:#fff}"}</style>
      </defs>
      <g id="notification_svg__Group_5635" transform="translate(-1342.5 -44)">
        <g id="notification_svg__Notification">
          <g
            filter="url(#notification_svg__Path_425-2)"
            transform="translate(1342.5 44)"
          >
            <path
              id="notification_svg__Path_425-2-2"
              d="M0 11.912v-.2a3.744 3.744 0 01.6-1.84 5.108 5.108 0 001.19-2.356c.045-.667 0-1.351.045-2.027C2.158 2.24 5.37 0 8.448 0h.089c3.132 0 6.263 2.24 6.6 5.485.063.667 0 1.36.054 2.027a5.011 5.011 0 001.19 2.356 3.541 3.541 0 01.619 1.84v.2a3.658 3.658 0 01-.895 2.418 4.484 4.484 0 01-2.854 1.4 37.719 37.719 0 01-9.6 0 4.484 4.484 0 01-2.818-1.4A3.6 3.6 0 010 11.912z"
              className="notification_svg__cls-1"
              transform="translate(2.5 2)"
            />
          </g>
          <g
            filter="url(#notification_svg__Path_426)"
            transform="translate(1342.5 44)"
          >
            <path
              id="notification_svg__Path_426-2"
              d="M4.1.02c-.635-.044-1.154 0-1.673 0A6.347 6.347 0 00.895.18C.465.278 0 .509 0 1a1.581 1.581 0 00.7 1.162 3.721 3.721 0 002.682.738A3.118 3.118 0 005.7 1.593.885.885 0 005.547.358 3.328 3.328 0 004.1.02z"
              className="notification_svg__cls-1"
              transform="translate(8.07 19.08)"
            />
          </g>
        </g>
        <circle
          id="notification_svg__Oval"
          cx={4}
          cy={4}
          r={4}
          fill="#f53267"
          stroke="#6e2af5"
          strokeWidth={2}
          transform="translate(1356 45)"
        />
      </g>
    </svg>
  );
}

export default SvgNotification;
