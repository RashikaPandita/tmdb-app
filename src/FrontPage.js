import {useState,useEffect} from 'react';
import './App.css';
import axios from "axios";
import 'rsuite/dist/rsuite.min.css';
import { Link } from "react-router-dom";
import SearchBar from './SearchBar';


import { Pagination, Loader} from 'rsuite';
 
 
 function FrontPage()
{
    const [ activePage, setActivePage ] = useState(1);
    const [movieData, setMovieData] = useState([]);
    const [ totalPages, setTotalPages ] = useState(null);
    const [ searchActive, setSearchActive ] = useState(0)


   useEffect(()=>{
       (async()=>{
          const response= await axios.get(`${process.env.REACT_APP_TMDB_URL}/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${activePage}`);
          console.log(response.data.results)
          setMovieData(response.data.results)
            if(!totalPages){
                setTotalPages(response.data.total_pages)
               
        }
           })()
},[activePage]);
const handleSearchActive = (e) => {
    console.log(e)
    setSearchActive(e);
}

        return(
        <div className="container">
            <div className="mt-3 mb-3 border border-top-0 border-start-0 border-end-0 border-bottom-4 border-dark" style={{textAlign:"center"}}>
              <h1 style={{fontFamily:"Chalkduster, fantasy"}}>C - Movies</h1>
           </div>
            <div className=''>
            <SearchBar onDataChanged={handleSearchActive}/>
            </div>
                { movieData.length > 0 && !searchActive?
                (<>
                <div className="d-flex flex-wrap">
                   {
                    movieData.map((item, i) => {
                        return(
  
                        <div key={i} className="card shadow mx-auto my-3" style={{width:"300px"}} >
                             <Link to={`/movie/${item.id}`} state={{id:item.id}}> 
                            <img className="card-img-top" style={{height:"auto"}} src={`${process.env.REACT_APP_TMDB_MOVIE_POSTER}${item.poster_path}`}/>
                             </Link>
                           </div>
                        )})}
                </div>
           
            <div>
                        
            <br/>
        <Pagination
        first
        last
        prev
        next
        style={{justifyContent:"center"}}
        size="lg"
        total={totalPages}
        maxButtons={10}
        activePage={activePage}
        onChangePage={(e) => {
            console.log("pageNumber",e)
            setActivePage(e);
        }
        }/>
        <br/>
        </div>
             </>
                ):
                (!setSearchActive ? <div style={{textAlign:"center"}}>
                <Loader  style={{marginTop:"50%"}} size="lg" content="Loading...." />
            </div> :<></>)
}
            
          </div>
          ) 
            } 
export default FrontPage;