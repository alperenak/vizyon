import * as React from "react";

function SvgMore(props) {
  return (
    <svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="ellipsis-h"
      className="more_svg__svg-inline--fa more_svg__fa-ellipsis-h more_svg__fa-w-16"
      viewBox="0 0 512 512"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
      />
    </svg>
  );
}

export default SvgMore;
