import React from 'react';
import Axios from 'axios';
import './Browser.css';
import Book from '../../Components/Book/Book';
import CustomSelect from '../../Components/CustomSelect/CustomSelect';
import Accordion from '../../Components/Accordion/Accordion';

import FilterHeading from '../../Components/Browsing/FilterHeading';
import FilterContent from '../../Components/Browsing/FilterContent';
import SortHeading from '../../Components/Browsing/SortHeading';
import ItemsPerPageHeading from '../../Components/Browsing/ItemsPerPageHeading';
import ItemsPerPageCompressed from '../../Components/Browsing/ItemsPerPageCompressed';
import ListContent from '../../Components/Browsing/ListContent';

const BOOKS = 'https://lea-geek-text.herokuapp.com/books/';

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
			filter: this.props.match
				? {genre: this.genres[this.props.match.params.id]}
				: {},
			currFilter: this.props.match.params.id || 'All',
			currSort: 'Top Sellers',
			genreDD: this.props.match.params.id || 'All',
			ratingDD: 1,
			sortType: 'getByTS',
			closeAccordion: false,
		};
	}

	genres = {
		All: null,
		Humour: '605679b341e30718cfa06143',
		Novel: '6057548c7cb1dc2899337811',
		Fiction: '60316e2ceda4ea0a72158abf',
		'Non-Fiction': '6047f6de2b677f17622ae060',
		Fantasy: '60309fdc5aa8bc214f4a9b9d',
		Poetry: '6047ec6c9c6672143d0e36aa',
		Autobiography: '6056918441e30718cfa06152',
	};

	ratings = {
		'1 & up': 1,
		'2 & up': 2,
		'3 & up': 3,
		'4 & up': 4,
		'5 ': 5,
	};

	pages = {
		10: 10,
		20: 20,
	};

	sortTypes = {
		'Top Sellers': 'getByTS',
		'Newest to Oldest': 'getByRD',
		'Price - High to Low': 'getByPrice',
		'Title - A to Z': 'getByTitle',
		'Rating - High to Low': 'getByRating',
		'Author - A to Z': 'getByAuthor',
	};

	getKeyByValue(object, value) {
		return Object.keys(object).find((key) => object[key] === value);
	}

	//Get Books from db
	componentDidMount() {
		this.sortBy('getByTS', this.state.filter);
	}

	sortBy(aSortType, filter) {
		Axios.get(BOOKS + `${aSortType}`, {
			params: {
				filter: filter,
			},
		})
			.then((response) => {
				if (response.data.length > 0) {
					this.setState({
						sortType: {aSortType},
						currSort: this.getKeyByValue(this.sortTypes, aSortType),
					});
					this.setState({
						allBooks: response.data,
						page: 1,
					});
					this.setState({
						books: this.state.allBooks.slice(
							0 + (this.state.page - 1) * this.state.perPage,
							this.state.perPage + (this.state.page - 1) * this.state.perPage
						),
						lastPage: Math.ceil(
							this.state.allBooks.length / this.state.perPage
						),
					});
				} else {
					console.log('No books recieved');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	goNext() {
		//next page
		if (this.state.page + 1 <= this.state.lastPage) {
			this.setState({
				page: this.state.page + 1,
			});
			this.setState((state) => {
				return {
					books: this.state.allBooks.slice(
						0 + (state.page - 1) * state.perPage,
						this.state.perPage + (state.page - 1) * state.perPage
					),
				};
			});
		}
	}

	goBack() {
		//previous page
		if (this.state.page - 1 >= 1) {
			this.setState({
				page: this.state.page - 1,
			});
			this.setState((state) => {
				return {
					books: this.state.allBooks.slice(
						0 + (state.page - 1) * state.perPage,
						this.state.perPage + (state.page - 1) * state.perPage
					),
				};
			});
		}
	}

	handlePerPageChange = (event) => {
		this.setState({
			perPage: event.target.value,
		});
		this.sortBy(this.state.sortType.aSortType, this.state.filter);
	};

	handlePerPageClick = (value) => {
		this.setState({
			perPage: value,
		});
		this.sortBy(this.state.sortType.aSortType, this.state.filter);
	};

	handleRatingChange = (event) => {
		let val = parseInt(event.target.value);
		let f = {rating: {$gte: val}};
		this.setState({
			filter: f,
			ratingDD: event.target.value,
			genreDD: 'All',
			currFilter: `Rating - ${Object.keys(this.ratings)[val - 1]}`,
		});
		this.handleCloseAccordionCallback();
		this.sortBy(this.state.sortType.aSortType, f);
	};

	handleGenreChange = (event) => {
		let g = event.target.value;
		let f = this.genres[g] ? {genre: this.genres[g]} : {};
		this.setState({
			filter: f,
			genreDD: g,
			ratingDD: 1,
			currFilter: g,
		});
		this.handleCloseAccordionCallback();
		this.sortBy(this.state.sortType.aSortType, f);
	};

	handleSortTypeChange = (event) => {
		let s = event.target.value;

		this.setState({
			sortType: s,
		});
		this.handleCloseAccordionCallback();
		this.sortBy(s, this.state.filter);
	};

	handleCloseAccordionCallback = () => {
		this.setState({
			closeAccordion: true,
		});
	};
	handleOpenAccordionCallback = () => {
		this.setState({
			closeAccordion: null,
		});
	};

	render() {
		const accordion_data = [
			{
				heading: <FilterHeading filter={this.state.currFilter} />,
				content: (
					<FilterContent
						currGenre={this.state.genreDD}
						currRating={this.state.ratingDD}
						handleGenreChange={this.handleGenreChange}
						genres={this.genres}
						ratings={this.ratings}
						handleRatingChange={this.handleRatingChange}
					/>
				),
				type: 'filter',
			},
			{
				heading: <SortHeading sort={this.state.currSort} />,
				content: (
					<ListContent
						items={this.sortTypes}
						onClick={this.handleSortTypeChange}
					/>
				),
				type: 'sort',
			},
		];

		return (
			<div className='screen'>
				<h2 className='centered_header'>Top Picks</h2>

				<div className='nav browser-nav'>
					<div className='nav-left'>
						<div className='separated-inputs'>
							<CustomSelect
								inputLabel='Items per page'
								inputLabelId='browser-select-label'
								labelId='ShowBooksPerPage'
								id='select'
								value={this.state.perPage}
								handleChange={this.handlePerPageChange}
								items={this.pages}
							/>

							<CustomSelect
								inputLabel='Average Rating'
								inputLabelId='browser-select-label'
								labelId='Rating'
								id='select-rating'
								value={this.state.ratingDD}
								handleChange={this.handleRatingChange}
								items={this.ratings}
							/>

							<CustomSelect
								inputLabel='Genre'
								inputLabelId='browser-select-label'
								labelId='Genre'
								id='select-genre'
								value={this.state.genreDD}
								handleChange={this.handleGenreChange}
								items={this.genres}
							/>
							<CustomSelect
								inputLabel='Sort by'
								inputLabelId='browser-select-label'
								labelId='Sort'
								id='select-sort'
								value={this.state.sortType.aSortType || 'getByTS'}
								handleChange={this.handleSortTypeChange}
								items={this.sortTypes}
							/>
						</div>
						<div className='browser-buttons'>
							<div onClick={() => this.handlePerPageClick(10)}>
								<ItemsPerPageCompressed
									itemsNumber={10}
									selected={this.state.perPage === 10}
								/>
							</div>
							<div onClick={() => this.handlePerPageClick(20)}>
								<ItemsPerPageCompressed
									itemsNumber={20}
									selected={this.state.perPage === 20}
								/>
							</div>
						</div>
					</div>
					<div className='nav-right nav-total-items'>
						{this.state.page * this.state.perPage - this.state.perPage + 1}-
						{this.state.page * this.state.perPage -
							this.state.perPage +
							this.state.books.length}{' '}
						of {this.state.allBooks.length} results
					</div>
				</div>
				<div className='nav browser-nav'>
					<div className='nav-left'>
						<Accordion
							screen='browser'
							data={accordion_data}
							closeAccordion={this.state.closeAccordion}
							handleOpenAccordionCallback={this.handleOpenAccordionCallback}
							handleCloseAccordionCallback={this.handleCloseAccordionCallback}
						/>
					</div>
				</div>
				<div className='homescreen__products'>
					{this.state.books.map(
						(book) => (
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
						),
						{}
					)}
				</div>
				<div className='nav'>
					<div className='nav-left'>
						<i
							className='fa-solid fa fa-chevron-left fa-lg'
							disabled={this.state.page === 1}
							onClick={() => this.goBack()}
						></i>
					</div>
					<div className='centered-footer'>
						<div>
							{this.state.page} of {this.state.lastPage}
						</div>
					</div>
					<div className='nav-right'>
						<i
							className='fa-solid fa fa-chevron-right fa-lg'
							disabled={this.state.page === this.state.lastPage}
							onClick={() => this.goNext()}
						></i>
					</div>
				</div>
			</div>
		);
	}
}
