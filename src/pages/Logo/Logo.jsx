import { useNavigate } from 'react-router-dom'

const Logo = () => {

    const navigate = useNavigate()

    return (
        <div className="logo">
            <a href="/login"><img className='img' src="https://thumbs.dreamstime.com/b/growing-income-concept-symbol
            -flat-isometric-icon-logo-d-style-pictogram-web-design-ui-mobile-app-infographic-vector-92478984.jpg"alt="."/>
            </a>
            <h1 className="h1"> Budget-APP</h1>
            <h3>Sign Up for 30 Days Free Trial</h3>
            <button onClick={() => { navigate('/signup') }} type="button" className="btn btn-warning">signup</button>

        </div>

    );
}

export default Logo;
