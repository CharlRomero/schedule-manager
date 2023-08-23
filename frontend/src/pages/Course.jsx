import { useState } from "react";
import { useFetch } from "../util/useFetch";
import { DataTable } from "../components/DataTable";
import { Button } from "../components/button/Button";
import Modal from "../components/modals/Modal";
import axios from "axios";

const apiURL = import.meta.env.VITE_API;

const thead = ["N°", "Grado", "Paralelo", "Educación", "Periodo", ""];

export const Course = () => {
  const [active, setActive] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
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
    YEAR_ID: "",
    PER_ID: "",
    ROOM_ID: "",
  });

  const [course, setCourse] = useState({
    COU_ID: 1,
    YEAR_ID: 1,
    PER_ID: 1,
    ROOM_ID: 1,
  });

  const courses = useFetch(`${apiURL}course`);
  const periods = useFetch(`${apiURL}period`);
  const educationyears = useFetch(`${apiURL}educationyear`);
  const rooms = useFetch(`${apiURL}room`);

  const toggle = () => {
    setActive(!active);
  };

  const toggleCreate = () => {
    setCourse({
      ...course,
      YEAR_ID: educationyears[0].YEAR_ID,
      PER_ID: periods[0].PER_ID,
      ROOM_ID: rooms[0].ROOM_ID,
    });
    setActiveModal(!activeModal);
  };

  const create = (e) => {
    e.preventDefault();
    axios
      .post(`${apiURL}course`, {
        ...course,
      })
      .then(() => window.location.reload());
  };

  const handleEducationYear = (e) => {
    const newData = { ...data };
    newData["YEAR_LEVEL"] = e.target.value;
    setData(newData);
    setCourse({
      ...course,
      YEAR_ID: educationyears.find(
        (element) => element.YEAR_LEVEL === e.target.value
      ).YEAR_ID,
    });
  };

  const handlePeriod = (e) => {
    const newData = { ...data };
    newData["PER_CODE"] = e.target.value;
    setData(newData);
    setCourse({
      ...course,
      PER_ID: periods.find((element) => element.PER_CODE === e.target.value)
        .PER_ID,
    });
  };

  const handleEducationType = (e) => {
    const newData = { ...data };
    newData["TYPE_NAME"] = e.target.value;
    setData(newData);
    setCourse({
      ...course,
      ROOM_ID: rooms.find((element) => element.ROOM_NAME === e.target.value)
        .ROOM_ID,
    });
  };

  const submitEdit = (e) => {
    e.preventDefault();
    axios
      .patch(`${apiURL}course/${data.COU_ID}`, {
        ...course,
      })
      .then(() => window.location.reload());
  };

  const deleteCourse = (e, id) => {
    e.preventDefault();
    axios.delete(`${apiURL}course/${id}`).then(() => window.location.reload());
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
        {courses.map((c, key) => (
          <tr key={key} className="DataTable-tr">
            <td className="DataTable-td">{c.COU_ID}</td>
            <td className="DataTable-td">{c.YEAR_LEVEL}</td>
            <td className="DataTable-td">{c.ROOM_NAME}</td>
            <td className="DataTable-td">{c.TYPE_NAME}</td>
            <td className="DataTable-td">{c.PER_CODE}</td>
            <td className="DataTable-td">
              <div className="DataTable-buttons">
                <button
                  onClick={() => {
                    setActive(!active);
                    setCourse({
                      ...course,
                      COU_ID: c.COU_ID,
                      YEAR_ID: educationyears.find(
                        (e) => e.YEAR_LEVEL === c.YEAR_LEVEL
                      ).YEAR_ID,
                      PER_ID: periods.find((e) => e.PER_CODE === c.PER_CODE)
                        .PER_ID,
                      ROOM_ID: rooms.find((e) => e.ROOM_NAME === c.ROOM_NAME)
                        .ROOM_ID,
                    });
                    setData({
                      COU_ID: c.COU_ID,
                      YEAR_LEVEL: c.YEAR_LEVEL,
                      ROOM_NAME: c.ROOM_NAME,
                      TYPE_NAME: c.TYPE_NAME,
                      PER_CODE: c.PER_CODE,
                    });
                    setCou({
                      yearLvl: c.YEAR_LEVEL,
                      room: c.ROOM_NAME,
                      type: c.TYPE_NAME,
                      period: c.PER_CODE,
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
                <button
                  onClick={(e) => {
                    deleteCourse(e, c.COU_ID);
                  }}
                >
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
            <select
              className="Form-inputs--input"
              onChange={handleEducationYear}
              defaultValue={cou.yearLvl}
            >
              {educationyears.map((year, key) => (
                <option key={key} defaultValue={data.PER_CODE}>
                  {year.YEAR_LEVEL}
                </option>
              ))}
            </select>
            <select
              className="Form-inputs--input"
              onChange={handleEducationType}
              defaultValue={cou.room}
            >
              {rooms.map((element, key) => (
                <option
                  key={key}
                  defaultValue={data.TYPE_NAME}
                  onClick={() => alert(element.ROOM_ID)}
                >
                  {element.ROOM_NAME}
                </option>
              ))}
            </select>
            <select
              className="Form-inputs--input"
              onChange={handlePeriod}
              defaultValue={cou.period}
            >
              {periods.map((period, key) => (
                <option key={key} defaultValue={data.PER_CODE}>
                  {period.PER_CODE}
                </option>
              ))}
            </select>
          </section>
          {educationyears.length != 0 &&
            periods.length != 0 &&
            rooms.length != 0 && <Button className="Button" title="Editar" />}
        </form>
      </Modal>
      <Modal
        className="Modal"
        resize="Portal-window--room"
        active={activeModal}
        toggle={toggleCreate}
      >
        <h3 className="Modal-title">Ingresar nuevo curso</h3>
        <form onSubmit={(e) => create(e)} className="Form">
          <section className="Form-inputs">
            <select
              className="Form-inputs--input"
              onChange={handleEducationYear}
            >
              {educationyears.map((year, key) => (
                <option key={key} defaultValue={data.PER_CODE}>
                  {year.YEAR_LEVEL}
                </option>
              ))}
            </select>
            <select
              className="Form-inputs--input"
              onChange={handleEducationType}
            >
              {rooms.map((element, key) => (
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
              {periods.map((period, key) => (
                <option key={key} defaultValue={data.PER_CODE}>
                  {period.PER_CODE}
                </option>
              ))}
            </select>
          </section>

          {educationyears.length != 0 &&
            periods.length != 0 &&
            rooms.length != 0 && <Button className="Button" title="Agregar" />}
        </form>
      </Modal>
    </section>
  );
};
