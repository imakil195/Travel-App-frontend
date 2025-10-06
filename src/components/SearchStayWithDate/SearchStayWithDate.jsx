import { DateSelector } from "../DateSelector/DateSelector";
import "./SearchStayWithDate.css";
import { useDate, useCategory } from "../../context";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchStayWithDate = () => {
  const { destination, guests, isSearchResultOpen, dateDispatch } = useDate();
  const { hotelCategory } = useCategory();
  const [hotels, setHotels] = useState([]);
  const navigate= useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://travelstay-backendapp.onrender.com/api/hotels?category=${hotelCategory}`
        );
        setHotels(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [hotelCategory]);

  const handleDestinationChange = (e) => {
    dateDispatch({
      type: "DESTINATION",
      payload: e.target.value,
    });
  };

  const handleGuestChange = (e) => {
    dateDispatch({
      type: "GUESTS",
      payload: e.target.value,
    });
  };

  const destinationOptions = hotels.filter(
    ({ address, city, state, country }) =>
      address?.toLowerCase().includes(destination.toLowerCase()) ||
      city?.toLowerCase().includes(destination.toLowerCase()) ||
      state?.toLowerCase().includes(destination.toLowerCase()) ||
      country?.toLowerCase().includes(destination.toLowerCase())
  );

  const handleSearchResultClick = (address) => {
    dateDispatch({
      type: "DESTINATION",
      payload: address,
    });
  };

  const handleDestinationFocus = () => {
    dateDispatch({
      type: "SHOW_SEARCH_RESULT",
    });
  };

  const handleSearchContainerClick = (e) => {
    e.stopPropagation();
  };

  const handleSearchButtonClick = () => {
    dateDispatch({
      type: "CLOSE_SEARCH_RESULT",
    });
  
    navigate(`/search/${destination}`);
  };


  return (
    <div
      className="destination-container"
      onClick={() => dateDispatch({ type: "CLOSE_SEARCH_MODAL" })}
    >
      <div
        className="destination-options d-flex align-center absolute"
        onClick={handleSearchContainerClick}
      >
        <div className="location-container">
          <label className="label">Where</label>
          <input
            value={destination}
            onChange={handleDestinationChange}
            onFocus={handleDestinationFocus}
            className="input search-dest"
            placeholder="Search Destination"
            autoFocus
          />
        </div>

        <div className="location-container">
          <label className="label">Check in</label>
          <DateSelector checkInType="in" />
        </div>

        <div className="location-container">
          <label className="label">Check out</label>
          <DateSelector checkInType="out" />
        </div>

        <div className="location-container">
          <label className="label">Number of guests</label>
          <input
            value={guests}
            className="input search-dest"
            placeholder="Add guests"
            onChange={handleGuestChange}
          />
        </div>

        <div className="search-container d-flex align-center cursor " onClick={handleSearchButtonClick}>
          <span className="material-icons-outlined">search</span>
          <span>Search</span>
        </div>
      </div>

      {isSearchResultOpen && destinationOptions.length > 0 && (
        <div
          className="search-result-container absolute"
          onClick={handleSearchContainerClick}
        >
          {destinationOptions.map(({ address, city }, idx) => (
            <p
              key={`${address}-${city}-${idx}`}
              className="p cursor-pointer"
              onClick={() => handleSearchResultClick(address)}
            >
              {address}, {city}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
