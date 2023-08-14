import { useState } from "react";

import { useFetch } from "../util/useFetch";

import { DataTable } from "../components/DataTable";
import { Button } from "../components/button/Button";
import Modal from "../components/modals/Modal";

const apiURL = import.meta.env.VITE_API;

const thead = ["N°", "Grado", "Paralelo", "Educación", "Periodo", ""];

export const Course = () => {
  const [active, setActive] = useState(false);
  const [cou, setCou] = useState({
    yearLvl: "",
    room: "",
    type: "",
    period: "",
  });
  //Datos
  const [data, setData] = useState({
    COU_ID: "",
    YEAR_LEVEL: "",
    ROOM_NAME: "",
    TYPE_NAME: "",
    PER_CODE: "",
  });

  const [db, setDb] = useState({
    periods: useFetch(`${apiURL}period`),
    educationyears: useFetch(`${apiURL}educationyear`),
    rooms: useFetch(`${apiURL}room`),
  });
  
  const courses = useFetch(`${apiURL}course`);

  const toggle = () => {
    setActive(!active);
  };

  const handlePeriod = (e) => {
    const newData = { ...data };
    newData["PER_CODE"] = e.target.value;
    setData(newData);
  };

  const handleEducationType = (e) => {
    const newData = { ...data };
    newData["TYPE_NAME"] = e.target.value;
    setData(newData);
  };

  return (
    <section className="Table">
      <DataTable className="DataTable" title="Cursos" thead={thead}>
        {courses.map((course, key) => (
          <tr key={key} className="DataTable-tr">
            <td className="DataTable-td">{key + 1}</td>
            <td className="DataTable-td">{course.YEAR_LEVEL}</td>
            <td className="DataTable-td">{course.ROOM_NAME}</td>
            <td className="DataTable-td">{course.TYPE_NAME}</td>
            <td className="DataTable-td">{course.PER_CODE}</td>
            <td className="DataTable-td">
              <div className="DataTable-buttons">
                <button
                  onClick={() => {
                    setActive(!active);
                    setData({
                      COU_ID: course.COU_ID,
                      YEAR_LEVEL: course.YEAR_LEVEL,
                      ROOM_NAME: course.ROOM_NAME,
                      TYPE_NAME: course.TYPE_NAME,
                      PER_CODE: course.PER_CODE,
                    });
                    setCou({
                      yearLvl: course.YEAR_LEVEL,
                      room: course.ROOM_NAME,
                      type: course.TYPE_NAME,
                      period: course.PER_CODE,
                    });
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
                <button>
                  <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="DataTable-svg"
                  >
                    <path
                      d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z"
                      fillRule="nonzero"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
      <Modal className="Modal" active={active} toggle={toggle}>
        <h3 className="Modal-title">{`Editar curso: ${cou.yearLvl} ${cou.room} ${cou.type}`}</h3>
        <form className="Form" onSubmit={(e) => submitEdit(e)}>
          <section className="Form-inputs">
            <input
              type="text"
              className="Form-inputs--input"
              defaultValue={cou.yearLvl}
            />
            <select
              className="Form-inputs--input"
              onChange={handleEducationType}
            >
              {db.rooms.map((element, key) => (
                <option
                  key={key}
                  defaultValue={data.TYPE_NAME}
                  onClick={() => alert(element.ROOM_ID)}
                >
                  {element.ROOM_NAME}
                </option>
              ))}
            </select>
            <select className="Form-inputs--input" onChange={handlePeriod}>
              {db.periods.map((period, key) => (
                <option key={key} defaultValue={data.PER_CODE}>
                  {period.PER_CODE}
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
