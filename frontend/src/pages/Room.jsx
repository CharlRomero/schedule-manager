import { useState } from "react";

import { useFetch } from "../util/useFetch";

import { DataTable } from "../components/DataTable";
import { Button } from "../components/button/Button";
import Modal from "../components/modals/Modal";

const apiURL = import.meta.env.VITE_API;

const thead = ["N°", "Paralelos", "Editar"];

export const Room = () => {
  const [active, setActive] = useState(false);
  const [room, setRoom] = useState("");

  const rooms = useFetch(`${apiURL}room`);

  const toggle = () => {
    setActive(!active);
  };

  const handlSubmit = () => {
    const URL = `${apiURL}room/${id}`;
    axios.patch(URL).then((res) => {
      navigate(`room`);
    });
  };

  return (
    <section className="Table">
      <Button className="Button" title="Agregar" />
      <DataTable title="Paralelos" thead={thead}>
        {rooms.map((room, key) => (
          <tr key={key}>
            <td className="DataTable-td">{room.ROOM_ID}</td>
            <td className="DataTable-td">{room.ROOM_NAME}</td>
            <td className="DataTable-td">
              <button
                onClick={() => {
                  setActive(!active);
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
        <select>
          {rooms.map((element, key) => (
            <option key={key} defaultValue={room}>
              {element.ROOM_NAME}
            </option>
          ))}
        </select>
        <Button className="Button" title="Ok" onClick={handlSubmit} />
      </Modal>
    </section>
  );
};
