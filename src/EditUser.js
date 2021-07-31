
import axios from 'axios';
import {useState,useEffect,useReducer} from 'react';
import {Link} from 'react-router-dom'
import './css/editAndAddUser.css'



const reducer = (state, action) => {
  if (state.checkedIds.includes(action.id)) {
    return {
      ...state,
      checkedIds: state.checkedIds.filter(id => id !== action.id)
    }
  }
  
  return {
    ...state,
    checkedIds: [
      ...state.checkedIds,
      action.id
    ]
  }
}

function EditUser(props) {

  const [FirstName,setFirstName] = useState(props.user.user.FirstName)
  const [LastName,setLastName] = useState(props.user.user.LastName)
  const [CreatedDate] = useState(props.user.user.CreatedDate)
  const [SessionTimeOut,setSessionTimeOut] = useState(props.user.user.SessionTimeOut)
  const [UserName,setUserName]=useState(props.user.logIn.UserName)
  const [Password] = useState(props.user.logIn.Password)
  const initialState = { checkedIds: [] }
  const [state, dispatch] = useReducer(reducer, initialState)
  const [checkedPermissions, setCheckedPermissions] = useState([])
  const config ={'headers': {'x-access-token': sessionStorage["token"]}}

  useEffect(
    async function fetchData()
    {
      var PermissionsArr= [{id:1,name:"View Subscription" },{id:2,name: "Create Subscription"},
      {id:3,name:"Delete Subscription"},{id:4,name: "View Movie"} ,
      {id:5 ,name:"Create Movie"},{id:6,name: "Delete Movie"}]
  
      PermissionsArr.forEach((per,index)=>
      {
        if((props.user.Permissions.permissions).includes(per.name))
          dispatch({id:per.id})     
      })
    
      setCheckedPermissions(PermissionsArr)
 
  },[]);

  const saveUser = async() =>
  {  
    var UpdateLogin = {UserName:UserName,Password:Password}
    await axios.put('https://cinemaws.herokuapp.com/api/LogIn/'+ props.user.user.id,UpdateLogin,config)
    var UpdatedUser={id:props.user.user.id,FirstName:FirstName,LastName:LastName,CreatedDate:CreatedDate,SessionTimeOut:SessionTimeOut}
    await axios.put('https://cinemaws.herokuapp.com/api/users/'+props.user.user.id,UpdatedUser,config)
    var permissionsArr =[]
    checkedPermissions.forEach((permission,index)=>
    {
      if(state.checkedIds.length>0)
      {
      if(state.checkedIds.includes(permission.id))
        permissionsArr=[...permissionsArr,permission.name] 
      }
    })

    await axios.put('https://cinemaws.herokuapp.com/api/Permissions/'+props.user.user.id,{id:props.user.user.id,permissions:permissionsArr},config)
    
    props.UpdateCallBack()

  }

  const CheckBox = ({id}) =>
  (
    <input 
      className='perCheckbox'
      id={id}
      onClick={() => dispatch({ id })}
      checked={state.checkedIds.includes(id)}
      type="checkbox"
    />
  )
  
  return (
    <div className='editUser'>
      <div className="border">
        <div className='userData'>
          <h1 className='title'>Edit User:</h1>
          <label className='labels' for="firstName">First Name: </label>
          <input className='data' id='firstName' type="text"  value={FirstName} onChange={(e)=> setFirstName(e.target.value)} /><br/>
          <label  className='labels' for="lastName">Last Name: </label>
          <input  className='data' id='lastName' type="text" value={LastName} onChange={(e)=> setLastName(e.target.value)} /><br/>
          <label  className='labels' for="userName">User Name: </label>
          <input  className='data' id='userName' type="text" value={UserName} onChange={(e)=> setUserName(e.target.value)} /><br/>
          <label  className='labels' for="CreatedDate">CreatedDate </label>
          <input  className='data' id='CreatedDate' type="text"  value={CreatedDate}  /><br/>
          <label className='labels' for="sessionTimeOut">Session Time Out </label>
          <input  className='data' id='genres' type="text" value={SessionTimeOut} onChange={(e)=>setSessionTimeOut(e.target.value)} /><br/>
        </div>

        <label className='permissionsLable' id='Permissions' type='text'>Permissions:</label>

        <div className='PemissionsStyle'>
          {checkedPermissions.map((permission,index) =>
            {
             return (
               <div className='checkboxItem'>
                 <CheckBox id={permission.id}/>
                 <label className='checkLabel' for={permission.id}>{permission.name}</label>
               </div> )
            })
          }
       </div>

       <div>
          <button onClick={saveUser} > <Link  className='cardsLinks' to={`/Users`}>save</Link></button>
          <button > <Link  className='cardsLinks' to={`/Users`}>cancel </Link></button>
       </div>
        
      </div>

    </div>
  );

}


export default EditUser;


