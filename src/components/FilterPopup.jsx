function FilterPopup({ isOpen, filters, onChange, onClose, onReset, departments }) {
  if (!isOpen) {
    return null;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    onChange((currentFilters) => ({ ...currentFilters, [name]: value }));
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Filter Users</h3>
          <button type="button" className="icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="filter-first-name">First Name</label>
            <input id="filter-first-name" name="firstName" value={filters.firstName} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="filter-last-name">Last Name</label>
            <input id="filter-last-name" name="lastName" value={filters.lastName} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="filter-email">Email</label>
            <input id="filter-email" name="email" value={filters.email} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="filter-department">Department</label>
            <select id="filter-department" name="department" value={filters.department} onChange={handleChange}>
              <option value="">All Departments</option>
              {(departments || []).map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="secondary-btn" onClick={onReset}>Reset Filters</button>
          <button type="button" className="primary-btn" onClick={onClose}>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;
