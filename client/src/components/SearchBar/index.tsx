import React, { useState } from "react";

const SearchBar = ({ searchHandler }: SearchProps) => {
  const [search, setSearch] = useState('');

  const submitSearch = () => {
    searchHandler(search);
    setSearch('');
  }

  const captureSearch = (e: any) => {
    setSearch(e.target.value);
  }

  return (
    <div className="user-search">
      <h4 className="search-title">Search</h4>
      <input className="search-input" onChange={captureSearch} value={search} placeholder={search}/>
      <button className="search-button" onClick={submitSearch}>Search</button>
    </div>
  );
}

interface SearchProps {
  searchHandler: (arg0: string) => any
}
  
export default SearchBar;