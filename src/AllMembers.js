import axios from "axios";
import Member from './Member';

import "./css/AllMembers.css"


function AllMembers(props) 
{
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
