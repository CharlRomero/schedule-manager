import { useState } from "react";
import axios from "axios";

import { useFetch } from "../util/useFetch";

import { DataTable } from "../components/DataTable";
import { Button } from "../components/button/Button";
import Modal from "../components/modals/Modal";

const apiURL = import.meta.env.VITE_API;

const thead = ["N°", "Educación", ""];

export const EducationType = () => {
  const [activeUpdate, setActiveUpdate] = useState(false);
  const [data, setData] = useState({
    TYPE_ID: "",
    TYPE_NAME: "",
  });

  const URL = `${apiURL}educationtype`;
  const educationtypes = useFetch(URL);

  const deleteType = (e, id) => {
    e.preventDefault();
    axios
      .delete(`${apiURL}educationtype/${id}`)
      .then(() => window.location.reload());
  };

  return (
    <section className="Table">
      <section className="Table-buttons"></section>
      <DataTable className="DataTable" title="Tabla de Educación" thead={thead}>
        {educationtypes.map((item, key) => (
          <tr className="DataTable-tr" key={key}>
            <td className="DataTable-td">{key + 1}</td>
            <td className="DataTable-td">{item.TYPE_NAME}</td>
            <td className="DataTable-td">
              <div className="DataTable-buttons">
                <button
                  onClick={() => {
                    setActiveUpdate(!activeUpdate);
                    setData({
                      TYPE_ID: item.TYPE_ID,
                      TYPE_NAME: item.TYPE_NAME,
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
                <button onClick={(e) => deleteType(e, item.TYPE_ID)}>
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
    </section>
  );
};
