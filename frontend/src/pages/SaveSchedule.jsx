import React, { useState } from "react";
import { useFetch } from "../util/useFetch";

export const SaveSchedule = ({ schedule }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const courses = useFetch(import.meta.env.VITE_API + "course");

  const handleSelectChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleSave = () => {
    if (selectedCourse) {
      console.log("Curso seleccionado:", selectedCourse);

      // Crear un objeto para guardar en JSON
      const scheduleData = {
        course: selectedCourse,
        schedule: schedule,
      };

      // Convertir el objeto a JSON
      const jsonData = JSON.stringify(scheduleData, null, 2); // 2 espacios de indentación

      console.log("Horario guardado en JSON:", jsonData);
    } else {
      console.log("Selecciona un curso antes de guardar.");
    }
  };

  return (
    <div className="save-schedule-container">
      <h2>Selecciona un Curso</h2>
      <select
        value={selectedCourse}
        onChange={handleSelectChange}
        className="course-select"
      >
        <option value="">Selecciona un curso</option>
        {courses.map((course, index) => (
          <option
            key={index}
            value={`${course.YEAR_LEVEL} ${course.ROOM_NAME} ${course.TYPE_NAME} ${course.PER_CODE}`}
          >
            {`${course.YEAR_LEVEL} ${course.ROOM_NAME} ${course.TYPE_NAME} ${course.PER_CODE}`}
          </option>
        ))}
      </select>
      {selectedCourse && (
        <div className="selected-course">
          <h3>Curso Seleccionado:</h3>
          <p>{selectedCourse}</p>
          <button className="save-button" onClick={handleSave}>
            Guardar
          </button>
        </div>
      )}
    </div>
  );
};

