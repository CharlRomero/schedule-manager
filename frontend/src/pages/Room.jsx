import { useState } from "react";
import axios from "axios";

import { useFetch } from "../util/useFetch";

import { DataTable } from "../components/DataTable";
import { Button } from "../components/button/Button";
import Modal from "../components/modals/Modal";

const apiURL = import.meta.env.VITE_API;

const thead = ["N°", "Paralelos", ""];

export const Room = () => {
  const [active, setActive] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
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

  const toggleCreate = () => {
    setActiveModal(!activeModal);
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

  const create = (e) => {
    e.preventDefault();
    axios
      .post(`${apiURL}room`, {
        ROOM_NAME: data.ROOM_NAME,
      })
      .then((res) => {
        window.location.reload();
      });
  };

  return (
    <section className="Table">
      <Button className="Button" title="Agregar" onClick={toggleCreate}>
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
      <DataTable
        className="DataTable DataTable--resize"
        title="Paralelos"
        thead={thead}
      >
        {rooms.map((item, key) => (
          <tr className="DataTable-tr" key={key}>
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
      <Modal className="Modal" active={activeModal} toggle={toggleCreate}>
        <form onSubmit={(e) => create(e)}>
          <input
            type="text"
            placeholder="Ingrese el paralelo"
            onChange={handle}
          />
          <Button className="Button" title="Agregar" />
        </form>
      </Modal>
    </section>
  );
};
