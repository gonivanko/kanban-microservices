import searchIcon from './assets/search_icon.png'


function Search(){
    return (
        <div className="search-div">
            <img src={searchIcon} alt="search icon" className="search-icon"></img>
            <input className="search" placeholder="Search"></input>
        </div>
    );
}

export default Search