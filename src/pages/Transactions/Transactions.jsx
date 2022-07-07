import { useState, useEffect } from 'react'
import { getTransactions } from '../../utilities/transactions-service'
import { useNavigate } from 'react-router-dom';
// import { deleteTransaction } from '../../utilities/transactions-service'
import { Link } from 'react-router-dom'
import { userOmg } from '../../utilities/users-service'


import './transactions.css'
const Transactions = () => {

    const [transactions, setTransactions] = useState([])
    // {setExpences(expences_count)}


    useEffect(() => {
        (async () => {
            const transactionsRes = await getTransactions()
            setTransactions(transactionsRes.data)
        })()
    }, [])
    //============================================= 
    const [userr, setUser] = useState({
        income: 300,
        expences : 500,
        balance : 200
        // add random values inorder to change the state so the useEffect will fire 
        // and get the user after update with new transaction  up moment 
    })
    useEffect(() => {
        (async () => {
            const userN = await userOmg()
            setUser(userN.data)
        })()
    }, [])

    //=======================================
    const navigate = useNavigate()
    // const handleDelete = async (transToDeleteId) => {

    //     try {
    //         const res = await deleteTransaction(transToDeleteId)
    //         if (res.status === 200) navigate('/deleted')

    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    // let income_count=0
    // let expences_count=0
    return (

        <div className="history">

            <h2>History</h2>
            <h3>Balance {userr.balance}</h3>
            <h3>Total Expences {userr.expences} </h3>
            <h3>Total Income {userr.income}</h3>

            {
                transactions.map(transaction => (

                    <div>

                        <ul className="list-group" >
                            <li className="list-group-item">{transaction.amount}$</li>
                            <li className="list-group-item">{transaction.trans_name}</li>
                        </ul>
                        <button onClick={() => navigate(`/transactions/${transaction._id}`, { state: transaction })}>show </button>
                        {/* <button onClick={() => (handleDelete(transaction._id))}><FcFullTrash /></button> */}
                        <button onClick={() => navigate('/deleted', { state: transaction })}> delete</button>
                        {/* <p> balance = {userService.getBalance}</p> */}
                    </div>
                )

                )}


            <Link className="btn btn-success" to='/transactions/create'> Add Transactions</Link>

        </div >)

}
export default Transactions;