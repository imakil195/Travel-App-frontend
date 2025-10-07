
import { useDate} from "../../context";
import "./FinalPrice.css";
import { DateSelector } from '../DateSelector/DateSelector';
import { useNavigate } from "react-router-dom";

export const FinalPrice = ({singleHotel}) => {
    const {_id , price,rating} = singleHotel;

    const {guests , dateDispatch, checkInDate, checkOutDate} = useDate();

    const navigate = useNavigate();


    const handleGuestChange = (event) => {
      dateDispatch({type:"GUESTS", payload: Number(event.target.value) || 0})
    }

    const handleReserveClick = () => {
      navigate(`/confirm-booking/stay/${_id}`);
    };

  return (
    <div className="price-details-container d-flex direction-column gap shadow">
      <div className="price-rating d-flex align-center justify-space-between">
        <p>
          <span className="fs-bold fs-large">Rs. {price}</span> night
        </p>
        <span className="rating d-flex align-center">
          <span className="material-icons-outlined">star</span>
          <span>{rating}</span>
        </span>
      </div>
      <div className="d-flex direction-column">
        <div className="grid-container-two-col selected-dates">
          <div className="checkin loc-container">
            <label className="label">Check in</label>
            <DateSelector checkInType="in" />
          </div>
          <div className="checkin loc-container">
            <label className="label">Check Out</label>
            <DateSelector checkInType="out" />
          </div>
        </div>
        <div className="guests gutter-sm">
            <p>GUESTS</p>
           {guests === 0 ? (
             <input 
               className="guest-count-input" 
               type="number" 
               min="0"
               placeholder="Add guests" 
               value={guests || ''} 
               onChange={handleGuestChange}
             />
           ) : (
             <span className="cursor-pointer" onClick={() => dateDispatch({type: "GUESTS", payload: 0})}>
               {guests} guest{guests !== 1 ? 's' : ''}
             </span>
           )}

        
        </div>
      </div>
      <div>
            <button className="button btn-reserve btn-primary cursor" 
            onClick={handleReserveClick} 
            disabled={!checkInDate || !checkOutDate || guests <= 0}>
              Reserve
              </button>       
      </div>
      <div className="price-distrbution d-flex direction-column">
        <div className="final-price d-flex align-center justify-space-between">
            <span className="span">Rs. {price} x 2 nights </span>
            <span className="span"> Rs. {price * 2}</span>
        </div>
          <div className="final-price d-flex align-center justify-space-between">
            <span className="span">Service fee </span>
            <span className="span"> Rs. 200</span>
        </div>
          <div className="final-price d-flex align-center justify-space-between">
            <span className="span">Total</span>
            <span className="span">Rs. {price *2 + 200} </span>
        </div>
      </div>
    </div>
  );
};