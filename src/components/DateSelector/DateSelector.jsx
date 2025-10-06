import DatePicker from "react-datepicker"
import "./DateSelector.css"
import "react-datepicker/dist/react-datepicker.css";
import { useDate } from "../../context";
import { useState } from "react"
export const DateSelector = ({placeholder,checkInType}) => { 

    const [currentDate , setCurrentDate] = useState(new Date())
    const {checkInDate,checkOutDate , dateDispatch} = useDate()
    const handleDateChange = (date) => {
        setCurrentDate(date)
        dateDispatch({
            type:checkInType === "in" ? "CHECK_IN" : "CHECK_OUT",
            payload:date  
        }
        )
    }  

    const handleDateFocus = () => {
        dateDispatch({
            type:"DATE_FOCUS",
            
        })
    }
    console.log({checkInDate , checkOutDate}) 
    

    return(
        <DatePicker 
        selected={checkInType === "in" ? checkInDate : checkOutDate}
        onChange={(date) => handleDateChange(date)}
        onFocus={handleDateFocus}
        className="search-dest input"
        dateFormat="dd/MM/yyyy" placeholderText="Add Dates" closeOnScroll={true}/>
    )
}