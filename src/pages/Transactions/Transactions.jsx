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
        income: 300,
        expences: 300,
        balance: 300
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
        'rgb(78, 78, 176)',
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
    // let income_count=0
    // let expences_count=0
    return (
        <div>        

                 <h2>Transactions History</h2>
        <hr />
        <div className='main'>
            <div className='graph'>

            <Doughnut data={data}></Doughnut> 
             <hr />
             <ul>
                <li>  <h4>Balance Available &#160;</h4></li>
                <li> <h5 className='balance'>{userr.balance}<HiCurrencyDollar/>   </h5></li>
             </ul>
             <ul>
                <li> <h4> Expences&#160;&#160;&#160;</h4></li>
                <li> <h5 className='expences'> {userr.expences} <HiCurrencyDollar/> &#160;&#160;&#160;&#160; { (userr.expences !== 0) ? Math.ceil((userr.expences*100)/(userr.income
                +userr.expences)) : 0 }&#160;%</h5></li>
             </ul>
             <ul>
                <li>   <h4> Income&#160;&#160;&#160;</h4>          </li>
             <li><h5 className='income'> {userr.income} <HiCurrencyDollar/>&#160;&#160;&#160;&#160;&#160;&#160;&#160; {(userr.income !== 0)? Math.floor((userr.income*100)/(userr.income
                +userr.expences)
            ) : 0}&#160;%</h5></li>
             </ul>

            </div>
            <div className="history">


                {
                    transactions.map(transaction => (

                        <div className='trans'>
                            {/* <h5> {transaction.trans_type} </h5> */}
                           <ul className='tr'>
                           <li> <h5>{transaction.amount} $ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h5></li>
                           <li>   <h5>{transaction.trans_name} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h5></li> 
                           </ul>
                           
                            <button onClick={() => navigate(`/transactions/${transaction._id}`, { state: transaction })}>show </button>
                            <button onClick={() => navigate('/deleted', { state: transaction })}> delete</button>
                            <hr />

                        </div>
                    )

                    )}
                <Link className="btn btn-outline-primary" to='/transactions/create'> Add Transactions</Link>
<button className='btn btn-outline-danger' onClick={()=>navigate('/transactions/date', {state:transactions})}> Show by date</button>
            </div>

        </div >
        </div>

    )

}
export default Transactions;