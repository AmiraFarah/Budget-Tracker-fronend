import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
//components
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer';
import Show from '../../components/Show/Show'
import Deleted from '../../components/Deleted/Deleted'


//pages
import Logo from '../Logo/Logo'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Transactions from '../Transactions/Transactions';
import CreateTransaction from '../CreateTransaction/CreateTransaction';

//Services 
import * as userService from '../../utilities/users-service'
//css
import './App.css';

function App() {
  const [user, setUser] = useState('')
  useEffect(() => {
    if (userService.getToken())
      setUser(userService.getUser())
  }, [])
  return (
    <div className="App">
      <Nav user={user} logOut={userService.logOut} setUser={setUser} />

      {/* client side route that renders the component instance if the 
      matches the address bar */}
      <Routes>
        <Route path='/' element={<Logo />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/transactions' element={user && <Transactions />} />
        <Route path='/transactions/create' element={user && <CreateTransaction/>}/>
        <Route path='transactions/:id' element={user &&<Show/>}></Route>
     <Route path='/deleted' element = {user&& <Deleted/>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
