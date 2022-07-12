import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
//components
import Nav from '../../components/Nav/Nav'
import Show from '../../components/Show/Show'
import Deleted from '../../components/Deleted/Deleted'
import Signup from '../../components/Signup/Signup'
import Datee from '../../components/Datee/Datee'


//pages
import Logo from '../Logo/Logo'
import Login from '../Login/Login'
import Transactions from '../Transactions/Transactions';
import CreateTransaction from '../CreateTransaction/CreateTransaction';

//Services 
import * as userService from '../../utilities/users-service'
//css
import './App.css';
import Welcome from '../../components/Welcome/Welcome';

function App() {
  const [user, setUser] = useState('')
  useEffect(() => {
    if (userService.getToken())
      setUser(userService.getUser())
  }, [])
  return (
    <div className="App">
      {/* client side route that renders the component instance if the 
      matches the address bar */}
          <Nav user={user} logOut={userService.logOut} setUser={setUser} />

      <Routes className='routes'>
        
        <Route path='/' element={<Logo />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/transactions' element={user && <Transactions />} />
        <Route path='/transactions/create' element={user && <CreateTransaction/>}/>
        <Route path='transactions/:id' element={user &&<Show/>}></Route>
     <Route path='/deleted' element = {user&& <Deleted/>}></Route>
     <Route path='/signup' element={<Signup setUser={setUser}/>}></Route>
     <Route path='/welcome' element={<Welcome/>}> </Route>
 <Route path='/transactions/date' element={<Datee/>}> </Route>
      </Routes>


    </div>
  );
}

export default App;
