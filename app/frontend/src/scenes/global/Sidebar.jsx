import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Accessible, Inventory } from "@mui/icons-material";
import SensorsIcon from '@mui/icons-material/Sensors';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';

const Item = ({ title, to, icon, selected, setSelected }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    /**
     * 
     * This JSX function renders a MenuItem that displays a title and an icon. 
     * If the item is selected (selected === title), it is visually highlighted. 
     * Clicking on the item sets the title as selected (setSelected(title)) 
     * and redirects to the specified link (to) using React Router's Link.
     * 
     */
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const Sidebar = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    const userID = localStorage.getItem('userID');

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    {/**
                                     * 
                                     * Renders a Typography component that displays the user name (userName)
                                     * 
                                     */}
                                    <Typography variant="h3" color={colors.grey[100]}>
                                        {userName ? `${userName}` : '¡Inicia sesión!'}
                                    </Typography>
                                </Typography>

                                {/**
                                 * 
                                 * Renders a Typography component that displays the user role (userRole)
                                 * 
                                 */}
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    {userRole && `${userRole}`}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/**
                         * 
                         * If the user role is 'doctor', it renders a 
                         * MenuItem that displays the title 'Manage workers' and
                         * MenuItem that displays the title 'Create a worker' and
                         * 
                         */}
                        {userRole === 'admin' && (
                            <div>
                                <Typography
                                    variant="h6"
                                    color={colors.grey[300]}
                                    sx={{ m: "15px 0 5px 20px" }}
                                >
                                    Workers
                                </Typography>

                                <Item
                                    title="Manage workers"
                                    to="/worker"
                                    icon={<PeopleOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />

                                <Item
                                    title="Add a worker"
                                    to="/addWorker"
                                    icon={<PersonAddIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </div>
                        )}

                        
                        {/**
                         * 
                         * If the user role is 'doctor', it renders a 
                         * Typography that displays the title 'Patients'
                         * 
                         */}
                        {(userRole === 'doctor') && (
                            <Typography
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{ m: "15px 0 5px 20px" }}
                            >
                                Patients
                            </Typography>
                        )}

                        {/**
                         * 
                         * If the user role is 'doctor', it renders a 
                         * MenuItem that displays the title 'See patients'
                         * 
                         */}
                        {userRole === 'doctor' && (
                            <Item
                                title="See patients"
                                to={`/seePatients/${userID}`}
                                icon={<Accessible />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}


                        {/**
                         * 
                         * If the user role is 'doctor' or 'admin', it renders a 
                         * Typography that displays the title 'Boards'
                         * 
                         */}
                        {(userRole === 'doctor' || userRole === 'admin') && (
                            <Typography
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{ m: "15px 0 5px 20px" }}
                            >
                                Boards
                            </Typography>
                        )}

                        {/**
                         * 
                         * If the user role is 'doctor' or 'admin', it renders a 
                         * MenuItem that displays the title 'Manage boards'
                         * 
                         */}
                        {(userRole === 'doctor' || userRole === 'admin') && (
                            <Item
                                title="Manage boards"
                                to="/boards"
                                icon={<Inventory />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                        )}

                        {/**
                         * 
                         * If the user role is 'admin' or doctor, it renders a 
                         * MenuItem that displays the title 'See sensors'
                         * 
                         */}
                        {(userRole === 'doctor' || userRole === 'admin') && (
                            <Item
                                title="Add board"
                                to="/addBoard"
                                icon={<AddIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}

                         {/**
                         * 
                         * If the user role is 'doctor' or 'admin', it renders a 
                         * Typography that displays the title 'Sensors'
                         * 
                         */}
                        {(userRole === 'admin') && (
                            <Typography
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{ m: "15px 0 5px 20px" }}
                            >
                                Sensors
                            </Typography>
                        )}

                        {/**
                         * 
                         * If the user role is 'admin', it renders a 
                         * MenuItem that displays the title 'See sensors'
                         * 
                         */}
                        {userRole === 'admin' && (
                            <Item
                                title="See sensors"
                                to="/seeSensors"
                                icon={<SensorsIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}

                        {/**
                         * 
                         * If the user role is 'admin', it renders a 
                         * MenuItem that displays the title 'Add sensors'
                         * 
                         */}
                        {userRole === 'admin' && (
                            <Item
                                title="Add sensors"
                                to="/addSensor"
                                icon={<AddBoxIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}


                        <Item
                            title="FAQ Page"
                            to="/faq"
                            icon={<HelpOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;