import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FrontPage from "./FrontPage";
import NextPage from "./NextPage";

function App() {
  return(
    <Router>
        <Routes>
            <Route exact path="/" Component={FrontPage}/>
            <Route path="/movie/:movieId/" Component={NextPage}/>           
        </Routes>
    </Router>
)
  }
 
export default App;
