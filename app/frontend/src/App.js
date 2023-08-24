import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Worker from "./scenes/worker";
import AddWorker from "./scenes/worker/addWorker";
import EditWorker from "./scenes/worker/editWorker";
import FAQ from "./scenes/faq";
import Login from "./scenes/login";
import Logout from "./scenes/logout";
import Board from "./scenes/board";
import AddBoard from "./scenes/board/addBoard";
import SeeBoard from "./scenes/board/seeBoard";
import SeeDailyBoard from "./scenes/board/daily";
import SeeMonthlyBoard from "./scenes/board/monthly";
import SeeYearlyBoard from "./scenes/board/yearly";
import RemoveBoard from "./scenes/board/removeBoard";
import RemoveWorker from "./scenes/worker/removeWorker";
import RemovePatient from "./scenes/patients/removePatient";
import SeePatients from "./scenes/patients/seePatients";
import AddPatients from "./scenes/patients/addPatients";
import EditPatient from "./scenes/patients/editPatient";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import SeeSensors from "./scenes/sensor/";
import AddSensor from "./scenes/sensor/addSensor";
import RemoveSensor from "./scenes/sensor/removeSensor";
import EditSensor from "./scenes/sensor/editSensor";
import React, { useEffect } from 'react';
import { PROJECT_TITLE } from "./config.js";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  useEffect(() => {
    document.title = PROJECT_TITLE;
  }, []);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/worker" element={<Worker />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/addWorker" element={<AddWorker />} />
              <Route path="/editWorker/:id" element={<EditWorker />} />
              <Route path="/removeWorker/:id" element = {<RemoveWorker/>} />
              <Route path="/removePatient/:id" element = {<RemovePatient/>} />
              <Route path="/seePatients/:id" element = {<SeePatients/>} />
              <Route path="/addPatient/:id" element = {<AddPatients/>} />
              <Route path="/editPatient/:board_id/:patient_id/" element={<EditPatient />} />
              <Route path="/boards" element={<Board />} />
              <Route path="/seeBoard/:id/:board_id" element={<SeeBoard />} />
              <Route path="/seeboard/daily/:id/:board_id" element={<SeeDailyBoard />} />
              <Route path="/seeBoard/monthly/:id/:board_id" element={<SeeMonthlyBoard />} />
              <Route path="/seeBoard/yearly/:id/:board_id" element={<SeeYearlyBoard />} />
              <Route path="/removeBoard/:id" element={<RemoveBoard />} />
              <Route path="/addBoard" element={<AddBoard />} />
              <Route path="/seeSensors" element={<SeeSensors />} />
              <Route path="/addSensor" element={<AddSensor />} />
              <Route path="/removeSensor/:id" element={<RemoveSensor />} />
              <Route path="/editSensor/:id" element={<EditSensor />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;