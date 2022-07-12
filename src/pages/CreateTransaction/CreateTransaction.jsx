import './createTransaction.css'
import { useState, useEffect } from 'react'
import * as transService from '../../utilities/transactions-service'
import * as userService from '../../utilities/users-service'
import { useNavigate } from 'react-router-dom'
import { userOmg } from '../../utilities/users-service'

let id = userService.getUserId()

const CreateTransaction = () => {
    const [userr, setUser]= useState({})
    
    useEffect(() => {
        (async () => {
            const userN = await userOmg()
            setUser(userN.data)
            // console.log(userr,'user at first')
        })()
    }, [])
    //==========================================================
    const [newTransaction, setNewTrans]= useState({ 
       trans_name :'' ,
       amount :'',
       trans_type:'',
       userId : id
    })
    const navigate = useNavigate()
     const handleChange = (e)=>{
        setNewTrans({
            ...newTransaction,
            [e.target.name]: e.target.value
        })
    }
   const handle =(e)=>{
const d=e.target.value
newTransaction.trans_type=d
}
    const handleSubmit=(e)=>{
        // e.preventDefault()
        transService.createTransaction(newTransaction)
let newB=userr.balance
let newIncome=userr.income
let newExpences=userr.expences
         if (newTransaction.trans_type==='deposit'){
            newIncome=(newTransaction.amount  *1 + userr.income * 1)
         }
         if (newTransaction.trans_type === 'withdrawl'){
            newExpences = (userr.expences*1 + newTransaction.amount *1)
         }
         newB = newIncome - newExpences
         userService.updateUserBalance(newB,newIncome,newExpences)
// ineed something code to update the user balance before vavigate to trans
//====================================
         navigate('/transactions')
    }
    
    
    return (
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-8">
                <label htmlFor="trans_name" className="form-label">transaction name</label>
                <input 
                    type="text"
                    value={newTransaction.trans_name} 
                    name='trans_name' 
                    className="form-control" 
                    id="trans_name" 
                    onChange={handleChange}
                  />
        
                <label htmlFor="amount" className="form-label">amount</label>
                <input 
                    type="text"  
                    value={newTransaction.amount} 
                    name='amount'
                    onChange={handleChange} 
                    className="form-control" 
                    id="amount" 
                />
                <label htmlFor="trans_type" className="form-label">transaction Type</label>
                <select id="trans_type" className="form-select"onChange={handle} >
                    <option name='trans_type'selected >Choose...</option>
                    <option  name='trans_type'  value='deposit' >deposit</option>
                    <option  name='trans_type' value='withdrawl'>withdrawl</option>
                </select>
                <button type="submit" className="btn btn-danger" >add</button>
{/* <h3>balance = {userr.balance} $</h3>
<h3>Total Income = {userr.income} $</h3>
<h3>Total expences = {userr.expences}$</h3> */}
            </div>


        </form>
      
    );
}
export default CreateTransaction;