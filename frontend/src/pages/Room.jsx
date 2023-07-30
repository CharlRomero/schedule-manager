import { useState } from "react";
import axios from "axios";

import { useFetch } from "../util/useFetch";

import { DataTable } from "../components/DataTable";
import { Button } from "../components/button/Button";
import Modal from "../components/modals/Modal";

const apiURL = import.meta.env.VITE_API;

const thead = ["N°", "Paralelos", "Editar"];

export const Room = () => {
  const [active, setActive] = useState(false);
  const [room, setRoom] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState({
    ROOM_NAME: "",
  });

  const URL = `${apiURL}room`;
  const rooms = useFetch(URL);

  const toggle = () => {
    setActive(!active);
  };

  const handle = (e) => {
    const newData = { ...data };
    newData["ROOM_NAME"] = e.target.value;
    setData(newData);
    console.log(newData);
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .patch(`${apiURL}room/${id}`, {
        ROOM_NAME: data.ROOM_NAME,
      })
      .then((res) => {
        window.location.reload();
      });
  };

  return (
    <section className="Table">
      <Button className="Button" title="Agregar" />
      <DataTable title="Paralelos" thead={thead}>
        {rooms.map((item, key) => (
          <tr key={key}>
            <td className="DataTable-td">{item.ROOM_ID}</td>
            <td className="DataTable-td">{item.ROOM_NAME}</td>
            <td className="DataTable-td">
              <button
                onClick={() => {
                  setActive(!active);
                  setRoom(item.ROOM_NAME);
                  setId(item.ROOM_ID);
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
      <Modal className="Modal" active={active} toggle={toggle}>
        <form onSubmit={(e) => submit(e)}>
          <select onChange={handle}>
            {rooms.map((element, key) => (
              <option key={key} defaultValue={room}>
                {element.ROOM_NAME}
              </option>
            ))}
          </select>
          <Button className="Button" title="Editar" />
        </form>
      </Modal>
    </section>
  );
};
