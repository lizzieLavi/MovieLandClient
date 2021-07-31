
import {useState } from 'react';
import MoviesWatched from './MoviesWatched';
import MemberDetails from './MemberDetails';
import ReactCardFlip from 'react-card-flip';



function Member(props) {

  const [member] =useState(props.member)
  const [isFlipped,changeFlip]=useState(false)

  //handleClick = handleClick.bind(this);


 function handleClick(e) 
 {
   //e.preventDefault();
   changeFlip(!isFlipped)
 }

  return (
    <div >
              <div className="member_card" id="member" >
                         <div className="info_section">
                             <div className="member_header">
                               <h1 className='memberName'>{member.Name}</h1> 
                             </div>

                             <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                           
                            <MemberDetails member={member} flipCallback={handleClick} MemberCallback={props.MemberCallback} UpdateCallBack={props.UpdateCallBack}/>

                           
                            <MoviesWatched  token= {props.token} member={member} flipCallback={handleClick} />

                           </ReactCardFlip>
                                 
                         </div>
                   
                       </div>
    </div>
  );
}


export default Member;
