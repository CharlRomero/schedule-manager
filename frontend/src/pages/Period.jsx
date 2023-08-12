import { useState } from "react";
import axios from "axios";

import { useFetch } from "../util/useFetch";

import { DataTable } from "../components/DataTable";
import { Button } from "../components/button/Button";
import Modal from "../components/modals/Modal";

const apiURL = import.meta.env.VITE_API;

const thead = ["N°", "Periodos", ""];

export const Period = () => {
  const [active, setActive] = useState(false);
  const [id, setId] = useState("");
  const [activeModal, setActiveModal] = useState(false);
  const [period, setPeriod] = useState("");

  const URL = `${apiURL}period`;
  const periods = useFetch(URL);

  const [data, setData] = useState({
    PER_CODE: "",
  });

  const toggle = () => {
    setActive(!active);
  };
  const toggleCreate = () => {
    setActiveModal(!activeModal);
  };

  const handle = (e) => {
    const newData = { ...data };
    newData["PER_CODE"] = e.target.value;
    setData(newData);
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .patch(`${apiURL}period/${id}`, {
        PER_CODE: data.PER_CODE,
      })
      .then(() => {
        window.location.reload();
      });
  };
  const create = (e) => {
    e.preventDefault();
    axios
      .post(`${apiURL}room`, {
        PER_CODE: data.PER_CODE,
      })
      .then(() => {
        window.location.reload();
      });
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
      <DataTable
        className="DataTable DataTable--resize"
        title="Tabla de Periodos"
        thead={thead}
      >
        {periods.map((item, key) => (
          <tr className="DataTable-tr" key={key}>
            <td className="DataTable-td">{key + 1}</td>
            <td className="DataTable-td">{item.PER_CODE}</td>
            <td className="DataTable-td">
              <div className="DataTable-buttons">
                <button
                  onClick={() => {
                    setActive(!active);
                    setPeriod(item.PER_CODE);
                    setId(item.PER_ID);
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
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
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
      <Modal
        className="Modal"
        resize="Portal-window--resize"
        active={active}
        toggle={toggle}
      >
        <h3 className="Modal-title">{`Editar periodo: ${period}`}</h3>
        <form onSubmit={(e) => submit(e)} className="Form">
          <section className="Form-inputs">
            <input
              className="Form-inputs--input"
              type="text"
              placeholder={period}
              onChange={handle}
            />
          </section>
          <Button className="Button" title="Editar" />
        </form>
      </Modal>
      <Modal
        className="Modal"
        resize="Portal-window--resize"
        active={activeModal}
        toggle={toggleCreate}
      >
        <h3 className="Modal-title">Agregar nuevo periodo</h3>
        <form onSubmit={(e) => submit(e)} className="Form">
          <section className="Form-inputs">
            <input
              className="Form-inputs--input"
              type="text"
              placeholder="Ingrese el periodo"
              onChange={handle}
            />
          </section>
          <Button className="Button" title="Agregar" />
        </form>
      </Modal>
    </section>
  );
};
