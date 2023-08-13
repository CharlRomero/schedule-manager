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
};
