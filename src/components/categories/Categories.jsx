import axios from "axios";
import { useEffect, useState } from "react";
import "./Categories.css";
import {useCategory} from "../../context"

export const Categories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [numberOfCategoryToShow, setNumberOfCategoryToShow] = useState(0);
  const {hotelCategory , setHotelCategory} = useCategory()

  const handleShowMoreRightClick = () => {
    setNumberOfCategoryToShow((prev) => prev + 10);
  };

  const handleShowMoreLeftClick = () => {
    setNumberOfCategoryToShow((prev) => (prev >= 10 ? prev - 10 : 0));
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://travelstay-backendapp.onrender.com/api/category"
        );
        setAllCategories(data); 
      } catch (err) {
        console.log(err);
      }
    })();
  }, [numberOfCategoryToShow]);

 
  const categoriesToShow = allCategories.slice(
    numberOfCategoryToShow,
    numberOfCategoryToShow + 10
  );

  const handleCategoryClick = (category) => {
    setHotelCategory(category)
  }

  return (
    <section className="categories d-flex align-center gap-large cursor-pointer shadow">
      {numberOfCategoryToShow >= 10 && (
        <button className="button btn-category btn-left cursor-pointer " onClick={handleShowMoreLeftClick}>
          <span className="material-icons-outlined">arrow_left</span>
        </button>
      )}

      {categoriesToShow.map(({ _id, category }) => (
        <span 
          className={`${category === hotelCategory ? "border-bottom" : ""}`} 
          key={_id} 
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </span>
      ))}

      {numberOfCategoryToShow + 10 < allCategories.length && (
        <button className="button btn-category btn-right cursor-pointer " onClick={handleShowMoreRightClick}>
          <span className="material-icons-outlined">arrow_right</span>
        </button>
      )}
    </section>
  );
};
