import { useState } from "react";
import axios from "axios";

import { useFetch } from "../util/useFetch";

import { DataTable } from "../components/DataTable";
import { Button } from "../components/button/Button";
import Modal from "../components/modals/Modal";

const apiURL = import.meta.env.VITE_API;

const thead = ["N°", "Grado", "Paralelo", "Educación", "Periodo", ""];

export const Course = () => {
  const [activeEdit, setActiveEdit] = useState(false);
  const [activeCreate, setActiveCreate] = useState(false);
  const [typeId, setTypeId] = useState("1");
  const [cou, setCou] = useState({
    yearLvl: "",
    room: "",
    type: "",
    period: "",
  });
  //Datos
  const [data, setData] = useState({
    COU_ID: "",
    YEAR_ID: "",
    YEAR_LEVEL: "",
    ROOM_ID: "",
    ROOM_NAME: "",
    TYPE_ID: "",
    TYPE_NAME: "",
    PER_ID: "",
    PER_CODE: "",
  });

  const courses = useFetch(`${apiURL}course`);
  const periods = useFetch(`${apiURL}period`);
  const educationyears = useFetch(`${apiURL}educationyears/${typeId}`);
  const educationtypes = useFetch(`${apiURL}educationtype`);
  const rooms = useFetch(`${apiURL}room`);

  const toggleEdit = () => {
    setActiveEdit(!activeEdit);
  };
  const toggleCreate = () => {
    setActiveCreate(!activeCreate);
  };

  const handlePeriod = (e) => {
    const newData = { ...data };
    newData["PER_CODE"] = e.target.value;
    setData(newData);
  };

  const handleRoom = (e) => {
    const newData = { ...data };
    newData["ROOM_ID"] = e.target.value;
    setData(newData);
  };

  const handleYear = (e) => {
    const newData = { ...data };
    newData["YEAR_LEVEL"] = e.target.value;
    setData(newData);
  };

  const handleType = (e) => {
    const newData = { ...data };
    newData["TYPE_ID"] = e.target.value;
    setData(newData);
    setTypeId(e.target.value);
  };

  const submitEditYear = (e) => {
    e.preventDefault();
    axios.patch(`${apiURL}educationyear/${data.YEAR_ID}`, {
      YEAR_LEVEL: data.YEAR_LEVEL,
      TYPE_ID: data.TYPE_ID,
    });
  };

  const submitEdit = (e) => {
    e.preventDefault();
    axios
      .patch(`${apiURL}course/${data.COU_ID}`, {
        ROOM_ID: data.ROOM_ID,
      })
      .then(() => window.location.reload());
  };

  return (
    <section className="Table">
      <section className="Table-buttons">
        <Button
          className="Button Table-buttons--right"
          title="Agregar"
          onClick={toggleCreate}
        >
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="Button-svg"
          >
            <path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z" />
          </svg>
        </Button>
      </section>
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
                    setActiveEdit(!activeEdit);
                    setData({
                      COU_ID: course.COU_ID,
                      YEAR_ID: course.YEAR_ID,
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
      <Modal className="Modal" active={activeEdit} toggle={toggleEdit}>
        <h3 className="Modal-title">{`Editar curso: ${cou.yearLvl} ${cou.room} ${cou.type}`}</h3>
        <form
          className="Form"
          onSubmit={(e) => {
            submitEditYear(e);
            submitEdit(e);
          }}
        >
          <section className="Form-inputs">
            <select className="Form-inputs--input" onChange={handleType}>
              {educationtypes.map((element, key) => (
                <option key={key} value={key + 1} defaultValue={1}>
                  {element.TYPE_NAME}
                </option>
              ))}
            </select>
            <select className="Form-inputs--input">
              {educationyears.map((element, key) => (
                <option key={key} value={key + 1} defaultValue={1}>
                  {element.YEAR_LEVEL}
                </option>
              ))}
            </select>
            <select className="Form-inputs--input" onChange={handleRoom}>
              {rooms.map((element, key) => (
                <option key={key} value={key + 1} defaultValue={1}>
                  {element.ROOM_NAME}
                </option>
              ))}
            </select>
            <select className="Form-inputs--input" onChange={handlePeriod}>
              {periods.map((period, key) => (
                <option key={key} value={key + 1} defaultValue={1}>
                  {period.PER_CODE}
                </option>
              ))}
            </select>
          </section>
          <Button className="Button" title="Editar" />
        </form>
      </Modal>
      <Modal
        className="Modal"
        resize="Portal-window--room"
        active={activeCreate}
        toggle={toggleCreate}
      >
        <h3 className="Modal-title">Ingrese un nuevo curso</h3>
        <form onSubmit={(e) => submitCreate(e)} className="Form">
          <section className="Form-inputs">
            <select className="Form-inputs--input" onChange={handleRoom}>
              {rooms.map((element, key) => (
                <option key={key} value={key + 1} defaultValue={1}>
                  {element.ROOM_NAME}
                </option>
              ))}
            </select>
            <select className="Form-inputs--input" onChange={handlePeriod}>
              {periods.map((period, key) => (
                <option key={key} value={key + 1} defaultValue={1}>
                  {period.PER_CODE}
                </option>
              ))}
            </select>
          </section>
        </form>
      </Modal>
    </section>
  );
};
