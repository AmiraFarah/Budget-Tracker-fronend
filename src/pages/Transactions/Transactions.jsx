import { useState, useEffect } from 'react'
import { getTransactions } from '../../utilities/transactions-service'
import { FcMoneyTransfer } from "react-icons/fc";
import { FcFullTrash } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import {deleteTransaction} from '../../utilities/transactions-service'


// import { logOut, getUser } from '../../utilities/users-service'
import * as userService from '../../utilities/users-service'
import { Link } from 'react-router-dom'

import './transactions.css'
const Transactions = () => {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        (async () => {
            const transactionsRes = await getTransactions()
            setTransactions(transactionsRes.data)
        })()
    }, [])

    const [user, setUser] = useState('')
    useEffect(() => {
        setUser(userService.getUser())
    }

        , [])
        const navigate = useNavigate()
        const handleDelete = async (transToDeleteId)=>{
           
           try {
            console.log(transToDeleteId)
            const res = await deleteTransaction(transToDeleteId)
           if (res.status === 200) navigate('/deleted')
            
           } catch (e) {
            console.log(e)
           } 
        }
    

    return (
        <div>
            {
                transactions.map(transaction => (

                    <div>
                        <ul className="list-group" >
                            <li className="list-group-item active" aria-current="true">{transaction.date}</li>
                            <li className="list-group-item">{transaction.amount}$</li>
                            <li className="list-group-item">{transaction.trans_type}</li>
                            <li className="list-group-item">{transaction.trans_name}</li>
                        </ul>
                        <h5>ending ballance {user.balance}$</h5>
                        <button onClick={()=> navigate(`/transactions/${transaction._id}`,{state:transaction})}><FcMoneyTransfer size="3rem"/> </button>
                         <button onClick={()=>(handleDelete(transaction._id))}><FcFullTrash/></button>
                    </div>

                )
                )

            }
            <Link class="btn btn-success" to='/transactions/create'> Add Transactions</Link>

        </div >)

}
export default Transactions;