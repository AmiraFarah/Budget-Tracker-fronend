import { useLocation, useNavigate } from "react-router-dom";
import { deleteTransaction } from '../../utilities/transactions-service'
import { useState, useEffect } from "react";
import { userOmg } from "../../utilities/users-service";
import * as userService from '../../utilities/users-service'



const Deleted = (state) => {

    const [user, setUser] = useState({
income:0,
balance:0,
expences :0
    })

    //fetch the user data from user-service     
    useEffect(() => {
        (async () => {
            const userToDelFrom = await userOmg()
            setUser(userToDelFrom.data)
            console.log(userToDelFrom, 'user')


        })()
    }, [])
    console.log(user.income,'income')
    // below variables to update the data after deletion 
    let newIncome = user.income
    let newExpences = user.expences
    let newBalance = user.balance

    const navigate = useNavigate()
    const location = useLocation()
    // useLocation to grab the transaction info from where it came from which is transacion component] 
    const transaction = location.state


    const handleDelete = async () => {

        // console.log(transaction,'transa')

        try {
            const res = await deleteTransaction(transaction._id)
            if (res.status === 200) {
               
                    if (transaction.trans_type === 'deposit') {
                        newIncome = newIncome * 1 - transaction.amount * 1
                    }
                    if (transaction.trans_type === 'withdrawl') {
                        newExpences = newExpences * 1 - transaction.amount * 1
                    }
                    newBalance = newIncome - newExpences

                    userService.updateUserBalance(newBalance, newIncome, newExpences)

                    navigate('/transactions')
                }
            

        } catch (e) {
            console.log(e)
        }

    }
    return (
        <div className="delete">
            <h3> You are about to Delete</h3>
           <h3 className="red"> &nbsp;&nbsp;&nbsp;&nbsp; A transaction</h3>
            <button className="btn btn-primary" onClick={() => navigate("/transactions")}>back to transactions</button>
            <button className="btn btn-danger" onClick={handleDelete}> delete</button>
        </div>
    );
}

export default Deleted;
