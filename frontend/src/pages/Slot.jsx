import { useDebugValue, useState } from "react";
import axios from "axios";

import { useFetch } from "../util/useFetch";

import { DataTable } from "../components/DataTable";
import { Button } from "../components/button/Button";
import Modal from "../components/modals/Modal";

const apiURL = import.meta.env.VITE_API;

const thead = ["N°", "Hora Inicial", "Hora Final", ""];

export const Slot = () => {
  const [activeCreate, setActiveCreate] = useState(false);
  const [activeUpdate, setActiveUpdate] = useState(false);
  const [data, setData] = useState({
    SLOT_ID: "",
    SLOT_INITIME: "",
    SLOT_ENDTIME: "",
    SLOT_WEEKEND: "",
  });

  const [isValidPeriod, setIsValidPeriod] = useState(false);

  const URL = `${apiURL}slot`;
  const slots = useFetch(URL);

  const formatTimeToString = (time) => {
    const [hours, minutes] = time.split(".");
    return `${hours}:${minutes}`;
  };

  const toggleUpdate = () => {
    setIsValidPeriod(false);
    setActiveUpdate(!activeUpdate);
  };

  const toggleCreate = () => {
    setIsValidPeriod(false);
    setActiveCreate(!activeCreate);
  };

  const deleteSlot = (e, id) => {
    e.preventDefault();
    axios.delete(`${apiURL}slot/${id}`).then(() => window.location.reload());
  };

  const submitEdit = (e) => {
    e.preventDefault();
    setIsValidPeriod(false);
    axios
      .patch(`${apiURL}slot/${data.SLOT_ID}`, {
        SLOT_INITIME: data.SLOT_INITIME,
        SLOT_ENDTIME: data.SLOT_ENDTIME,
      })
      .then(() => window.location.reload());
  };

  const submitCreate = (e) => {
    e.preventDefault();
    setIsValidPeriod(false);
    axios
      .post(`${apiURL}slot`, {
        SLOT_INITIME: data.SLOT_INITIME,
        SLOT_ENDTIME: data.SLOT_ENDTIME,
        SLOT_WEEKEND: false,
      })
      .then(() => window.location.reload());
  };

  const handleInitHour = (e) => {
    const newData = { ...data };
    newData["SLOT_INITIME"] = e.target.value;
    setData(newData);
  };
  const handleEndHour = (e) => {
    const newData = { ...data };
    newData["SLOT_ENDTIME"] = e.target.value;
    setData(newData);
  };

  function isTimeRangeOverlapping(startTime1, endTime1, startTime2, endTime2) {
    const start1 = new Date(`1970-01-01T${startTime1}`);
    const end1 = new Date(`1970-01-01T${endTime1}`);
    const start2 = new Date(`1970-01-01T${startTime2}`);
    const end2 = new Date(`1970-01-01T${endTime2}`);

    return start1 < end2 && start2 < end1;
  }

  function validateNewTimeSlot(newStartTime, newEndTime, apiResponse) {
    for (const slot of apiResponse) {
      if (
        isTimeRangeOverlapping(
          newStartTime,
          newEndTime,
          slot.SLOT_INITIME,
          slot.SLOT_ENDTIME
        )
      ) {
        return false; // Hay superposición, no es válido
      }
    }
    return true; // No hay superposición, es válido
  }

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
      <DataTable className="DataTable" title="Tabla de Franjas" thead={thead}>
        {slots.map((item, key) => (
          <tr className="DataTable-tr" key={key}>
            <td className="DataTable-td">{key + 1}</td>
            <td className="DataTable-td">{item.SLOT_INITIME}</td>
            <td className="DataTable-td">{item.SLOT_ENDTIME}</td>
            <td className="DataTable-td">
              <div className="DataTable-buttons">
                <button
                  onClick={() => {
                    setActiveUpdate(!activeUpdate);
                    setData({
                      SLOT_ID: item.SLOT_ID,
                      SLOT_INITIME: item.SLOT_INITIME,
                      SLOT_ENDTIME: item.SLOT_ENDTIME,
                      SLOT_WEEKEND: item.SLOT_WEEKEND,
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
                <button onClick={(e) => deleteSlot(e, item.SLOT_ID)}>
                  <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="DataTable-svg DataTable-svg--red"
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
      <Modal
        className="Modal"
        resize="Portal-window--resize"
        active={activeUpdate}
        toggle={toggleUpdate}
      >
        <h3 className="Modal-title">{`Editar franjas`}</h3>
        <form onSubmit={(e) => submitEdit(e)} className="Form">
          <section className="Form-inputs">
            <input
              className="Form-inputs--input"
              type="time"
              defaultValue={data.SLOT_INITIME}
              onChange={handleInitHour}
            />
            <input
              className="Form-inputs--input"
              type="time"
              defaultValue={data.SLOT_ENDTIME}
              onChange={handleEndHour}
            />
            <button
              className="Button"
              type="button"
              onClick={() => {
                setIsValidPeriod(
                  validateNewTimeSlot(
                    data.SLOT_INITIME,
                    data.SLOT_ENDTIME,
                    slots
                  )
                );
              }}
            >
              Validar
            </button>
            {isValidPeriod && <Button className="Button" title="Editar" />}
          </section>
        </form>
      </Modal>
      <Modal
        className="Modal"
        resize="Portal-window--resize"
        active={activeCreate}
        toggle={toggleCreate}
      >
        <h3 className="Modal-title">{`Editar franjas`}</h3>
        <form onSubmit={(e) => submitCreate(e)} className="Form">
          <section className="Form-inputs">
            <input
              className="Form-inputs--input"
              type="time"
              onChange={handleInitHour}
              required
            />
            <input
              className="Form-inputs--input"
              type="time"
              onChange={handleEndHour}
              required
            />
            <button
              className="Button"
              type="button"
              onClick={() => {
                setIsValidPeriod(
                  validateNewTimeSlot(
                    data.SLOT_INITIME,
                    data.SLOT_ENDTIME,
                    slots
                  )
                );
              }}
            >
              Validar
            </button>
            {isValidPeriod && <Button className="Button" title="Agregar" />}
          </section>
        </form>
      </Modal>
    </section>
  );
};
