import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Datee = (state) => {

    const [selectedDate, setSelectedDate] = useState(new Date())
    const location = useLocation();
    const transactions = location.state
    let newArr = []
    const filtered = ()=>{

        for(let i = 0 ; i<transactions.length ; i++){
            if (transactions.date === selectedDate)
            newArr.push(transactions)
            console.log(newArr[i].date)
        }
    }

    return (
        <div>
            Pick a Date to review transactions

            <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
             
            <button onClick={filtered}> show</button>
                   

            
        </div>
    );
}

export default Datee;
