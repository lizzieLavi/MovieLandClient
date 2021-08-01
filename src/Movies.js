
import { useEffect, useState } from 'react';
import { Switch, Route ,Link,Redirect,withRouter} from 'react-router-dom'
import axios from 'axios'
import AllMovies from './AllMovies'
import AddMovie from './AddMovie'
import EditMovie from './EditMovie';
import './css/topPage.css'

function Movies(props) 
{

  const [MoviesList,setMoviesList] = useState([])
  const [search,setSearch]=useState('')
  const [searchResultList,setSearchResultList] =useState([])
  const [currentMovie,setCurrentMovie] = useState({})
  const [UpdateFlag,setUpdateFlag] =useState(0)
  const config ={'headers': {'x-access-token': sessionStorage["token"] }}
  const [PermissionFlag,setPermissionFlag] = useState(false)

  useEffect(async function fetchData()
  {
  
    const movies = await axios.get("https://cinemaws.herokuapp.com/api/movies",config)
    setMoviesList(movies.data)

    if (props.location) {
      if(props.location.state)
      {
        const arr=[]
        arr.push(props.location.state)
        setMoviesList(arr);
      }

    }


  },[UpdateFlag]);

  

  const searchValue = (e) =>
  {
    setSearch(e.target.value)
  }

  const loadMoviesFind = () =>
  { 
        
    const searchResult =[]

    MoviesList.forEach( function(movie)
    {
      if(movie.Name.toLowerCase().includes(search))
      {
        searchResult.push(movie)
      }
    })

    setSearchResultList(searchResult);

  }

  const dataUpdated = () =>
  {
    setUpdateFlag(!UpdateFlag)
  }

  const logOut = () =>
  {
    localStorage.clear()
    sessionStorage.clear()
  }





  return (

    
   
   <div className='container'>
      <div className='navbar'>
       <div className='logoAndName'><i class="fa fa-film fa-2x" aria-hidden="true" ></i><h1 className='logo'>MovieLand</h1></div>
        <nav>
          <ul>
            <li className='userName'> hello {sessionStorage["userName"]}</li>
            <li>{sessionStorage["type"]=='ADMIN'?<Link className='defaultLink' params={props.userInfo} to={'/ADMINMenu'}>Menu</Link>:<Link className='defaultLink' params={props.userInfo} to={'/Menu'}>Menu</Link>}</li>
            <li><Link className='defaultLink' onClick={logOut} to={'/'}>log out</Link></li>
          </ul>
        </nav>
      </div>


      <div className='top_page'>
        <h3 className='head_title'>Movies</h3>
        <div className='SearchClass'>
          <button className='searchBotn' onClick={() =>loadMoviesFind("Create Movie")}><Link  to={`/Movies/searchResult`}><i class="fa fa-search"></i></Link></button>
          
          <input className='find' onChange={searchValue} type='textbox' placeholder="Find Movie.." />
        </div>

        <div className='botnsClass'>
          <button onClick={()=>setUpdateFlag(!UpdateFlag)} className='defaultBotn'><Link className='defaultLink' to={`/Movies/AllMovies`}>All Movies</Link></button>
          <button className='defaultBotn' > <Link className='defaultLink' to={`/Movies/AddMovie`}>Add Movie </Link> </button> 
            
        </div>

        <Switch>
          <Route exact path='/Movies' component={() => <AllMovies token={props.token} Movies={MoviesList}  MovieCallback={(movie) => setCurrentMovie(movie)} UpdateCallBack={dataUpdated}/>}/>
          {sessionStorage["authenticate"] ?
          (<Route exact path='/Movies/AllMovies' >
            <AllMovies Movies={MoviesList} token={props.token}  MovieCallback={(movie) => setCurrentMovie(movie)} UpdateCallBack={dataUpdated}/></Route>):
            (<Redirect to="/" />)}
          {sessionStorage["authenticate"] ?
          (<Route exact path='/Movies/AddMovie'>
          <AddMovie token={props.token} UpdateCallBack={dataUpdated}/></Route>):
          (<Redirect to="/" />)}
          {sessionStorage["authenticate"] ?
          (<Route exact path='/Movies/searchResult'>
            <AllMovies Movies={searchResultList}  MovieCallback={(movie) => setCurrentMovie(movie)} UpdateCallBack={dataUpdated}/></Route>):
            (<Redirect to="/" />)}
          {sessionStorage["authenticate"] ?
          (<Route exact path='/Movies/EditMovie/:id'><EditMovie token={props.token} movie={currentMovie} UpdateCallBack={dataUpdated}/></Route>):
          (<Redirect to="/" />)}
        </Switch>

      </div>

    </div>

  );

}

export default withRouter(Movies);


