import React from 'react';
import Axios from 'axios';
import './Browser.css';
import Book from "../../Components/Book/Book";
import CustomSelect from '../../Components/CustomSelect/CustomSelect';

const BOOKS = "https://lea-geek-text.herokuapp.com/books/";

export default class Browser extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            allBooks: [],
            books: [],
            page: Number(1),
            lastPage: Number(10),
            perPage: Number(10),
            filter: {},
            genreDD: "All", // genre select Value for filter
            ratingDD: 1,// Rating select Value for filter
            sortType: "getByTS",
        };
    }

    genres = {
        "All": null,
        "Humour": "605679b341e30718cfa06143",
        "Novel": "6057548c7cb1dc2899337811",
        "Fiction": "60316e2ceda4ea0a72158abf",
        "Non-Fiction": "6047f6de2b677f17622ae060",
        "Fantasy": "60309fdc5aa8bc214f4a9b9d",
        "Poetry": "6047ec6c9c6672143d0e36aa",
        "Autobiography": "6056918441e30718cfa06152"
    };

    ratings = {
        "1 & up": 1,
        "2 & up": 2,
        "3 & up": 3,
        "4 & up": 4,
        "5 ": 5
    };

    pages = {
        "10": 10,
        "20": 20
    };

    sortTypes = {
        "Top Sellers": "getByTS",
        "Title: alphabetical": "getByTitle",
        "Rating": "getByRating",
        "Release Date": "getByRD",
        "Price: high to low": "getByPrice",
        "Author Name: alphabetical": "getByAuthor",
    };

    //Get Books from db
    componentDidMount() {
        this.sortBy("getByTS");
    }


    sortBy(aSortType) { // name, alphabetical
        Axios.get(BOOKS + `${aSortType}`, {
            params: {
                filter: this.state.filter
            }
        })
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        sortType: { aSortType }
                    });
                    this.setState({
                        allBooks: response.data,
                        page: 1,
                    });
                    this.setState({
                        books: this.state.allBooks.slice((0 + (this.state.page - 1) * this.state.perPage), (this.state.perPage + (this.state.page - 1) * this.state.perPage)),
                        lastPage: Math.ceil(this.state.allBooks.length / this.state.perPage),

                    });
                }
                else {
                    console.log("No books recieved");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    goNext() { //next page
        if (this.state.page + 1 <= this.state.lastPage) {
            this.setState({
                page: this.state.page + 1,
            });
            this.setState((state) => {
                return {
                    books: this.state.allBooks.slice((0 + (state.page - 1) * state.perPage), (this.state.perPage + (state.page - 1) * state.perPage))
                };
            });
        }
    }

    goBack() { //previous page
        if (this.state.page - 1 >= 1) {
            this.setState({
                page: this.state.page - 1,
            });
            this.setState((state) => {
                return {
                    books: this.state.allBooks.slice((0 + (state.page - 1) * state.perPage), (this.state.perPage + (state.page - 1) * state.perPage))
                };
            });
        }
    }

    handlePerPageChange = (event) => {
        this.setState({
            perPage: event.target.value
        });
        this.sortBy("getByTS");
    };

    handleRatingChange = (event) => {
        this.setState({
            filter: { rating: { $gte: parseInt(event.target.value) } },
            ratingDD: event.target.value
        });
        this.sortBy("getByTS");
    };



    handleGenreChange = (event) => {
        let g = event.target.value;

        this.setState({
            filter: this.genres[g] ? { genre: this.genres[g] } : {},
            genreDD: g
        });
        this.sortBy("getByTS");
    };

    handleSortTypeChange = (event) => {
        let s = event.target.value;

        this.setState({
            sortType: s
        });

        this.sortBy(s);
    };

    render() {
        return (
            <div className="screen">
                <h2 className="centered_header">Our Top Picks</h2>
                <div className="nav browser-nav">
                    <div className="nav-left">
                        <CustomSelect
                            inputLabel="Items per page"
                            inputLabelId="pages-select-label"
                            labelId="ShowBooksPerPage"
                            id="select"
                            value={this.state.perPage}
                            handleChange={this.handlePerPageChange}
                            items={this.pages}
                        />

                        <CustomSelect
                            inputLabel="Average Rating"
                            inputLabelId="rating-select-label"
                            labelId="Rating"
                            id="select-rating"
                            value={this.state.ratingDD}
                            handleChange={this.handleRatingChange}
                            items={this.ratings}
                        />

                        <CustomSelect
                            inputLabel="Genre"
                            inputLabelId="genre-select-label"
                            labelId="Genre"
                            id="select-genre"
                            value={this.state.genreDD}
                            handleChange={this.handleGenreChange}
                            items={this.genres}
                        />

                        <CustomSelect
                            inputLabel="Sort by"
                            inputLabelId="sort-select-label"
                            labelId="Sort"
                            id="select-sort"
                            value={this.state.sortType.aSortType || "getByTS"}
                            handleChange={this.handleSortTypeChange}
                            items={this.sortTypes}
                        />
                    </div>
                    <div className="nav-right nav-total-items">
                        {((this.state.page * this.state.perPage) - this.state.perPage) + 1}-{((this.state.page * this.state.perPage) - this.state.perPage) + (this.state.books.length)} of {this.state.allBooks.length} results
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
                    ), {})}
                </div>
                <div className="nav">
                    <div className=".nav-left">
                        <i className="fa-solid fa fa-chevron-left fa-lg" disabled={this.state.page === 1} onClick={() => this.goBack()}></i>
                    </div>
                    <div className='centered-footer'>
                        <div>
                            <h2>{this.state.page} of {this.state.lastPage}</h2>
                        </div>
                    </div>
                    <div className=".nav-right">
                        <i className="fa-solid fa fa-chevron-right fa-lg" disabled={this.state.page === this.state.lastPage} onClick={() => this.goNext()}></i>
                    </div>
                </div>
            </div>
        );
    }
}