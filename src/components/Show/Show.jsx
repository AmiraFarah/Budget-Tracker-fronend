import {  useLocation, useNavigate } from "react-router-dom";

const Show = () => {
    const navigate = useNavigate()
    const location = useLocation()
   const  transDetails = location.state
    return (
        <div>
            <p>{transDetails.trans_type}</p>
            <p>{transDetails.trans_name}</p>
            <p>{transDetails.amount}$</p>
            <button 
                className="btn btn-success" 
                onClick={()=> navigate(`/transactions`)}> back to transactions
            </button>

        </div>
    );
}

export default Show;
