import { useState } from "react";

import { useFetch } from "../util/useFetch";

import { DataTable } from "../components/DataTable";
import { Button } from "../components/button/Button";
import Modal from "../components/modals/Modal";

const apiURL = import.meta.env.VITE_API;

const thead = ["N°", "Grado", "Paralelo", "Educación", "Periodo", ""];

export const Course = () => {
  const [active, setActive] = useState(false);
  const [id, setId] = useState("");
  const [yearLvl, setYearLvl] = useState("");
  const [room, setRoom] = useState("");
  const [yearType, setYearType] = useState("");
  const [perCode, setPerCode] = useState("");

  //Datos
  const [data, setData] = useState({});
  //
  const courses = useFetch(`${apiURL}course`);

  const periods = useFetch(`${apiURL}period`);

  const educationyears = useFetch(`${apiURL}educationyear`);

  const rooms = useFetch(`${apiURL}room`);

  const toggle = () => {
    setActive(!active);
  };

  const handle = (e) => {};

  return (
    <section className="Table">
      <DataTable className="DataTable" title="Cursos" thead={thead}>
        {courses.map((course, key) => (
          <tr key={key} className="DataTable-tr">
            <td className="DataTable-td">{course.COU_ID}</td>
            <td className="DataTable-td">{course.YEAR_LEVEL}</td>
            <td className="DataTable-td">{course.ROOM_NAME}</td>
            <td className="DataTable-td">{course.TYPE_NAME}</td>
            <td className="DataTable-td">{course.PER_CODE}</td>
            <td className="DataTable-td">
              <button
                onClick={() => {
                  setActive(!active);
                  setId(course.COU_ID);
                  setYearLvl(course.YEAR_LEVEL);
                  setRoom(course.ROOM_NAME);
                  setYearType(course.TYPE_NAME);
                  setPerCode(course.PER_CODE);
                }}
              >
                <svg
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  viewBox="0 0 24 24"
                  className="DataTable-svg"
                >
                  <path
                    d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z"
                    fillRule="nonzero"
                  />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </DataTable>
      <Modal className="Modal" active={active} toggle={toggle}>
        <h3 className="Modal-title">{`Editar curso: ${yearLvl} ${room} ${yearType}`}</h3>
        <form className="Form">
          <section className="Form-inputs">
            <select className="Form-inputs--input">
              {periods.map((period, key) => (
                <option key={key} defaultValue={perCode}>
                  {period.PER_CODE}
                </option>
              ))}
            </select>
            <select className="Form-inputs--input">
              {rooms.map((element, key) => (
                <option
                  key={key}
                  defaultValue={room}
                  onClick={() => alert(element.ROOM_ID)}
                >
                  {element.ROOM_NAME}
                </option>
              ))}
            </select>
          </section>
          <Button className="Button" title="Editar" />
        </form>
      </Modal>
    </section>
  );
};
