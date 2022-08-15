import React, { useRef } from "react";
import { FiSearch } from "react-icons/fi";

const Search = ({ setSearch }) => {
    const inputRef = useRef()
    const searchHandler = event=>{
    event.preventDefault()
    setSearch(inputRef.current.value)
}
  return (
    <div className="search">
      <form onSubmit={searchHandler}>
        <div className="search__area">
          <input ref={inputRef} type="text" placeholder="Search" />
          <button type="submit">
            <FiSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
