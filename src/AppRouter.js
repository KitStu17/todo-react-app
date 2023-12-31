import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Student of Kumoh National Institute of Technology,{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<App />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
