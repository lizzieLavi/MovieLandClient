
import {useState } from 'react';
import './css/App.css';
import LogIn from './LogIn'
import AdminMenu from './AdminMenu'
import UserMenu from './UserMenu'
import {BrowserRouter as Router,Switch, Route,Redirect} from 'react-router-dom'
import Movies from './Movies'
import Subscriptions from './Subscriptions';
import ManageUsers from './ManageUsers'
import Register from './Register'



function App() {


  const [UserInfo,setUserInfo]=useState({})



  const logedInSuccesfully = (userData) =>
  {
    setUserInfo(userData)
  }



  return (


     <Router >

      <div className="container">
        <Switch>
           <Route exact path='/' >  <LogIn LogInCallback={(userData)=> logedInSuccesfully(userData)}/></Route> 
           <Route path='/Register' > <Register/></Route>
           {(sessionStorage["authenticate"])?  (<Route exact path='/Menu'> <UserMenu userInfo={UserInfo}  /></Route>):<Redirect to="/" />}
           {(sessionStorage["authenticate"])?  (<Route exact path='/AdminMenu'> <AdminMenu userInfo={UserInfo}  /></Route>):<Redirect to="/" />}
           {sessionStorage["authenticate"]? (<Route path='/Movies' > <Movies userInfo={UserInfo}  /></Route>):<Redirect to="/" />}
           {sessionStorage["authenticate"]? (<Route path='/Subscriptions' > <Subscriptions  userInfo={UserInfo} /></Route>):<Redirect to="/" />}
           {sessionStorage["authenticate"]? (<Route path='/Users' > <ManageUsers userInfo={UserInfo} /></Route>):<Redirect to="/" />}
 

        </Switch>
    
    </div>

    </Router>
    

   

  
  );
  


 
}




export default App;
