import {useState } from 'react';
import axios from 'axios'
import {Link,useHistory} from 'react-router-dom'
import "./css/login.css"


const LogIn = (props) =>
{
    const [userName, setuserName] = useState('');
    const [Password, setPassword] = useState(0);
    const [Error,setError] = useState("")
    const history=useHistory();

    

    /*get user information and token from DB*/
    const LogInAouthentication = async() =>
    {
        let obj = {username: userName,password: Password}
        let user = await axios.post("https://cinemaws.herokuapp.com/api/LogIn/logIn",obj)

 
        if(user.data !== "not found")
        {
           sessionStorage["token"]  =user.data.token
           sessionStorage["userName"]=user.data.User.UserName
           sessionStorage["authenticate"] = true
              
           let UserDetails = await axios.get("https://cinemaws.herokuapp.com/api/users/CurrentUserData/"+ user.data.User._id,{'headers': {'x-access-token': user.data.token}})
           let allData = {UserDetails:UserDetails.data.UserData,UserLogin:user.data.User,UserPermissions:UserDetails.data.UserPermissions }
           if(user.data.User.UserName == 'ADMIN')
             sessionStorage['type'] = 'ADMIN'
           else 
             sessionStorage['type'] = 'REGULAR'


           props.LogInCallback(allData)


           if(sessionStorage["type"]  == 'ADMIN')
           {
              history.push('/AdminMenu')
           }

           else if(sessionStorage["type"]  == 'REGULAR')
           {
              history.push('/Menu')
           }

        }
        
        else
           setError("One or more of your identification details is incorrect.")



    }

    const Register = async() =>
    {
       

    }

    return(
        <div className="flex-container">

        <div className="login">

          <h1>Account LogIn</h1>
          <h3>User Name: </h3>
          <input className='userDetails' type="text" onChange={e=>setuserName(e.target.value)}/> 
          <h3>Password: </h3> 
          <input className='userDetails' type="text" onChange={e=>setPassword(e.target.value)}/> 

          <div className='btns'>
            <button className='btn' onClick={LogInAouthentication} >Log In</button><br/>
            <lable className='note'>don't have an acount?</lable> <br/>
            <button className='btn'  onClick={Register}><Link  to={`/Register`}>Register</Link> </button>
          </div>

          {Error}
        </div>
              
        
          

         </div>

    )
  

    
}



export default LogIn;