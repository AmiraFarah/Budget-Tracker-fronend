import './createTransaction.css'
import {useState} from 'react'
import * as transService from '../../utilities/transactions-service'
import * as userService from '../../utilities/users-service'
import { useNavigate } from 'react-router-dom'

let id = userService.getUserId()
// import * as transactionsService from '../../utilities/transactions-service'

const CreateTransaction = () => {

    const [newTransaction, setNewTrans]= useState({ 
       trans_name :'' ,
       amount :0,
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
// console.log(newTransaction,'new')

    const handleSubmit=(e)=>{
        e.preventDefault()
        transService.createTransaction(newTransaction)
        navigate('/transactions')

    }
    // console.log(newTransaction)

    return (
        <form className="row g-3" onSubmit={handleSubmit}>


            <div className="col-6">
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
            </div>


            <div className="col-12">
                <button type="submit" className="btn btn-primary" >add</button>
            </div>
        </form>
      
    );
}

export default CreateTransaction;
