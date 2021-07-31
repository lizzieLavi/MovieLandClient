
import {Link} from 'react-router-dom'
import "./css/userMenu.css"

const AdminMenu= () =>
 {
   
  const LogOut = () =>
  {
     localStorage.clear()
     sessionStorage.clear()
  }

  return (

    <div className='menuContainer' >

     

      <div className='menu'>

      <h1 className='helloUser' > Hello {sessionStorage["userName"]} </h1> <br/>

      <div className='menuButtons'>

      <button className='defaultBotn' ><Link className='defaultLink' to={`/Movies`}>Movies</Link></button>
      <button className='defaultBotn' ><Link className='defaultLink' to={`/Subscriptions`}>Subscriptions</Link></button>
      <button className='defaultBotn'><Link className='defaultLink' to={`/Users`}>Manage Users</Link></button>
      <button className='defaultBotn' onClick={LogOut}><Link className='defaultLink' to={`/`}>Log Out</Link></button>

      </div>

      </div>
    </div>


  );
}

export default AdminMenu;

