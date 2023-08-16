import React, { useState, useEffect } from "react";
import { useFetch } from "../util/useFetch";
import { SaveSchedule } from "./SaveSchedule";
const apiURL = import.meta.env.VITE_API;

export function Schedule() {
  const URL = `${apiURL}subject`;
  const subjects = useFetch(URL);

  const slot = `${apiURL}slot`;
  const slots = useFetch(slot);

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const timeSlots = slots.map((slot) => `${slot.SLOT_INITIME} - ${slot.SLOT_ENDTIME}`);

  const [schedule, setSchedule] = useState([]);
  const [subjectColors, setSubjectColors] = useState({});

  const staticSubjectColors = [
    "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
    "#FFA500", "#800080", "#008000", "#800000", "#000080", "#008080",
    "#A52A2A", "#FFC0CB", "#008B8B", "#FFD700"
  ];

  const assignSubjectColors = () => {
    const colorMap = {};
    subjects.forEach((subject, index) => {
      colorMap[subject.SUB_NAME] = staticSubjectColors[index % staticSubjectColors.length];
    });
    return colorMap;
  };

  useEffect(() => {
    setSubjectColors(assignSubjectColors());
  }, []);

  const handleDragStart = (event, subject) => {
    event.dataTransfer.setData("text/plain", subject);
  };

  const handleDrop = (event, day, timeSlot) => {
    event.preventDefault();
    const subject = event.dataTransfer.getData("text/plain");

    const isSlotOccupied = schedule.some(
      (item) => item.day === day && item.timeSlot === timeSlot && item.subject !== subject
    );

    const isSubjectAlreadyAdded = schedule.some((item) => item.day === day && item.subject === subject);

    if (!isSlotOccupied && !isSubjectAlreadyAdded) {
      const newScheduleItem = { subject, day, timeSlot };
      setSchedule((prevSchedule) => [...prevSchedule, newScheduleItem]);

      if (!subjectColors[subject]) {
        setSubjectColors((prevColors) => ({ ...prevColors, [subject]: staticSubjectColors[schedule.length % staticSubjectColors.length] }));
      }
    }
  };

  const handleDelete = (day, timeSlot, subject) => {
    const updatedSchedule = schedule.filter(
      (item) => !(item.day === day && item.timeSlot === timeSlot && item.subject === subject)
    );
    setSchedule(updatedSchedule);
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
                      .map((item) => (
                        <div
                          key={item.subject}
                          className="materia-button"
                          style={{ backgroundColor: subjectColors[item.subject] }}
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
          <div style={{ marginLeft: "1cm" }}>
          <SaveSchedule schedule={schedule} />

        </div>
      </table>  
      </div>
      <div style={{ marginLeft: "4cm" }}>
        <th>Materias</th>
        {/* Lista de materias en forma de botones */}
        {subjects.map((subject) => (
          <div
            key={subject.SUB_NAME}
            draggable
            onDragStart={(event) => handleDragStart(event, subject.SUB_NAME.toUpperCase())}
            className="materia-button"
            style={{ backgroundColor: subjectColors[subject.SUB_NAME] }}
          >
            {subject.SUB_NAME.toUpperCase()}
            
          </div>
          
        ))}
      </div>
      
    </div>
    
  );
}
