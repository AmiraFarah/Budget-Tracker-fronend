import {  useLocation, useNavigate } from "react-router-dom";

const Show = () => {
    const navigate = useNavigate()
    const location = useLocation()
   const  transDetails = location.state
    return (
        <div className='show'>
            <p>Trans Type  {transDetails.trans_type}</p>
            <p>Trans Name {transDetails.trans_name}</p>
            <p> Amount  {transDetails.amount}$</p>
            <button 
                className="btn btn-success" 
                onClick={()=> navigate(`/transactions`)}> back 
            </button>

        </div>
    );
}

export default Show;
