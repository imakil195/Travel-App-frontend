import './App.css';
import { Home , SearchResults, SingleHotel ,Wishlist, Payment, OrderSummary} from "./pages";
import { Routes, Route} from 'react-router-dom';


function App() {
  return(
    <Routes>
      <Route path="/" element={<Home />}/>

      <Route path="/hotels/:id" element={<SingleHotel/>}/>

      <Route path="/search/:address" element={<SearchResults />}/>

      <Route path="/wishlist" element={<Wishlist />}/>

      <Route path="/confirm-booking/stay/:id" element={<Payment />}/>  

      <Route path="/order-summary" element={<OrderSummary/>}/>
    </Routes>
     
  )
}

export default App;