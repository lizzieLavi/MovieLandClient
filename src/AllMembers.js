
import { useCallback, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Member from './Member';

import "./css/AllMembers.css"








function AllMembers(props) 
{

  const config ={'headers': {'x-access-token': sessionStorage["token"]}}


  const saveMember = (member) =>
  {
    props.MemberCallback(member)
  }
  
  const DeleteMember= async(id) =>
  {
    var status = await axios.delete('https://cinemaws.herokuapp.com/api/Members/'+ id,config)
    props.UpdateCallBack()
  }
  
  
    return (
  
           <div className='members_page'>
              {props.Members.map((member,index)=> 
              {   
               return <Member MemberCallback={props.MemberCallback}  UpdateCallBack={props.UpdateCallBack} member={member}/>
                
             })}
  
         </div>
  
  
    );
 }

export default AllMembers;
