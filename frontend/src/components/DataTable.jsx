export const DataTable = ({ title, th, children }) => {
  return (
    <section className="DataTable">
      <div className="DataTable-title">
        <h2>{title}</h2>
      </div>
      <div className="DataTable-table">
        <table>
          <thead>
            <tr>
              {th.map((element, key) => (
                <th key={key}>{element.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </section>
  );
};
