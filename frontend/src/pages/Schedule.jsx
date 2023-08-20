import React, { useState, useEffect } from "react";
import { useFetch } from "../util/useFetch";
import axios from "axios"; // Agrega la importación de axios

// Importamos el archivo de estilos CSS



export function Schedule() {
  const apiURL = import.meta.env.VITE_API;

  // Función para eliminar un horario de curso por ID
const deleteCourseSchedule = async (id) => {
  try {
    const response = await fetch(`${apiURL}courseschedule/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Horario de curso eliminado exitosamente.');
      // Realizar alguna acción después de eliminar el horario
    } else {
      console.error('Error al eliminar el horario de curso.');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};


 // Estado para almacenar los datos de los cursos
 const [courseData, setCourseData] = useState([]);
 
// Llamada a la API para obtener los datos de los cursos
useEffect(() => {
  async function fetchCourseData() {
    try {
      const response = await fetch(`${apiURL}course`);
      const data = await response.json();
      setCourseData(data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  }
  fetchCourseData();
}, []);
// Estado para almacenar el curso seleccionado y su índice
const [selectedCourse, setSelectedCourse] = useState(""); 
const [selectedCourseIndex, setSelectedCourseIndex] = useState("");
// Función para obtener el índice del curso seleccionado


// Función para manejar el cambio en el ComboBox
const handleCourseChange = (event) => {
  clearSchedule();
  fetchScheduleCourseData();
  const selectedCourseId = event.target.value;
  const newSelectedCourseIndex = event.target.selectedIndex;
  setSelectedCourse(selectedCourseId);
  setSelectedCourseIndex(newSelectedCourseIndex);
 // console.log("ID list del curso seleccionado:", event.target.selectedIndex);
};

  //Mostrar los datos del horario
  const getSubjectNameById = (subjectId, subjects) => {
    const subject = subjects.find((subject) => subject.SUB_ID === subjectId);
    return subject ? subject.SUB_NAME : "";
  };
  
  const generateButtonsAutomatically = (day, numbersOnly) => {
    

    const subjectIds = numbersOnly;
    const idsArray = subjectIds.split(",").map(id => parseInt(id.trim()));
    const selectedDay = day;
  
    idsArray.forEach((subjectId, index) => {
      const timeSlot = timeSlots[index];
      if (subjectId !== 0) {
        const subjectName = getSubjectNameById(subjectId, subjects);
        const key = `${selectedDay}-${timeSlot}-${subjectName}-${index}`; // Agregar el índice a la clave
  
        const isSlotOccupied = schedule.some(
          (item) => item.day === selectedDay && item.timeSlot === timeSlot && item.subject !== subjectName
        );
  
        if (!isSlotOccupied) {
          const newScheduleItem = { subject: subjectName, day: selectedDay, timeSlot };
          setSchedule((prevSchedule) => [...prevSchedule, newScheduleItem]);
  
          if (!subjectColors[subjectName]) {
            const newColor = generateRandomColor();
            setSubjectColors((prevColors) => ({ ...prevColors, [subjectName]: newColor }));
          }
        }
      }
    });
  };

  
  //Mostrar los datos del horario en la cuadricula
  const fetchScheduleCourseData = async () => {
    

    try {
      clearSchedule();
     // console.log("prueba ",event.target.selectedIndex);
      const courseId = event.target.selectedIndex;

      const response = await axios.get(`http://localhost:3000/courseschedule/${courseId}`);
      const data = response.data;
  
      setScheduleData(data); // Almacenar los datos en la variable scheduleData
  
      const scheduleInfo = []; // Variable para almacenar la información
  
      data.forEach((scheduleItem) => {
        const days = ["lunes", "martes", "miercoles", "jueves", "viernes"];
        days.forEach((day) => {
          if (scheduleItem[day]) {
            const numbersOnly = scheduleItem[day].split(",").map((value) => parseInt(value.trim())).join(",");
            const dayInfo = `${day.charAt(0).toUpperCase() + day.slice(1)}`;
            const numbersInfo = `${numbersOnly}`;
            scheduleInfo.push({ dayInfo, numbersInfo });
            //console.log(dayInfo);
            //console.log(numbersInfo);
            generateButtonsAutomatically(dayInfo ,numbersInfo);
          }
        });
      });
  
      //console.log(scheduleInfo); // Mostrar la información almacenada
    } catch (error) {
      console.error("Error fetching schedule course data:", error);
    }
  };
  

  //limpiar las cuadriculas del horario 
  const clearSchedule = () => {
    setSchedule([]);
    setSubjectColors({});
  };
  
  // Luego en tu componente, puedes llamar a la función directamente
  <button onClick={generateButtonsAutomatically}>Generar Horario Automáticamente</button>

  //obtenemos los datos de mi base
  const [scheduleData, setScheduleData] = useState({});
 
  const URL = `${apiURL}subject`;
  const subjects = useFetch(URL);

  const SLOT = `${apiURL}slot`;
  const slots = useFetch(SLOT);


  const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  const timeSlots = slots.map((slot) => `${slot.SLOT_INITIME} - ${slot.SLOT_ENDTIME}`);

  const [schedule, setSchedule] = useState([]);
  const [subjectColors, setSubjectColors] = useState({});

  const handleDrop = (event, day, timeSlot) => {
    const subject = event.dataTransfer.getData("text/plain");
  
    // Verificar si la casilla ya contiene una materia
    const isSlotOccupied = schedule.some(
      (item) => item.day === day && item.timeSlot === timeSlot && item.subject !== subject
    );
  
    // Verificar si la materia ya está en el horario en cualquier hora del día
    const isSubjectInSchedule = schedule.some(
      (item) => item.subject === subject && item.day === day
    );
  
    if (!isSlotOccupied && !isSubjectInSchedule) {
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
  // Función para obtener el ID de la materia según su nombre
  const getSubjectId = (subjectName, subjects) => {
    const subject = subjects.find((s) => s.SUB_NAME === subjectName);
    return subject ? subject.SUB_ID : 0;
  };

  
  
 //Funcion para guardar el horario
  const handleSaveSchedule = async () => {
    try {
      console.log("guardar horario con el indice",selectedCourseIndex);
      const courseId = selectedCourseIndex;
      const response1 = await fetch(`${apiURL}subject`);
      const subjects = await response1.json();
      console.log(courseId);

      await deleteCourseSchedule(courseId);
      

      const scheduleData = {
        
        idCurso: courseId,
        lunes: getDaySubjects("Lunes", subjects),
        martes: getDaySubjects("Martes", subjects),
        miercoles: getDaySubjects("Miercoles", subjects),
        jueves: getDaySubjects("Jueves", subjects),
        viernes: getDaySubjects("Viernes", subjects),
      };

      const response = await fetch(`${apiURL}courseschedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleData),
      });
      
      if (response.ok) {
        console.log("Horario guardado exitosamente.");
        // Realizar alguna acción después de guardar el horario
      } else {
        console.error("Error al guardar el horario.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const findEmptyHours = (day) => {
    const occupiedHours = schedule
      .filter((item) => item.day === day)
      .map((item) => item.timeSlot);
  
    const emptyHours = timeSlots
      .filter((timeSlot) => !occupiedHours.includes(timeSlot));
  
    return emptyHours;
  };
  
  const getDaySubjects = (day, subjects) => {
    const subjectsForDay = schedule
      .filter((item) => item.day === day)
      .reduce((subjectsMap, item) => {
        const subjectId = getSubjectId(item.subject, subjects);
        subjectsMap[item.timeSlot] = subjectId;
        return subjectsMap;
      }, {});
  
    const emptyHours = findEmptyHours(day);
    
    const result = timeSlots.map((timeSlot) => {
      if (subjectsForDay[timeSlot]) {
        return subjectsForDay[timeSlot];
      } else if (emptyHours.includes(timeSlot)) {
        return "0";
      } else {
        return "";
      }
    }).join(",");
    
    return result;
};
//fin del codigo de extraer
  


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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div style={{ display: "flex", marginTop: "20px", textAlign: "center"  }}>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Horas</th>
              {daysOfWeek.map((day) => (
                <th key={day}>{day}
                </th>
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
                         key={`${day}-${timeSlot}-${item.subject}`} // Utiliza una clave única
                         className="materia-button"
                         style={{ backgroundColor: subjectColors[item.subject] || generateRandomColor() }}
                        >
                          {item.subject}
                          <button className="delete-button" onClick={() => handleDelete(day, timeSlot, item.subject)}>
                            X
                          </button>
                        </div>
                      ))}
                      {/* Agrega el valor del horario del curso aquí */}
                    {scheduleData[day] && scheduleData[day][timeSlot]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
      <h3>Materias</h3>
       {/* Lista de materias en forma de botones */}
       {Array.isArray(subjects) && subjects.map((subject) => (
          <div
            key={subject.SUB_ID}
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
    
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h3>Selecciona un curso:</h3>
      <select value={selectedCourse} onChange={handleCourseChange} style={{ margin: "10px auto" }} className="select-course">
      <option value="">Selecciona un curso</option>
      {courseData.map(course => (
      <option key={course.COU_ID} value={course.COU_ID}>
      {course.YEAR_LEVEL} - {course.ROOM_NAME} - {course.TYPE_NAME} - {course.PER_CODE}
      </option>
      ))}
      </select>
      <button onClick={handleSaveSchedule} className="btn save-button">Guardar Horario</button>
    </div>
   </div>
    
  );
}
