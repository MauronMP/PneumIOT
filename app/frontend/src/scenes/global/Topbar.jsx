import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from 'react-router-dom';

const Topbar = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const userEmail = localStorage.getItem('userEmail');

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
      </Box>

      {/**
       * 
       * Display the color mode depending on the current theme
       * 
      */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        {/**
         * 
         * If the user is authenticated, show the button with the link to the logout page
         * 
         */}
        {userEmail ? (
          <Link to="/logout">
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>
          </Link>
        ) : (
         /**
          * 
          * If the user is not authenticated, show the button with the link to the login page
          * 
          */
          <Link to="/login">
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;