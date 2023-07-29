import { useFetch } from "../util/useFetch";

import { DataTable } from "../components/DataTable";

const apiURL = import.meta.env.VITE_API;

const th = [
  {
    name: "N",
  },
  { name: "Paralelo" },
  {
    name: "Año",
  },
  {
    name: "Periodo",
  },
];

export const Course = () => {
  const URL = `${apiURL}course`;
  const courses = useFetch(URL);

  return (
    <>
      <DataTable title="Cursos" th={th}>
        {courses.map((course, key) => (
          <tr key={key}>
            <td>{course.COU_ID}</td>
            <td>{course.COU_NAME}</td>
            <td>{course.COU_YEAR}</td>
            <td>{course.COU_PERIOD}</td>
          </tr>
        ))}
      </DataTable>
    </>
  );
};
