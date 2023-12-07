import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { SiRobotframework } from "react-icons/si";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnim />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 10,
          }}
        >
         
          
        </Box>
        <Box sx={{ display: "flex", mx: "auto" }}>
          <SiRobotframework size={200} color={"#51538f"} />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;