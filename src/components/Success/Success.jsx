import { useNavigate } from "react-router-dom";
import { userOmg } from "../../utilities/users-service";
import { useState, useEffect } from "react";

const Success = () => {

    const navigate = useNavigate()
    const [user,setUser] =useState({})

    useEffect(() => {
        (async () => {

            const userN = await userOmg()
            setUser(userN.data)
        })()
    }, [])

 const    handleClick=()=>{
       navigate('/transactions') 
    }


    
    return (
        <div className="success">
           <h3>Transction added successfuly </h3> 
           <hr />
        <button className="btn btn-success" onClick={handleClick}> Back to transaction</button>
<hr />
<button className="btn btn-danger" onClick={()=>navigate('/transactions/create')}>add another transaction</button>
                    </div>
    );
}

export default Success;