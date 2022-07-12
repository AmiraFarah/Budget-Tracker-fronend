import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {login} from '../../utilities/users-service'


const Login = ({ setUser }) => {
    const [message, setMessage] = useState("Enter valid credentials")
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    const handleSubmit =  async (e)=>{
        e.preventDefault()
try {
    const user = await login(credentials)
    // once we get our user back updATE our app.js
    //user state woth the user's email or firstName
    if (user) {
        setUser( user)
// redirect to transaction page after successfull login
        navigate('/transactions',{state:user})
    } else { throw new Error}
    
} catch (e) {
    setMessage('Login failed try again')
}
    }
    return (


        <div id='form'>
            <form className='mx-auto w-20 border p-6' onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label htmlFor="validationDefaultEmail" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name='email'
                        onChange={handleChange}
                        value={credentials.email}
                    />
                <div id="emailHelp" className="form-text">{message}</div>

                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name='password'
                        onChange={handleChange}
                        value={credentials.password}
                    />
                </div>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   <button type="submit" className="btn btn-primary ">  Submit</button>
            </form>
        </div>

    );
}

export default Login;
