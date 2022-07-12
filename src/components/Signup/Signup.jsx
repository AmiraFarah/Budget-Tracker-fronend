 import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { signup } from '../../utilities/users-service'

const Signup = ({setUser}) => {


const [newUser, setNewUser] = useState({
    email:'',
    password:'',
    repassword:''
   
})
const navigate = useNavigate()

const handleChange = (e)=>{
    setNewUser({
        ...newUser,
        [e.target.name]: e.target.value
    })

}
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            
           const user = await signup(newUser)
            setUser(user) 
            setNewUser(user)
            if (user) { navigate('/welcome',{ state : user.data})} 
        }
        catch (e) {
            console.log(e)
        }

    }
    return (
        <div className="signup-form">
    <form action="/examples/actions/confirmation.php" method="post" onSubmit={handleSubmit}>
		<div className="form-header">
			<h2>Sign Up</h2>
			<p>Fill out this form to start your free trial!</p>
		</div>
       
        <div className="form-group">
			<label>Email Address</label>
        	<input type="email" className="form-control" name="email" value={newUser.email}required onChange={handleChange}/>
        </div>
		<div className="form-group">
			<label>Password</label>
            <input type="password" className="form-control" name="password"value={newUser.password} required onChange={handleChange}/>
         </div>
 		<div className="form-group">
 			<label>Confirm Password</label>
             <input type="password" className="form-control" name="repassword"value={newUser.repassword} required onChange={handleChange}/>
         </div>        
         <div className="form-group">
 			<label className="form-check-label"><input type="checkbox" required="required"/> I accept the <a href="google.com">Terms of Use</a> &amp; <a href="dice.com">Privacy Policy</a></label>
 		</div>
 		<div className="form-group">
			<button type="submit" className="btn btn-primary btn-block btn-lg">Sign Up</button>
 		</div>	
     </form>
 	<div className="text-center small">Already have an account? <a href="#">Login here</a></div>
 </div>
    );
}

export default Signup;
