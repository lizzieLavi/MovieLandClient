
import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import './css/editMovie.css'

function EditMovie(props) {

 const [Name,setName] = useState(props.movie.Name)
 const [GenresArr,setGenresArr] = useState(props.movie.Genres)
 const [GenresStr,setGenresStr] = useState('')
 const [Image,setImage] = useState(props.movie.Image)
 const [Premiered,setPremiered] = useState('')
 const config ={'headers': {'x-access-token': sessionStorage["token"]}}

 useEffect(async function fetchData()
 {
    var genersStr=''
    if(props.movie.Genres!=null)
    {
      props.movie.Genres.forEach( function(genre)
      {
        if(genersStr!= '')
        {
          genersStr= genersStr + ',' + genre
        }

        else
        {
          genersStr=genre
        }

    })

    if(props.movie.Premiered!=null)
    {
          setPremiered(props.movie.Premiered.slice(0,10))
    }

    

  
    setGenresStr(genersStr)
   }
  
 }, []);


 const stringGenresToArr = (e) =>
 {
    setGenresStr(e.target.value)
    var GenresArray=(e.target.value).split(',')
    setGenresArr(GenresArray)
 }


 const saveMovieChange = async() =>
 {  
    var movieUp={Name:Name,Genres:GenresArr,Image:Image,Premiered:Premiered,summary: props.movie.summary}
    var status = await axios.put('https://cinemaws.herokuapp.com/api/movies/'+ props.movie._id,movieUp,config)
    props.UpdateCallBack() 
 }

  
 return (

    <div className='editPage'>
        <div className="border">
           <h1 className='title'>Edit Movie: {Name}</h1>
           <label className='labels' for="name">Name: </label>
           <input  className='data' id='name' type="text" value={Name} onChange={(e)=> setName(e.target.value)} /><br/>
           <label  className='labels' for="img">Image Url: </label>
           <input  className='data' id='img' type="text" value={Image} onChange={(e)=> setImage(e.target.value)} /><br/>
           <label className='labels' for="genres">Genres: </label>
           <input  className='data' id='genres' type="text" defaultValue={GenresStr} onChange={stringGenresToArr} /><br/>
           <label className='labels' for="premiered">Premiered: </label>
           <input  className='data' id='premiered' type="text" value={Premiered.slice(0,10)} onChange={(e)=> setPremiered(e.target.value)} /><br/>
         
           <div>
             <button onClick={saveMovieChange} > <Link className='cardsLinks' to={`/Movies`}>save</Link></button>
             <button > <Link  className='cardsLinks' to={`/Movies`}>cancel </Link></button>
           </div>
        </div>
    </div>

 );

}

export default EditMovie;
