import './transactions.css'
import React from 'react';
import { useState, useEffect } from 'react'
import { getTransactions } from '../../utilities/transactions-service'
import { useNavigate } from 'react-router-dom';
// import { deleteTransaction } from '../../utilities/transactions-service'
import { Chart, ArcElement } from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import { Link } from 'react-router-dom'
import { userOmg } from '../../utilities/users-service'
import {HiCurrencyDollar} from 'react-icons/hi'

Chart.register(ArcElement)



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
        income: 1,
        expences: 1,
        balance: 1
        // add random values inorder to change the state so the useEffect will fire 
        // and get the user after update with new transaction  up moment 
    })
    useEffect(() => {
        (async () => {
            const userN = await userOmg()
            setUser(userN.data)
        })()
    }, [])
//==================================
//Chart Data

const data={
    labels :    ['balance','income','expences'],
  
    datasets:[{
     data:[userr.balance,userr.income,userr.expences],
      backgroundColor: [
        'rgb(255,215,0)',
        'rgb(75,0,130)',
        'rgb(220,20,60)'
    ],
        hoverOffset:4,
        borderRadius :10,
        cutout : 100,
      
      }],
  
}
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
        <div>             <h2>Transactions History</h2>
        <hr />
        <div className='main'>
            <div className='graph'>

            <Doughnut data={data}></Doughnut> 
             <hr />
             <ul>
                <li>  <h4>Balance Available &#160;</h4></li>
                <li> <h5 className='balance'>{userr.balance} <HiCurrencyDollar/></h5></li>
             </ul>
             <ul>
                <li> <h4>Total Expences&#160;</h4></li>
                <li> <h5 className='expences'> {userr.expences} <HiCurrencyDollar/></h5></li>
             </ul>
             <ul>
                <li>   <h4>Total Income&#160;</h4>          </li>
             <li><h5 className='income'> {userr.income} <HiCurrencyDollar/></h5></li>
             </ul>
               
            </div>
            <div className="history">


                {
                    transactions.map(transaction => (

                        <div className='trans'>
<h5> {transaction.trans_type} </h5>
<h5>{transaction.amount} $</h5>
<h5>{transaction.trans_name} </h5>
                            {/* <ul className="list-group" >
                                <li className="list-group-item">{transaction.amount}$</li>
                                <li className="list-group-item">{transaction.trans_name}</li>
                            </ul> */}
                            <button onClick={() => navigate(`/transactions/${transaction._id}`, { state: transaction })}>show </button>
                            {/* <button onClick={() => (handleDelete(transaction._id))}><FcFullTrash /></button> */}
                            <button onClick={() => navigate('/deleted', { state: transaction })}> delete</button>
                            {/* <p> balance = {userService.getBalance}</p> */}
                            <hr />

                        </div>
                    )

                    )}
                <Link className="btn btn-success" to='/transactions/create'> Add Transactions</Link>

            </div>

        </div >
        </div>

    )

}
export default Transactions;