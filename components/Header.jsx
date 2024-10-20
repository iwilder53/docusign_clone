import React from "react";
import { Box, Column, Heading } from "gestalt";
import "gestalt/dist/gestalt.css";

const Header = () => {
  return (
    <div className="flex flex-row py-1 bg-slate-200">
      <Column span={10}>
        <Box padding={3}>
          <p className=" text-gray-900 text-4xl">
            {" "}
            Fundasta Technical Challenge
          </p>
          <p className=" text-gray-900 text-xl"> Submission by Y Bagaria</p>
        </Box>
      </Column>
    </div>
  );
};

export default Header;
