import * as React from "react";

function SvgXls(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 52 29" {...props}>
      <defs>
        <filter
          id="xls_svg__a"
          width={52}
          height={29}
          x={0}
          y={0}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy={1} />
          <feGaussianBlur result="blur" stdDeviation={1} />
          <feFlood floodColor="#5ebf9b" />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g filter="url(#xls_svg__a)">
        <rect
          width={46}
          height={23}
          fill="#fff"
          rx={7}
          transform="translate(3 2)"
        />
      </g>
      <text
        fill="#5ebf9b"
        fontFamily="SofiaPro-Black, Sofia Pro"
        fontSize={10}
        fontWeight={800}
        letterSpacing=".03em"
        transform="translate(23 17)"
      >
        <tspan x={0} y={0}>
          {"XLS"}
        </tspan>
      </text>
      <g fill="#5ebf9b" strokeMiterlimit={10}>
        <path d="M14 18.422a1.27 1.27 0 01-.912-.394L9.59 14.381a.94.94 0 01.015-1.31.903.903 0 011.297.015l2.186 2.28.03-5.506c0-.51.411-.927.916-.927.504 0 .915.416.915.928l-.031 5.489 2.178-2.287a.899.899 0 01.658-.283c.24 0 .466.093.638.263a.94.94 0 01.02 1.31l-3.499 3.673-.023.024c-.204.203-.46.328-.742.361a.923.923 0 01-.148.012z" />
        <path d="M14 18.222c.04 0 .08-.003.12-.01a1.06 1.06 0 00.629-.304l.02-.02 3.498-3.673a.738.738 0 00-.015-1.03.706.706 0 00-1.011.014l-2.526 2.653.034-5.99a.722.722 0 00-.715-.728.722.722 0 00-.715.728l-.034 6-2.527-2.637a.707.707 0 00-1.012-.011.738.738 0 00-.011 1.03l3.497 3.647c.181.189.413.296.651.323.038.006.077.01.117.01m0 .4c-.057 0-.115-.005-.17-.014a1.473 1.473 0 01-.887-.442L9.446 14.52a1.141 1.141 0 01.018-1.59 1.1 1.1 0 01.782-.325c.304 0 .589.122.8.343l1.844 1.922.029-5.012c0-.62.5-1.126 1.115-1.126.614 0 1.115.506 1.115 1.128l-.029 4.986 1.83-1.922c.212-.223.497-.345.803-.345.293 0 .57.114.779.321a1.14 1.14 0 01.023 1.59l-3.498 3.673-.026.027a1.446 1.446 0 01-.857.418c-.057.01-.116.014-.175.014z" />
      </g>
    </svg>
  );
}

export default SvgXls;
