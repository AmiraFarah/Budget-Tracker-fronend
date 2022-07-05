import { useNavigate } from "react-router-dom";
const Deleted = () => {
    const navigate=useNavigate()

    return (
        <div>
            transaction deleted successfuly 
            <button className="btn btn-success" onClick={()=>navigate("/transactions")}>back to transactions</button>
        </div>
    );
}

export default Deleted;
