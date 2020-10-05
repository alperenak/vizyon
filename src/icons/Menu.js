import * as React from "react";

function SvgMenu(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 32.5 32.5" {...props}>
      <defs>
        <filter
          id="menu_svg__Rectangle_8749"
          width={20.441}
          height={20.441}
          x={0}
          y={0}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dx={-1} dy={2} />
          <feGaussianBlur result="blur" stdDeviation={2} />
          <feFlood floodColor="#390b93" />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="menu_svg__Rectangle_8750"
          width={20.441}
          height={20.441}
          x={0}
          y={12.059}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dx={-1} dy={2} />
          <feGaussianBlur result="blur-2" stdDeviation={2} />
          <feFlood floodColor="#390b93" />
          <feComposite in2="blur-2" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="menu_svg__Rectangle_8751"
          width={20.441}
          height={20.441}
          x={12.059}
          y={0}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dx={-1} dy={2} />
          <feGaussianBlur result="blur-3" stdDeviation={2} />
          <feFlood floodColor="#390b93" />
          <feComposite in2="blur-3" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="menu_svg__Rectangle_8752"
          width={20.441}
          height={20.441}
          x={12.059}
          y={12.059}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dx={-1} dy={2} />
          <feGaussianBlur result="blur-4" stdDeviation={2} />
          <feFlood floodColor="#390b93" />
          <feComposite in2="blur-4" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <style>{".menu_svg__cls-1{fill:#fff}"}</style>
      </defs>
      <g id="menu_svg__Group_5638">
        <g filter="url(#menu_svg__Rectangle_8749)">
          <rect
            id="menu_svg__Rectangle_8749-2"
            width={8.441}
            height={8.441}
            className="menu_svg__cls-1"
            rx={3}
            transform="translate(7 4)"
          />
        </g>
        <g filter="url(#menu_svg__Rectangle_8750)">
          <rect
            id="menu_svg__Rectangle_8750-2"
            width={8.441}
            height={8.441}
            className="menu_svg__cls-1"
            rx={3}
            transform="translate(7 16.06)"
          />
        </g>
        <g filter="url(#menu_svg__Rectangle_8751)">
          <rect
            id="menu_svg__Rectangle_8751-2"
            width={8.441}
            height={8.441}
            className="menu_svg__cls-1"
            rx={3}
            transform="translate(19.06 4)"
          />
        </g>
        <g filter="url(#menu_svg__Rectangle_8752)">
          <rect
            id="menu_svg__Rectangle_8752-2"
            width={8.441}
            height={8.441}
            className="menu_svg__cls-1"
            rx={3}
            transform="translate(19.06 16.06)"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgMenu;
