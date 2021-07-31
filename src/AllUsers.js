import { Link } from "react-router-dom";
import axios from "axios";
import "./css/AllUsers.css"




function AllUsers(props) {


  const config ={'headers': {'x-access-token': sessionStorage["authenticate"]}}

  const saveUser = (user) =>
  {

    props.UserCallback(user)
  }
  
  const DeleteUser= async(id) =>
  {
    await axios.delete('https://cinemaws.herokuapp.com/api/users/'+ id,config)
    await axios.delete('https://cinemaws.herokuapp.com/api/LogIn/'+ id,config)
    await axios.delete('https://cinemaws.herokuapp.com/api/Permissions/'+ id,config)

    props.UpdateCallBack()
  }
  
  
    return (
  
           <div className='users_page'>
              {props.Users.map(user=> 
              {

                return  <div className="user_card" id="user" >
                         <div className="info_section">
                             <div className="user_header">
                               <h1 className='userName'>{user.user.FirstName} {user.user.LastName}</h1> 
                             </div>
  
                             <div className="user_details">
                             <h3>Created Date: {user.user.CreatedDate}<br/></h3>
                             <h3>Session time out: {user.user.SessionTimeOut}<br/></h3>

                            </div>
                            <div className='editAndDelete'> 
  
                               <button onClick={()=>saveUser(user)} className='editBotns'><Link className='cardsLinks' to={`/Users/EditUser/${user.user.id}`}>Edit</Link></button>
                               <button onClick={()=>DeleteUser(user.user.id)} className='editBotns'><i className='icon' class="fa fa-trash"/>Delete</button>
  
                           </div>
                                 
                         </div>
                   
                       </div>
             })}
  
         </div>
  
  
    );
 }

export default AllUsers;
