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

  const URL = `${apiURL}slot`;
  const slots = useFetch(URL);

  const toggleUpdate = () => {
    setActiveUpdate(!activeUpdate);
  };

  return (
    <section className="Table">
      <section className="Table-buttons"></section>
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
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </section>
  );
};
