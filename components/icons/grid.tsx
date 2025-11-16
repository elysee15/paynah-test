import * as React from "react";

function GridIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M8.75 13A2.25 2.25 0 0111 15.25v3.5A2.25 2.25 0 018.75 21h-3.5A2.25 2.25 0 013 18.75v-3.5A2.25 2.25 0 015.25 13zm10 0A2.25 2.25 0 0121 15.25v3.5A2.25 2.25 0 0118.75 21h-3.5A2.25 2.25 0 0113 18.75v-3.5A2.25 2.25 0 0115.25 13zm-10-10A2.25 2.25 0 0111 5.25v3.5A2.25 2.25 0 018.75 11h-3.5A2.25 2.25 0 013 8.75v-3.5A2.25 2.25 0 015.25 3zm10 0A2.25 2.25 0 0121 5.25v3.5A2.25 2.25 0 0118.75 11h-3.5A2.25 2.25 0 0113 8.75v-3.5A2.25 2.25 0 0115.25 3z"
      />
    </svg>
  );
}

export default GridIcon;
