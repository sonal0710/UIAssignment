import * as React from "react";

export default function ColouredLine({ color }) {
  return (
    <hr
      style={{
          color: color,
          height: 5
      }}
    />
  );
}
