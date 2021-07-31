
import axios from 'axios';
import {useState } from 'react';
import {Link} from 'react-router-dom'
import './css/editMovie.css'


function AddMovie(props) {

  const [Name,setName] = useState('')
  const [GenresArr,setGenresArr] = useState([])
  const [Image,setImage] = useState('')
  const [Premiered,setPremiered] = useState('')
  const [Summary,setSummary] = useState('')
  const config ={'headers': {'x-access-token': props.token}}

  const stringGenresToArr = (e) =>
  {    
    var GenresArray=(e.target.value).split(',')
    setGenresArr(GenresArray)
  }

  const saveMovie = async() =>
  {  
    var newMovie={Name:Name,Genres:GenresArr,Image:Image,Premiered:Premiered,summary:Summary}
    await axios.post('https://cinemaws.herokuapp.com/api/movies/',newMovie,config)
    props.UpdateCallBack()
  }
  

  return (
    <div className='editPage'>
      <div className="border">
        <h1 className='title'>Add Movie:</h1>
        <label className='labels' for="name">Name: </label>
        <input  className='data' id='name' type="text"  onChange={(e)=> setName(e.target.value)} /><br/>
        <label  className='labels' for="img">Image Url: </label>
        <input  className='data' id='img' type="text"  onChange={(e)=> setImage(e.target.value)} /><br/>
        <label className='labels' for="genres">Genres: </label>
        <input  className='data' id='genres' type="text" onChange={stringGenresToArr} /><br/>
        <label className='labels' for="premiered">Premiered: </label>
        <input  className='data' id='premiered' type="text"  onChange={(e)=> setPremiered(e.target.value)} /><br/>
        <label className='labels' for="summary">Summary: </label>
        <input  className='data' id='summary' type="text"  onChange={(e)=> setSummary(e.target.value)} /><br/>

        <div>
          <button onClick={saveMovie} > <Link  className='cardsLinks' to={`/Movies`}>save</Link></button>
          <button > <Link  className='cardsLinks' to={`/Movies`}>cancel </Link></button>
        </div>
        
      </div>

    </div>
  );

}


export default AddMovie;
