import React from 'react'
import Axios from 'axios'
import './Browser.css'
import Book from "../Cart/Book"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BOOKS = "https://lea-geek-text.herokuapp.com/books/"

export default class Browser extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            allBooks: [],
            books: [],
            page: Number(1), 
            lastPage: Number(100),
            perPage: Number(10),
            filter: {},
            genreDD: "All", // genre select Value for filter
            ratingDD: "All",// Rating select Value for filter
        }
    }
  
    
    //Get Books from db
    componentDidMount() {

        this.sortByTS();
    }

    sortByTS(){ // Top Sellers
        Axios.get(BOOKS + "getByTS", {
         params:{ 
             filter:  this.state.filter
         }
        })
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        allBooks: response.data,
                        page: 1,
                    })
                    this.setState({
                        books: this.state.allBooks.slice((0 + (this.state.page -1)* this.state.perPage),(this.state.perPage + (this.state.page -1)* this.state.perPage)),
                        lastPage: Math.ceil(this.state.allBooks.length / this.state.perPage) ,
                        
                    })
                }
                else {
                    console.log("No books recieved")
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    sortByTitle(){
        Axios.get(BOOKS + "getByTitle", {
            params:{ 
                filter:  this.state.filter
            }
            })
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        allBooks: response.data,
                        page: 1,
                    })
                    this.setState({
                        books: this.state.allBooks.slice((0 + (this.state.page -1)* this.state.perPage),(this.state.perPage + (this.state.page -1)* this.state.perPage)),
                        lastPage: Math.ceil(this.state.allBooks.length / this.state.perPage) ,
                        
                    })
                }
                else {
                    console.log("No books recieved")
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    sortByRating(){ 
        Axios.get(BOOKS + "getByRating", {
            params:{ 
                filter:  this.state.filter
            }
        })
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        allBooks: response.data,
                        page: 1,
                    })
                    this.setState({
                        books: this.state.allBooks.slice((0 + (this.state.page -1)* this.state.perPage),(this.state.perPage + (this.state.page -1)* this.state.perPage)),
                        lastPage: Math.ceil(this.state.allBooks.length / this.state.perPage) ,
                       
                    })
                }
                else {
                    console.log("No books recieved")
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    sortByRD(){ // RD = Release Date
        Axios.get(BOOKS + "getByRD", {
            params:{ 
                filter:  this.state.filter
            }
        })
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        allBooks: response.data,
                        page: 1,
                    })
                    this.setState({
                        books: this.state.allBooks.slice((0 + (this.state.page -1)* this.state.perPage),(this.state.perPage + (this.state.page -1)* this.state.perPage)),
                        lastPage: Math.ceil(this.state.allBooks.length / this.state.perPage) ,
                        
                    })
                }
                else {
                    console.log("No books recieved")
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    sortByPrice(){ // Price descending
        Axios.get(BOOKS + "getByPrice", {
            params:{ 
                filter:  this.state.filter
            }
        })
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        allBooks: response.data,
                        page: 1,
                    })
                    this.setState({
                        books: this.state.allBooks.slice((0 + (this.state.page -1)* this.state.perPage),(this.state.perPage + (this.state.page -1)* this.state.perPage)),
                        lastPage: Math.ceil(this.state.allBooks.length / this.state.perPage) ,
                        
                    })
                }
                else {
                    console.log("No books recieved")
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    sortByAuthor(){ // name, alphabetical
        Axios.get(BOOKS + "getByAuthor", {
            params:{ 
                filter:  this.state.filter
            }
        })
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        allBooks: response.data,
                        page: 1,
                    })
                    this.setState({
                        books: this.state.allBooks.slice((0 + (this.state.page -1)* this.state.perPage),(this.state.perPage + (this.state.page -1)* this.state.perPage)),
                        lastPage: Math.ceil(this.state.allBooks.length / this.state.perPage) ,
                        
                    })
                }
                else {
                    console.log("No books recieved")
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    goNext(){ //next page
        if(this.state.page + 1 <= this.state.lastPage){
        this.setState({    
            page: this.state.page + 1,
        })
        this.setState((state)=>{
            return{
                books: this.state.allBooks.slice((0 + (state.page -1)* state.perPage),(this.state.perPage + (state.page -1)* state.perPage))
            }
            })
        }
    }

    goBack(){ //previous page
        if(this.state.page - 1 >= 1){
        this.setState({
            page: this.state.page -1,
        })
        this.setState((state)=>{
            return{
            books: this.state.allBooks.slice((0 + (state.page -1)* state.perPage),(this.state.perPage + (state.page -1)* state.perPage))
            }
        })
     }
    }
  
    handlePerPageChange = (event) => {
        this.setState({
            perPage: event.target.value
        })
        this.sortByTS()
      };

      handleRatingChange = (event) => {
        this.setState({
            filter: {rating: {$gte: parseInt(event.target.value)}},
            ratingDD: event.target.value
        })
        this.sortByTS()
      };

      genres = {
        "All":null,
        "Humour": "605679b341e30718cfa06143",
      "Novel": "6057548c7cb1dc2899337811",
      "Fiction": "60316e2ceda4ea0a72158abf",
      "Non-Fiction": "6047f6de2b677f17622ae060",
      "Fantasy": "60309fdc5aa8bc214f4a9b9d",
    "Poetry":"6047ec6c9c6672143d0e36aa",
"Autobiography":"6056918441e30718cfa06152"}
  

      handleGenreChange = (event) => {
        let g = event.target.value;
    
        this.setState({
            filter: this.genres[g] ? {genre: this.genres[g]} : {},
            genreDD: g
        })
        this.sortByTS()
      };
 

render(){
    return(
<div className="center">
<h1>Best Sellers</h1>
<div className="nav">

<div className=".nav-left">
    
        <h1 className="inlineheader">Sort by:</h1>
</div>

<div className="nav-right">

<div className="nav-right-booklist nav-link">
     <button value = "sortByTS" onClick={ () => this.sortByTS()}>
        <h4 className="links">Top Sellers</h4>
        </button>
    </div>

    <div className="nav-right-booklist nav-link">
     <button value = "sortByTitle" onClick={ () => this.sortByTitle()}>
        <h4 className="links">Title</h4>
        </button>
    </div>

    <div className="nav-right-auth nav-link">
    <button value = "sortByRating" onClick={() => this.sortByRating()}>
            <h4 className="links">Rating</h4>
            </button>
       
    </div>

    <div className="nav-right-addBook nav-link">
    <button value = "sortByRD" onClick={() => this.sortByRD()}>
        <h4 className="links">Newest</h4>
        </button>
    </div>
    <div className="nav-right-addBook nav-link">
    <button value = "sortByPrice" onClick={() => this.sortByPrice()}>
        <h4 className="links">Price</h4>
        </button>
    </div>

    <div className="nav-right-cart nav-link">
    <button value = "sortByAuthor" onClick={() => this.sortByAuthor()}>
        <h4 className = "links">Author</h4>
        </button>
    </div>
    
</div>
</div>
<div className="nav">
<div className="nav-right">
<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-label"> Show per page </InputLabel>
        <Select
          labelId="ShowBooksPerPage"
          id="select"
          value={this.state.perPage}
          onChange={this.handlePerPageChange}
          label="Book"
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
</FormControl>


<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-label"> Rating </InputLabel>
        <Select
          labelId="Rating"
          id="select-rating"
          value={this.state.ratingDD}
          onChange={this.handleRatingChange}
          label="Rating"
        >

        <MenuItem value={'All'}> All </MenuItem>
        {[...Array(4).keys()].map((x) => (
            <MenuItem key={x + 1} value={x + 1} > {x + 1} & up </MenuItem>
            ))}
             <MenuItem key={5} value={5}> {5} </MenuItem>
        </Select>
</FormControl>


<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-label"> Genre </InputLabel>
        <Select
          labelId="Genre"
          id="select-genre"
          value={this.state.genreDD}
          onChange={this.handleGenreChange}
          label="Genre"
        >
          {Object.keys(this.genres).map((key) => (
            <MenuItem
              key={key}
              value={key}
            >
              {key}
            </MenuItem>
          ))}

        </Select>
</FormControl>
    </div>
    </div>
    <div className="homescreen__products">
                       {this.state.books.map((book) => (
            <Book
              key={book._id}
              title={book.title}
              price={book.price}
              rating={book.rating}
              cover={book.cover}
              bookId={book._id}
              authorId={book.author}
              authorName={book.authorName}
            />
          ),{
                        })}
                        
                        
    </div>
    <div className="nav">
    <div className=".nav-left">
    <button value = "sortByTitle" onClick={ () => this.goBack()}>
        <h4 className="links">Previous</h4>
        </button>
    </div>
    
                    <h2>{this.state.page} / {this.state.lastPage}</h2>
    <div className=".nav-right">
    <button value = "sortByTitle" onClick={ () => this.goNext()}>
        <h4 className="links">  next  </h4>
        </button>
    </div>
    </div>
</div>
    )
}
}