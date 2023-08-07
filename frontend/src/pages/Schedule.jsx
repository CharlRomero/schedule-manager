import React, { useState } from "react";
import { useFetch } from "../util/useFetch";
// Importamos el archivo de estilos CSS

const apiURL = import.meta.env.VITE_API;

export function Schedule() {
  const URL = `${apiURL}subject`;
  const subjects = useFetch(URL);
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const timeSlots = Array.from({ length: 8 }, (_, index) => `${8 + index}:00 - ${9 + index}:00`);

  const [schedule, setSchedule] = useState([]);
  const [subjectColors, setSubjectColors] = useState({});

  const handleDrop = (event, day, timeSlot) => {
    const subject = event.dataTransfer.getData("text/plain");

    // Verificar si la casilla ya contiene una materia
    const isSlotOccupied = schedule.some(
      (item) => item.day === day && item.timeSlot === timeSlot && item.subject !== subject
    );

    if (!isSlotOccupied) {
      const newScheduleItem = { subject, day, timeSlot };
      setSchedule((prevSchedule) => [...prevSchedule, newScheduleItem]);

      // Verificar si el color ya está asignado a la materia
      if (!subjectColors[subject]) {
        const newColor = generateRandomColor();
        setSubjectColors((prevColors) => ({ ...prevColors, [subject]: newColor }));
      }
    }
  };

  const handleDelete = (day, timeSlot, subject) => {
    const updatedSchedule = schedule.filter(
      (item) => !(item.day === day && item.timeSlot === timeSlot && item.subject === subject)
    );
    setSchedule(updatedSchedule);
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    // Agregamos el valor de opacidad (alpha) al color generado
    color += "90"; // Valor de opacidad aproximadamente al 50%
    return color;
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Horas</th>
              {daysOfWeek.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((timeSlot) => (
              <tr key={timeSlot}>
                <td>{timeSlot}</td>
                {daysOfWeek.map((day) => (
                  <td
                    key={day}
                    onDrop={(event) => handleDrop(event, day, timeSlot)}
                    onDragOver={(event) => event.preventDefault()}
                    className="schedule-cell"
                  >
                    {schedule
                      .filter((item) => item.day === day && item.timeSlot === timeSlot)
                      .map((item, index) => (
                        <div
                          key={item.subject}
                          className="materia-button"
                          style={{ backgroundColor: subjectColors[item.subject] || generateRandomColor() }}
                        >
                          {item.subject}
                          <button className="delete-button" onClick={() => handleDelete(day, timeSlot, item.subject)}>
                            X
                          </button>
                        </div>
                      ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginLeft: "2cm" }}>
        <h3>Materias</h3>
        {/* Lista de materias en forma de botones */}
        {subjects.map((subject) => (
          <div
            key={subject.SUB_NAME}
            draggable
            onDragStart={(event) => event.dataTransfer.setData("text/plain", subject.SUB_NAME)}
            className="materia-button"
            style={{ backgroundColor: subjectColors[subject.SUB_NAME] || generateRandomColor() }}
          >
            {subject.SUB_NAME}
          </div>
        ))}
      </div>
    </div>
  );
}
