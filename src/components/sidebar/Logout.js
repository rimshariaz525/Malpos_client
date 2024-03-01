import React from "react";
import { Box, Anchor } from "../elements";

export default function Logout({ data }) {
  return (
    <Box className=" text-start">
      <Anchor
        href={data?.path}
        icon={data?.icon}
        text={data?.text}
        className="mc-btn sm"
        style={{backgroungColor:"#0f6973"}}
      />
    </Box>
  );
}
