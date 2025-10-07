import './App.css';
import { Home , SearchResults, SingleHotel ,Wishlist } from "./pages";
import { Routes, Route} from 'react-router-dom';


function App() {
  return(
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/hotels/:id" element={<SingleHotel/>}/>
      <Route path="/search/:address" element={<SearchResults />}/>
      <Route path="/wishlist" element={<Wishlist />}/>
    </Routes>
     
  )
}

export default App;