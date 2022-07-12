import axios from 'axios'
import { getToken } from './users-service'
import * as userService from './users-service'
//import { useNavigate } from 'react-router-dom'

const BASE_URL = 'http://localhost:9090/api/v1/transactions'

const setOptions =()=>{
  return { headers: {
    'Authorization': `Bearer ${getToken()}`,
    'Content-Type': 'application/json'
  }
}}
 let iid = userService.getUserId() //user id to append with URL


export const getTransactions = async (i) => {

  try {

    const response = await axios.get(BASE_URL + `/${iid}`, setOptions())
     if (response.status===200 ){ 
    return response;
     }
     else return ('no data available  yet')
  } catch (e) {
    console.log(e,'errrrrror')
  }
}

export const createTransaction = async (newTransaction) => {
  try {
         const createdTransaction = await axios.post(BASE_URL+`/${newTransaction.userId}`,newTransaction, setOptions())
        return createdTransaction
        } catch (e) {
console.log(e)
  }
}

export const updateTransaction = async (transaction_details)=>{
  try {
    const updatedTransaction= await axios.put(BASE_URL, transaction_details, setOptions())
    return updatedTransaction

  } catch (e) {
     console.log(e,' error with updating')
  }
}
export const deleteTransaction = async (id)=>{
  try {
    const deletedTransaction = await axios.delete(`${BASE_URL}/${id}`,setOptions())
    return deletedTransaction
  } catch (e) {
   console.log(e) 
  }

}
 

