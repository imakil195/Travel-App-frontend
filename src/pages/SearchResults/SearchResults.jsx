import { Fragment, useEffect, useState } from "react";
import { HotelCard, Navbar } from "../../components";
import { useDate, useCategory } from "../../context";
import axios from "axios";
import "./SearchResults.css";

export const SearchResults = () => {
  const { destination } = useDate();
  const { hotelCategory } = useCategory();

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(
          `https://travelstay-backendapp.onrender.com/api/hotels?category=${hotelCategory}`
        );
        setHotels(data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch hotels");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [hotelCategory]); // Fixed: Now depends on hotelCategory

  const filteredSearchResults = hotels.filter(
    ({ city, address, state }) =>
      address?.toLowerCase().includes(destination.toLowerCase()) ||
      city?.toLowerCase().includes(destination.toLowerCase()) ||
      state?.toLowerCase().includes(destination.toLowerCase())
  );

  if (loading) {
    return (
      <Fragment>
        <Navbar />
        <section className="main d-flex gap-larger">
          <h3>Loading hotels...</h3>
        </section>
      </Fragment>
    );
  }

  if (error) {
    return (
      <Fragment>
        <Navbar />
        <section className="main d-flex gap-larger">
          <h3>Error: {error}</h3>
        </section>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar />
      <section className="main d-flex  gap-larger">
        {filteredSearchResults.length > 0 ? (
          filteredSearchResults.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))
        ) : (
          <h3>No hotels found for "{destination}"</h3>
        )}
      </section>
    </Fragment>
  );
};
