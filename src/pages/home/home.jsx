import { useState, useEffect } from "react";
import { Navbar, HotelCard , Categories , SearchStayWithDate } from "../../components";
import "./Home.css";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCategory ,useDate } from "../../context";
export const Home = () => {
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(16);
  const [testData, setTestData] = useState([]);
  const [hotels, setHotels] = useState([]);
  const {hotelCategory} = useCategory()
  const {isSearchModalOpen} = useDate()

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
      `https://travelstay-backendapp.onrender.com/api/hotels?category=${hotelCategory} `        );
        setTestData(data);
        setHotels(data ? data.slice(0, 16) : []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [hotelCategory]);

  const fetchMoreData = () => {
    if (hotels.length >= testData.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      const nextIndex = currentIndex + 16;
      setHotels((prev) => [
        ...prev,
        ...testData.slice(currentIndex, nextIndex),
      ]);
      setCurrentIndex(nextIndex);
    }, 1000);
  };

  return (
    <div className="relative">
      <Navbar />
      <Categories/>
      {hotels.length > 0 ? (
        <InfiniteScroll
          dataLength={hotels.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h3 className="alert-text">Loading...</h3>}
          endMessage={<p className="alert-text">You have seen it all</p>}
        >
          <main className="main d-flex align-center wrap gap-larger">
            {hotels.map((hotel) => (<HotelCard key={hotel._id} hotel={hotel} />))}
          </main>
        </InfiniteScroll>
      ) : (
        <h3 className="alert-text">Loading...</h3>
      )}
      {isSearchModalOpen && <SearchStayWithDate/>}
    </div>
   
  );
};
