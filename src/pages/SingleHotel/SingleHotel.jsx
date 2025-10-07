import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navbar, HotelImages, HotelDetails, FinalPrice } from "../../components";
import "./SingleHotel.css";

export const SingleHotel = () => {
    const { id } = useParams();
    const [singleHotel, setSingleHotel] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                  `https://travelstay-backendapp.onrender.com/api/hotels/${id}`
                );
                setSingleHotel(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <Fragment>
            <Navbar />
            <main className="single-hotel-page">
                {singleHotel ? (
                    <>
                        <p className="hotel-name-add">{singleHotel.name}, {singleHotel.state}</p>
                        <HotelImages singleHotel={singleHotel} />
                        <div className="d-flex ">
                            <HotelDetails singleHotel={singleHotel}/>
                            <FinalPrice singleHotel={singleHotel}/>
                        </div>
                    </>
                ) : (
                    <p>Loading hotel details...</p>
                )}
            </main>
        </Fragment>
    );
};
