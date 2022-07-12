import { useNavigate, useLocation } from "react-router-dom";

const Welcome = (state) => {

    const location=useLocation()
    const navigate= useNavigate()
    const user = location.state
    return (
        <div className="welcome">
           <h1>welcome </h1>
           <h2 className="succ"> You Signed up Successfully </h2> 
           <button className="btn btn-success" onClick={()=> navigate('/login',{state:user})}> go back to login </button>
        </div>
    );
}

export default Welcome;
