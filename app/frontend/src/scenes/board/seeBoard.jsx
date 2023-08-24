import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const HomeComponent = () => {

    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id, board_id } = useParams();

    // Handle the click on the "daily" button
    const handleByDay = (id, board_id) => {
        navigate(`/seeBoard/daily/${id}/${board_id}`);
    };

    // Handle the click on the "monthly" button
    const handleByMonth = (id, board_id) => {
        navigate(`/seeBoard/monthly/${id}/${board_id}`);
    };

    // Handle the click on the "yearly" button
    const handleByYear = (id, board_id) => {
        navigate(`/seeBoard/yearly/${id}/${board_id}`);
    };

    // Return the component
    return (
        <Box m="20px" >
            <Box display="flex" justifyContent="center" alignItems="center" margin="50px">
                <Header title="Board data selection" subtitle="How do you want to view the data, by day, month or year?" />
            </Box>
            <Box display="flex" justifyContent="space-evenly" alignItems="center">
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Daily</div>
                    <Button
                        sx={{
                            backgroundColor: colors.greenAccent[600],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        onClick={() => handleByDay(id, board_id)}
                    >
                        Daily
                    </Button>
                </div>

                <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Monthly</div>
                    <Button
                        sx={{
                            backgroundColor: colors.greenAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        onClick={() => handleByMonth(id, board_id)}
                    >
                        Monthly
                    </Button>
                </div>

                <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Yearly</div>
                    <Button
                        sx={{
                            backgroundColor: colors.greenAccent[800],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        onClick={() => handleByYear(id, board_id)}
                    >
                        Yearly
                    </Button>
                </div>
            </Box>
        </Box>
    );
};

export default HomeComponent;