import * as React from "react";

function SvgInfo(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 14.4 14.4" {...props}>
      <path
        fill="#001f5c"
        stroke="#001f5c"
        strokeWidth={0.4}
        d="M7.2 14.2a7 7 0 117-7 7 7 0 01-7 7zm0-1.273A5.727 5.727 0 101.473 7.2 5.727 5.727 0 007.2 12.927zM6.564 10.7a.636.636 0 11.636.636.636.636 0 01-.636-.636zm0-6.841a.636.636 0 111.273 0v4.455a.636.636 0 11-1.273 0z"
      />
    </svg>
  );
}

export default SvgInfo;
