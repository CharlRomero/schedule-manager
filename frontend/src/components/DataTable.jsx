export const DataTable = ({ title, thead, children, className }) => {
  return (
    <section className={className}>
      <div className="DataTable-title">
        <h2 className="DataTable-title--h2">{title}</h2>
      </div>

      <table className="DataTable-table">
        <thead className="DataTable-thead">
          <tr className="DataTable-tr--head">
            {thead.map((element, key) => (
              <th className="DataTable-th" key={key}>
                {element}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="DataTable-tbody">{children}</tbody>
      </table>
    </section>
  );
};
