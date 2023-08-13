import { useState } from "react";
import axios from "axios";

import { useFetch } from "../util/useFetch";

import { DataTable } from "../components/DataTable";
import { Button } from "../components/button/Button";
import Modal from "../components/modals/Modal";

const apiURL = import.meta.env.VITE_API;

const thead = ["N°", "Educación", ""];

export const EducationType = () => {
  const [active, setActive] = useState(false);

  const URL = `${apiURL}educationtype`;
  const educationtypes = useFetch(URL);

  return (
    <section className="Table">
      <section className="Table-buttons"></section>
      <DataTable className="DataTable" title="Tabla de Educación" thead={thead}>
        {educationtypes.map((item, key) => (
          <tr className="DataTable-tr" key={key}>
            <td className="DataTable-td">{key + 1}</td>
            <td className="DataTable-td">{item.TYPE_NAME}</td>
            <td className="DataTable-td"></td>
          </tr>
        ))}
      </DataTable>
    </section>
  );
};
