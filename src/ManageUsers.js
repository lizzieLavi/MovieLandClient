
import { useEffect, useState } from 'react';
import { Switch, Route ,Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import AllUsers from './AllUsers'
import AddUser from './AddUser'
import EditUser from './EditUser'
import './css/topPage.css'



function ManageUsers(props) {

  
  const [UsersList,setUsersList]=useState([])
  const [search,setSearch]=useState('')
  const [searchResultList,setSearchResultList] = useState([])
  const [currentUser,setCurrentUser] = useState({})
  const [UpdateFlag,setUpdateFlag] =useState(0)
  const config ={'headers': {'x-access-token': sessionStorage["token"]}}

  useEffect(
   async function fetchData()
  {
    const allData= await axios.get("https://cinemaws.herokuapp.com/api/users/AllUsersInfo",config)

    setUsersList(allData.data)
  

  },[UpdateFlag]);



  const searchValue = (e) =>
  {
    setSearch(e.target.value)
  }


  const loadUsersFind = () =>
  { 
        
    const searchResult =[]

    UsersList.forEach( function(user)
    {
      if(user.user.FirstName.toLowerCase().includes(search))
      {
        searchResult.push(user)
      }
    })

    setSearchResultList(searchResult);

  }

  const dataUpdated = () =>
  {
    setUpdateFlag(!UpdateFlag)
  }

  const logOut = () =>
  {
    localStorage.clear()
    sessionStorage.clear()
  }
  

  return (
      

      <div>
         <div className='navbar'>
         <div className='logoAndName'><i class="fa fa-film fa-2x" aria-hidden="true" ></i><h1 className='logo'>MovieLand</h1></div>
           <nav>
             <ul>
               <li className='userName'> hello {props.userInfo.FirstName}</li>
               <li><Link className='defaultLink' params={props.userInfo} to={'/AdminMenu'}>Menu</Link></li>
               <li><Link className='defaultLink' onClick={logOut} to={'/'}>log out</Link></li>
             </ul>
           </nav>
         </div>
   
   
         <div className='top_page'>
           <h3 className='head_title'>users</h3>
           <div className='SearchClass'>
             <button className='searchBotn' onClick={loadUsersFind}><Link  to={`/Users/searchResult`}><i class="fa fa-search"></i></Link></button>
             <input className='find' onChange={searchValue} type='textbox' placeholder="Find User.." />
           </div>
   
           <div className='botnsClass'>
             <button className='defaultBotn'><Link className='defaultLink' to={`/Users/AllUsers`}>All Users</Link></button>
             <button className='defaultBotn'><Link className='defaultLink' to={`/Users/AddUser`}>Add User</Link></button> 
           </div>

           <Switch>
             {sessionStorage["authenticate"]?
             (<Route exact path='/Users'component={() => <AllUsers Users={UsersList}  UserCallback={(user) => setCurrentUser(user)} UpdateCallBack={dataUpdated}/>} />)
             :(<Redirect to="/" />)}
             {sessionStorage["authenticate"]?
             (<Route exact path='/Users/AllUsers' component={() => <AllUsers Users={UsersList}  token={props.token} UserCallback={(user) => setCurrentUser(user)} UpdateCallBack={dataUpdated}/>}/>)
             :(<Redirect to="/" />)}
             {sessionStorage["authenticate"]?
             (<Route exact path='/Users/AddUser' component={()=><AddUser token={props.token} UpdateCallBack={dataUpdated} />}/>)
             :(<Redirect to="/" />)}
             {sessionStorage["authenticate"]?
             (<Route exact path='/Users/searchResult'component={() => <AllUsers Users={searchResultList}  UserCallback={(user) => setCurrentUser(user)} UpdateCallBack={dataUpdated}/>}/>)
             :(<Redirect to="/" />)}
             {sessionStorage["authenticate"]?
             (<Route exact path='/Users/EditUser/:id' component={()=><EditUser  user={currentUser} UpdateCallBack={dataUpdated}/>}/>)
             :(<Redirect to="/" />)}
           </Switch>

         </div>
      </div>


      
  );
}


export default ManageUsers;
