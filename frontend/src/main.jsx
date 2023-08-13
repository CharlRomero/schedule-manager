import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import { Schedule } from "./pages/Schedule.jsx";
import { Course } from "./pages/Course.jsx";
import "./sass/style.scss";
import { Room } from "./pages/Room.jsx";
import { Period } from "./pages/Period.jsx";
import { Subject } from "./pages/Subject.jsx";
import { Slot } from "./pages/Slot.jsx";
import { EducationType } from "./pages/EducationType.jsx";
import { Table } from "./pages/Table.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Schedule />} />
          <Route path="/course" element={<Course />} />
          <Route path="/room" element={<Room />} />
          <Route path="/period" element={<Period />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/slot" element={<Slot />} />
          <Route path="/educationtype" element={<EducationType/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
