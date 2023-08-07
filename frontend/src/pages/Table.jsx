import React from "react";

const Table = () => {
  return (
    <div>
      <h1>Tabla 2x2</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
        <div style={{ background: "#f0f0f0", padding: "20px" }}>Celda 1</div>
        <div style={{ background: "#f0f0f0", padding: "20px" }}>Celda 2</div>
        <div style={{ background: "#f0f0f0", padding: "20px" }}>Celda 3</div>
        <div style={{ background: "#f0f0f0", padding: "20px" }}>Celda 4</div>
      </div>
    </div>
  );
};

export { Table };
