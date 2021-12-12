import { HiSearch, HiSortAscending, HiSortDescending } from 'react-icons/hi';
import { ImSortAlphaAsc, ImSortAlphaDesc } from 'react-icons/im';
import { useRef, useState } from 'react';

export default function SearchBar(props) {
  const inputElement = useRef('')

  function getSearchTerm() {
    props.searchHandler(inputElement.current.value);
  }

  return (
    <div className="mb-3 relative flex items-center">
      <div>
        <HiSearch className="h-5 w-5 absolute mt-1 ml-1 text-lynx-text-dark" />
        <input type="text" placeholder="Search" ref={inputElement} value={props.searchTerm} onChange={getSearchTerm} className="bg-lynx-bg-light text-lynx-text-light focus:outline-none rounded-md py-1 pl-7 pr-48"/>
      </div>
      <button onClick={() => props.sortAZ()} className="ml-3"><ImSortAlphaAsc /></button>
      <button onClick={() => props.sortZA()} className="ml-1"><ImSortAlphaDesc /></button>
    </div>
  )
}