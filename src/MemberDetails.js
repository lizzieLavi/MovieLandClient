
import {useState } from 'react';
import {Redirect ,Link} from 'react-router-dom';
import axios from "axios";



function MemberDetails(props) {


  const [member]=useState(props.member)
  const [redirectFlag] =useState(false)
  const config ={'headers': {'x-access-token': sessionStorage["token"]}}

  const DeleteMember= async(id) =>
  {
    await axios.delete('https://cinemaws.herokuapp.com/api/Members/'+ id,config)
    props.UpdateCallBack()
      
  }

  return (
    <div className='member_window'>
       <div className="member_details">
          <h3>Email: {member.Email}<br/></h3>
          <h3>City: {member.City}<br/></h3>
       </div>

       <div className='editAndDelete'> 
          <button onClick={()=>props.MemberCallback(member)} className='Botns'><Link className='cardsLinks' to={`/Subscriptions/EditMember/${member._id}`}>Edit</Link></button>
          <button onClick={()=>DeleteMember(member._id)} className='Botns'><i className='icon' class="fa fa-trash"/>Delete</button>
       </div>
  
       <a className='flipLink' onClick={props.flipCallback}>Show Subscriptions</a>

       {redirectFlag? <Redirect to={{pathname:"/Subscriptions",state:{updateFlag:true}}} />:''}

    </div>
  );
}

export default MemberDetails;
