import {  useLocation, useNavigate } from "react-router-dom";

const Show = () => {

    const navigate = useNavigate()
    const location = useLocation()
   const  transDetails = location.state

   const dateFormat = (date)=>{
 let d = new Date(date)
let day = new Intl.DateTimeFormat('en',{day :'2-digit'}).format(d)
let month = new Intl.DateTimeFormat('en',{month :'short'}).format(d)
let year = new Intl.DateTimeFormat('en',{year :'numeric'}).format(d)
return (`${month}-${day}-${year}`)

}
    return (
        <div className='show'>
            <p></p>
            <h5> Transaction Details</h5>
            <hr />
            <p></p>
            <h5>  {transDetails.trans_type}</h5>
            <p></p>
            <hr />
            <h5> {transDetails.trans_name}</h5>
            <p></p>
<hr />           
 <h5>   {transDetails.amount}$</h5>
           <hr />
           
           <h5>created on {dateFormat(transDetails.date)}</h5>
           <hr />
            <button 
                className="btn btn-success" 
                onClick={()=> navigate(`/transactions`)}> back 
            </button>
        </div>
    );
}

export default Show;
