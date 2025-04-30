import React from 'react';

const SearchForm = ({ value, onChange, onSubmit }) => (
  <form className="search-container" onSubmit={onSubmit}>
    <input
      type="text"
      placeholder="🔍 Search for ticket"
      value={value}
      onChange={onChange}
      className="search-input"
    />
    <span className="search-icon"></span>
    <button type="submit" style={{ display: 'none' }}></button>
  </form>
);

export default SearchForm;