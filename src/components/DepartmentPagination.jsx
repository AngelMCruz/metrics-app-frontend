import React from 'react';

const DepartmentPagination = ({ departamentos, activo, onSelect }) => {
  const handlePrev = () => {
    const currentIndex = departamentos.findIndex(d => d.id.toString() === activo);
    const prevIndex = (currentIndex - 1 + departamentos.length) % departamentos.length;
    onSelect(departamentos[prevIndex].id.toString());
  };

  const handleNext = () => {
    const currentIndex = departamentos.findIndex(d => d.id.toString() === activo);
    const nextIndex = (currentIndex + 1) % departamentos.length;
    onSelect(departamentos[nextIndex].id.toString());
  };

  return (
    <div className="dashboard-pagination">
      <button className="pagination-arrow" onClick={handlePrev} title="Departamento anterior">
        ◀
      </button>

      <div className="pagination-dots">
        {departamentos.map((dept) => (
          <button
            key={dept.id}
            className={`pagination-dot ${activo === dept.id.toString() ? 'active' : ''}`}
            onClick={() => onSelect(dept.id.toString())}
            title={dept.nombre}
          />
        ))}
      </div>

      <button className="pagination-arrow" onClick={handleNext} title="Siguiente departamento">
        ▶
      </button>
    </div>
  );
};

export default DepartmentPagination;