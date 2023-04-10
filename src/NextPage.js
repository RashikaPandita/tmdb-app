
import React, { useState,useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";


function NextPage()
{ console.log("Hey Its next Page")
const [item,setItem]=useState([])
const location = useLocation();
const { id } = location.state;
useEffect(() => {
    (async () => {
        const response = await axios.get(`${process.env.REACT_APP_TMDB_URL}/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        console.log(response.data)
        setItem(response.data);
    })();
    
},[]);

    return (
         
        <div className="mx-auto w-75 d-flex"> 
            <div className="card-body"> 
                <h1 className="card-title">{item.original_title}</h1>
                <br/>
                <p className="card-text">{item.overview}</p>
                <br/>
                <kbd className="col-8 col-sm-12 col-md-4">Budget:$ {item.budget/1000000}M</kbd>
                <br/>
                <kbd className="col-8 col-sm-12 col-md-4">Status:$ {item.status}</kbd>
                <br/>
                <kbd className="col-8 col-sm-12 col-md-4">TagLine:$ {item.tagline}</kbd>
            </div>
            <div className="col-4">
            <img className="card-img-bottom" src={`${process.env.REACT_APP_TMDB_MOVIE_POSTER}${item.poster_path}`}/>
         
            </div>    
        </div> 
        
    )

}
export default NextPage