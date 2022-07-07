import { Link } from 'react-router-dom'

const Nav = ({ user , setUser , logOut}) => {
  //console.log('user', user)

  const handleLogOut = ()=>{
    setUser(null)
    logOut()
  }
  return (
    <div className='nav-div'>{
      !user ?
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">LOGO</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/signup">signup</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">login</Link>
          </li>

        </ul>

        :
        <li className="nav-item">
        <Link className="nav-link active" onClick={handleLogOut}aria-current="page" to="/">logout</Link>
      </li>

    }
    </div>
  );
}

export default Nav;
