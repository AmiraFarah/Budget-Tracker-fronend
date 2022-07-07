import { useLocation, useNavigate } from "react-router-dom";
import { deleteTransaction } from '../../utilities/transactions-service'


const Deleted = (state) => {

    const navigate=useNavigate()
    const location = useLocation()
    const transaction = location.state
console.log(transaction._id,'id')
        const handleDelete = async () => {

            try {
                const res = await deleteTransaction(transaction._id)
                if (res.status === 200) navigate('/transactions')
    
            } catch (e) {
                console.log(e)
            }
        }    
    return (
        <div>
           <h3> you are about to delete a transaction</h3>
            <button className="btn btn-success" onClick={()=>navigate("/transactions")}>back to transactions</button>
       <button className="btn btn-danger" onClick ={handleDelete}> delete</button>
        </div>
    );
}

export default Deleted;
