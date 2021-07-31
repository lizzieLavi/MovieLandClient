
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/AllMovies.css"




function AllMovies(props) {

const config ={'headers': {'x-access-token': sessionStorage["token"]}}

const saveMovie = (movie) =>
{
  props.MovieCallback(movie)
}

const DeleteMovie = async(id) =>
{
  await axios.delete('https://cinemaws.herokuapp.com/api/movies/'+ id,config)
  props.UpdateCallBack()
}


  return (

         <div className='movies_page'>
            {props.Movies.map(movie => 
            {
              var prem=''
              if(movie.Premiered!=null)
                 prem=movie.Premiered.slice(0,4)
                 


              return  <div className="movie_card" id="movie">
                           <div className="movie_header">
                           <img className="IMG" alt="background" src={movie.Image}/>
                             <h1 className='movieName'>{movie.Name}</h1> 
                             <h4 className='datePremiered'>{prem}</h4> 
                             <div className='genres'>
                               {movie.Genres.map(genre =>{ return <p className='type'>{genre}</p>})}
                             </div>
                           </div>

                           <div className="movie_desc">
                           <p className='description' dangerouslySetInnerHTML={{__html:movie.summary}} />;
                          </div>

                          <div className='editAndDelete'> 
                             <button onClick={()=>saveMovie(movie)} className='editBotns'><Link className='cardsLinks' to={`/Movies/EditMovie/${movie._id}`}>Edit</Link></button>
                             <button onClick={()=>DeleteMovie(movie._id)} className='editBotns'><i className='icon' class="fa fa-trash"/>Delete</button>
                         </div>
                 
                     </div>
           })}

       </div>


  );

 
}


export default AllMovies;
