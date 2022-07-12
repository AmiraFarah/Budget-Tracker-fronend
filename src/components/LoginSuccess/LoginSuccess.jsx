
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as userService from '../../utilities/users-service'


const LoginSuccess = (state) => {
  
    const navigate = useNavigate()
    const location = useLocation()
    const id=location.state
    const [user,setUser] = useState({
      income:1,
      expences :1,
      balance :1  
    })
    useEffect(() => {
        (async () => {
            const userN= await userService.anotherUser(id)
            setUser(userN.data)
            // console.log(userr,'user at first')
        })()
    }, [])
    console.log(user,'another user')
    const handleSubmit = async ()=>{

        navigate('/transactions')
    }
    return (
        <div>
            You loged in successfuly
            <button onClick={handleSubmit}> Check history</button>
        </div>
    );
}

export default LoginSuccess;
