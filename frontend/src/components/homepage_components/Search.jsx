import searchIcon from './assets/search_icon.png';

function Search({ onSearch }) {
  return (
    <div className="search-div">
      <img src={searchIcon} alt="search icon" className="search-icon" />
      <input
        className="search"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)} // Pass the search input to parent
      />
    </div>
  );
}

export default Search;
