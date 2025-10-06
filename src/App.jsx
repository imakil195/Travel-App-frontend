import './App.css';
import { Home , SearchResults, SingleHotel } from "./pages";
import { Routes, Route} from 'react-router-dom';


function App() {
  return(
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/hotels/:id" element={<SingleHotel/>}/>
      <Route path="/search/:destination" element={<SearchResults />}/>
      
    </Routes>
     
  )
}

export default App;