import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import { Schedule } from "./pages/Schedule.jsx";
import { Course } from "./pages/Course.jsx";

import "./sass/style.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Schedule />} />
          <Route path="/course" element={<Course />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
