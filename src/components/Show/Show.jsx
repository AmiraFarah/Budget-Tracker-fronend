import {  useLocation, useNavigate } from "react-router-dom";

const Show = () => {
    const navigate = useNavigate()
    const location = useLocation()
   const  transDetails = location.state
    return (
        <div className='show'>
            <p></p>
            <p></p>
            <h5>  {transDetails.trans_type}</h5>
            <p></p>
            <hr />
            <h5> {transDetails.trans_name}</h5>
            <p></p>
<hr />            <h5>   {transDetails.amount}$</h5>
           <hr />
           <p>created on {transDetails.date}</p>
            <button 
                className="btn btn-success" 
                onClick={()=> navigate(`/transactions`)}> back 
            </button>

        </div>
    );
}

export default Show;
