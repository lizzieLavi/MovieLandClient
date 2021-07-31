import axios from 'axios';
import {useState } from 'react';
import {Link} from 'react-router-dom'
import './css/editMovie.css'


function EditMember(props) {

  const [Name,setName] = useState(props.member.Name)
  const [Email,setEmail] = useState(props.member.Email)
  const [City,setCity] = useState(props.member.City)
  const config ={'headers': {'x-access-token': sessionStorage["token"]}}


  const saveMember = async() =>
  {  
    var EditMember = {Name:Name,Email:Email,City:City}
    await axios.put('https://cinemaws.herokuapp.com/api/Members/'+props.member._id,EditMember,config)
    props.UpdateCallBack()
  }
  

  return (
    <div className='editPage'>
      <div className="border">
        <h1 className='title'>Edit Member:</h1>
        <label className='labels' for="Name">Full Name: </label>
        <input  className='data' id='Name' type="text" value={Name} onChange={(e)=> setName(e.target.value)} /><br/>
        <label  className='labels' for="Email">Email: </label>
        <input  className='data' id='Email' type="text"  value={Email} onChange={(e)=> setEmail(e.target.value)} /><br/>
        <label  className='labels' for="City">City: </label>
        <input  className='data' id='City' type="text" value={City} onChange={(e)=> setCity(e.target.value)} /><br/>

        <div>
          <button onClick={saveMember} > <Link  className='cardsLinks' to={`/Subscriptions`}>Save</Link></button>
          <button > <Link  className='cardsLinks' to={`/Subscriptions`}>Cancel </Link></button>
        </div>

        
      </div>

    </div>
  );

}


export default EditMember;

