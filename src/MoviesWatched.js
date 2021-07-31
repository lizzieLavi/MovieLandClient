
import { useEffect, useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import './css/MoviesWatched.css'





function MoviesWatched(props) {

  const [member] = useState(props.member)
  const [renderFlag,UpdateRenderFlag] =useState(1)
  const [MoviesWatchedList,setMoviesWatched] = useState([])
  const [newSubFlag,setNewSubFlag]=useState(0)
  const [MoviesNotWatched,setMoviesNotWatched] =useState([])
  const [SubDate,setSubDate] =useState(Date)
  const [selectedId,setSelectedId]=useState('select movie')
  const[SubcriptionInfo,setSubscription] = useState('')
  const [isFlipped,setIsFlipped] = useState(false)

  const config ={'headers': {'x-access-token': sessionStorage["token"]}}

  

  useEffect(async function fetchData()
  {
     const MoviesList = await axios.get('https://cinemaws.herokuapp.com/api/Subscriptions/ByUserId/'+props.member._id,config)
     setMoviesWatched(MoviesList.data.MoviesWatched)
     setMoviesNotWatched(MoviesList.data.MoviesNotWatched)
     if(MoviesList.data.Subscription != "noSubYet")
       setSubscription(MoviesList.data.Subscription)

  },[renderFlag]);

  
  
const openNewSubscription =() =>
{
  var today = new Date();
  var dateToday = (today.getFullYear())+ '-' + ('0' + (today.getMonth()+1)).slice(-2) +'-' + ('0' + today.getDate()).slice(-2) 
  
  if(newSubFlag)
     
    return (<div className='addNewSub'>
               <h4 className='addSubTitle'>please select movie</h4>
               <div className='subDetails'>
                   <label >Name: </label>
                   <select className='inputDesign' value={selectedId} onChange={(e)=> setSelectedId(e.target.value)}>
                   <option value="" disabled selected> Select Movie </option>
                   {MoviesNotWatched.map(movie =>
                   {
                      return <option key={movie._id} value={movie._id}>{movie.Name}</option> 
                   })}
                  </select> &nbsp;
                
      <label for="watchDate">Date: </label>

      
      <input className='inputDesign' onChange={(e)=>setSubDate(e.target.value)} type="date"  min={dateToday} name="watchDate" id="watchDate"></input> <br/>
      </div>
      <button className='submitBtn' onClick={()=>saveNewSubscribe()}>Subscribe</button>


    </div>)
  
  else return ''

 

}

const saveNewSubscribe = async() =>
{
  let movie={id: selectedId,date: SubDate}
  if(SubcriptionInfo != '')
  {
    let object=SubcriptionInfo
    object.Movies.push(movie)

    await axios.put('https://cinemaws.herokuapp.com/api/Subscriptions/'+object._id,object,config)

  }

  else
  {
     let object=
     {
       MemberId: props.member._id,
       Movies: [movie]
     }

     await axios.post('https://cinemaws.herokuapp.com/api/Subscriptions/',object,config)

  }

  UpdateRenderFlag(!renderFlag)

}




 
  return (
    <div className='MoviesSub'>

      <div className='movies_watched'>
       <h3 className='title'>Movies Watched:</h3>
       {MoviesWatchedList.length > 0? '': <div> no subscriptions yet</div>}
       <ul>
       {MoviesWatchedList.map((movie,index) =>
        {
          return (<li>
           <div className='movieDateAndName'> 

            <img className="IMG" alt="background" src={movie.MovieDetails.Image}/>
            <Link className='Link' to={{pathname:'/Movies', state:movie.MovieDetails}}>{movie.MovieDetails.Name},</Link> 
            <span className='date'>{movie.SubMovieInfo.date.slice(0,10)}</span>
            
           </div> </li>)})}

           </ul>

           </div>
        <div className='button-center'>
        <button className='SunscribeButton' onClick={()=>setNewSubFlag(!newSubFlag)} >
     
          {newSubFlag? <i class="fa fa-angle-up fa-2x"></i> :<i class="fa fa-angle-down fa-2x"></i>}
        
           &nbsp; Subscribe to new movie</button>
           </div>
        {openNewSubscription()} 
        <br/>

    
       

        <a className='flipLink' onClick={props.flipCallback}>Member Details</a>


   
      
    </div>
  );
}


export default MoviesWatched;
