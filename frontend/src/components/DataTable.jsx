export const DataTable = ({ title, thead, children }) => {
  return (
    <section className="DataTable">
      <div className="DataTable-title">
        <h2>{title}</h2>
      </div>
      
        <table className="DataTable-table">
          <thead>
            <tr>
              {thead.map((element, key) => (
                <th key={key}>{element}</th>
              ))}
            </tr>
          </thead>
          <tbody className="DataTable-tbody">{children}</tbody>
        </table>
      
    </section>
  );
};
