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
  const [period, setPeriod] = useState("");

  const URL = `${apiURL}period`;
  const periods = useFetch(URL);

  const [data, setData] = useState({
    PER_CODE: "",
  });

  const toggle = () => {
    setActive(!active);
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

  return (
    <section className="Table">
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
    </section>
  );
};
