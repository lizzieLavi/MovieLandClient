
import { useEffect, useState} from 'react';
import { Switch, Route ,Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import AllMembers from './AllMembers'
import AddMember from './AddMember'
import EditMember from './editMember'
import './css/topPage.css'




function Subscriptions(props) {

  
  const [MembersList,setMembersList]=useState([])
  const [search,setSearch]=useState('')
  const [searchResultList,setSearchResultList] = useState([])
  const [currentMember,setCurrentMember] = useState({})
  const [UpdateFlag,setUpdateFlag] =useState(0)
  const config ={'headers': {'x-access-token': sessionStorage["token"]}}

  useEffect(async function fetchData()
  {
    const members = await axios.get("https://cinemaws.herokuapp.com/api/Members",config)
    setMembersList(members.data)
  
  },[UpdateFlag]);


 const dataUpdated= () =>
 {
   setUpdateFlag(!UpdateFlag)
 }

  const searchValue = (e) =>
  {
    setSearch(e.target.value)
  }


  const loadMembersFind = () =>
  { 
        
    const searchResult =[]

    MembersList.forEach( function(member)
    {
      if(member.Name.toLowerCase().includes(search))
      {
        searchResult.push(member)
      }
    })

    setSearchResultList(searchResult);

  }

  const logOut = () =>
  {
    localStorage.clear()
  }
  

  return (


      <div>
         <div className='navbar'>
         <div className='logoAndName'><i class="fa fa-film fa-2x" aria-hidden="true" ></i><h1 className='logo'>MovieLand</h1></div>
           <nav>
             <ul>
               <li className='userName'> hello {props.userInfo.FirstName}</li>
               <li>{sessionStorage["type"]=='ADMIN'?<Link className='defaultLink' params={props.userInfo} to={'/ADMINMenu'}>Menu</Link>:<Link className='defaultLink' params={props.userInfo} to={'/Menu'}>Menu</Link>}</li>
               <li><Link className='defaultLink' onClick={logOut} to={'/'}>log out</Link></li>
             </ul>
           </nav>
         </div>
   
   
         <div className='top_page'>
           <h3 className='head_title'>Members</h3>
           <div className='SearchClass'>
             <button className='searchBotn' onClick={loadMembersFind}><Link className='link' to={`/Subscriptions/searchResult`}><i class="fa fa-search"></i></Link></button>
             <input className='find' onChange={searchValue} type='textbox' placeholder="Find Member.." />
           </div>
   
           <div className='botnsClass'>
             <button className='defaultBotn'><Link className='defaultLink' to={`/Subscriptions/AllMembers`}>All Members</Link></button>
             <button className='defaultBotn'><Link className='defaultLink' to={`/Subscriptions/AddMember`}>Add Member</Link></button> 
           </div>

           <Switch>
             {sessionStorage["authenticate"]?
             (<Route exact path='/Subscriptions'component={() => <AllMembers token={props.token} Members={MembersList}  MemberCallback={(member) => setCurrentMember(member)} UpdateCallBack={()=>setUpdateFlag(!UpdateFlag)}/>} />)
             :(<Redirect to="/" />)}
             {sessionStorage["authenticate"]?
             (<Route exact path='/Subscriptions/AllMembers' component={() => <AllMembers Members={MembersList}  token={props.token} MemberCallback={(member) => setCurrentMember(member)} UpdateCallBack={()=>setUpdateFlag(!UpdateFlag)}/>}/>)
             :(<Redirect to="/" />)}
             {sessionStorage["authenticate"]?
             (<Route exact path='/Subscriptions/AddMember' component={()=><AddMember token={props.token} UpdateCallBack={()=>setUpdateFlag(!UpdateFlag)}/>}/>)
             :(<Redirect to="/" />)}
             {sessionStorage["authenticate"]?
             (<Route exact path='/Subscriptions/searchResult'component={() => <AllMembers Members={searchResultList}  MemberCallback={(member) => setCurrentMember(member)} UpdateCallBack={()=>setUpdateFlag(!UpdateFlag)}/>}/>)
             :(<Redirect to="/" />)}
             {sessionStorage["authenticate"]?
             (<Route exact path='/Subscriptions/EditMember/:id' component={()=><EditMember token={props.token} member={currentMember} UpdateCallBack={()=>setUpdateFlag(!UpdateFlag)}/>}/>)
             :(<Redirect to="/" />)}
           </Switch>

         </div>
      </div>


      
  );
}


export default Subscriptions;
