import { useState } from "react";
import axios from "axios";

import { useFetch } from "../util/useFetch";

import { DataTable } from "../components/DataTable";
import { Button } from "../components/button/Button";
import Modal from "../components/modals/Modal";

const apiURL = import.meta.env.VITE_API;

const thead = ["N°", "Materia", ""];

export const Subject = () => {
  const URL = `${apiURL}subject`;
  const subjects = useFetch(URL);

  return (
    <section className="Table">
      <DataTable
        className="DataTable DataTable--resize"
        title="Tabla de Materias"
        thead={thead}
      >
        {subjects.map((item, key) => (
          <tr className="DataTable/tr" key={key}>
            <td className="DataTable-td">{key + 1}</td>
            <td className="DataTable-td">{item.SUB_NAME}</td>
          </tr>
        ))}
      </DataTable>
    </section>
  );
};
