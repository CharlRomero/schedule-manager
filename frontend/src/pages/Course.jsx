import { useFetch } from "../util/useFetch";

import { DataTable } from "../components/DataTable";

const apiURL = import.meta.env.VITE_API;

export const Course = () => {
  const URL = `${apiURL}course`;
  const courses = useFetch(URL);

  return (
    <>
      <DataTable></DataTable>
    </>
  );
};
