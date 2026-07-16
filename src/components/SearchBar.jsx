function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrapper large-search">
      <span className="search-icon" aria-hidden="true">🔎</span>
      <input
        className="search-input"
        placeholder="Search users by name, email or department..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;
