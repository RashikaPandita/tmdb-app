import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"; 

function SearchBar(props) {
  const [query, setQuery] = useState('');
  const [ searchValue, setSearchValue ] = useState("");
  const [ searchedValues, setSearchedValues ] = useState([]);

  useEffect(() => {
   if(searchValue){
    (async() => {
      const response = await axios.get(`${process.env.REACT_APP_TMDB_URL}/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchValue}`);
      console.log(response.data.results);
      setSearchedValues(response.data.results);
      props.onDataChanged(1);
    })();
   }
   
    
  },[searchValue]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchQuery = () => {
    setSearchValue(query)
  };

  return (
    <div className="container">
      <input type="text" value={query} onChange={handleInputChange} />
      <button onClick={handleSearchQuery}>Search Any Movie</button>
          
            <div className="d-flex flex-wrap">
          {searchedValues.map((item, i) => {
              return(
                <div key={i} className="card shadow mx-auto my-3" style={{width:"300px"}} >
                <Link to={`/movie/${item.id}`} state={{id:item.id}}> 
                            <img className="card-img-top" style={{height:"auto"}} src={`${process.env.REACT_APP_TMDB_MOVIE_POSTER}${item.poster_path}`}/>
                 </Link>   
              </div>
              )
              }
              )
            }
            </div>
              
                        
    </div>
  )
}

export default SearchBar;