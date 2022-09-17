
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './Browser.css';
import Book from '../../Components/Book/Book';
import CustomSelect from '../../Components/CustomSelect/CustomSelect';
import Accordion from '../../Components/Accordion/Accordion';
import { getSortedBooks } from '../../Redux/actions/bookActions';
import FilterHeading from '../../Components/Browsing/FilterHeading';
import FilterContent from '../../Components/Browsing/FilterContent';
import SortHeading from '../../Components/Browsing/SortHeading';
import ItemsPerPageCompressed from '../../Components/Browsing/ItemsPerPageCompressed';
import ListContent from '../../Components/Browsing/ListContent';
import Loading from '../../Components/Loading/Loading';

const Browser = ({ match }) => {

    const genres = {
        All: null,
        Humour: '605679b341e30718cfa06143',
        Novel: '6057548c7cb1dc2899337811',
        Fiction: '60316e2ceda4ea0a72158abf',
        'Non-Fiction': '6047f6de2b677f17622ae060',
        Fantasy: '60309fdc5aa8bc214f4a9b9d',
        Poetry: '6047ec6c9c6672143d0e36aa',
        Autobiography: '6056918441e30718cfa06152',
    };

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [filter, setFilter] = useState(match.params
        ? { genre: genres[match.params.id] }
        : {});
    const parameters = match.params;
    const [currSort, setCurrSort] = useState('Top Sellers');
    const [currFilter, setCurrFilter] = useState(parameters ? (parameters.id ? parameters.id : 'All') : 'All');
    const [genreDD, setGenreDD] = useState(parameters ? (parameters.id ? parameters.id : 'All') : 'All');
    const [ratingDD, setRatingDD] = useState(1);
    const [sortType, setSortType] = useState('getByTS');
    const [closeAccordion, setCloseAccordion] = useState(false);

    // load books
    const dispatch = useDispatch();
    const sorted = useSelector((state) => state.getSortedBooks);
    const { loading, error, sortedBooks } = sorted;

    useEffect(() => {
        dispatch(getSortedBooks(sortType, filter, page, perPage));
    }, [dispatch, sortType, filter, page, perPage]);

    const mybooks = (sortedBooks || {}).data || [];
    const currBooks = (sortedBooks || {}).currBooks || [];
    const lastPage = (sortedBooks || {}).lastPage || 1;

    const ratings = {
        '1 & up': 1,
        '2 & up': 2,
        '3 & up': 3,
        '4 & up': 4,
        '5 ': 5,
    };

    const pages = {
        10: 10,
        20: 20,
    };

    const sortTypes = {
        'Top Sellers': 'getByTS',
        'Newest to Oldest': 'getByRD',
        'Price - High to Low': 'getByPrice',
        'Title - A to Z': 'getByTitle',
        'Rating - High to Low': 'getByRating',
        'Author - A to Z': 'getByAuthor',
    };

    const getKeyByValue = (object, value) => {
        return Object.keys(object).find((key) => object[key] === value);
    };


    const goNext = () => {
        //next page
        if (page + 1 <= lastPage) {
            setPage(page + 1);
        }
    };

    const goBack = () => {
        //previous page
        if (page - 1 >= 1) {
            setPage(page - 1);
        }
    };

    const handlePerPageChange = (event) => {
        setPerPage(event.target.value);
    };

    const handlePerPageClick = (value) => {
        setPerPage(value);
    };

    const handleRatingChange = (event) => {
        let val = parseInt(event.target.value);
        let f = { rating: { $gte: val } };

        setPage(1);
        setGenreDD('All');
        setRatingDD(event.target.value);
        setCurrFilter(`Rating - ${Object.keys(ratings)[val - 1]}`);
        handleCloseAccordionCallback();
        setFilter(f);
    };

    const handleGenreChange = (event) => {
        let g = event.target.value;
        let f = genres[g] ? { genre: genres[g] } : {};
        setPage(1);
        setGenreDD(g);
        setRatingDD(1);
        setCurrFilter(g);
        handleCloseAccordionCallback();
        setFilter(f);
    };

    const handleSortTypeChange = (event) => {
        let s = event.target.value;
        setPage(1);
        setCurrSort(getKeyByValue(sortTypes, s));
        handleCloseAccordionCallback();
        setSortType(s);
    };

    const handleCloseAccordionCallback = () => {
        setCloseAccordion(true);
    };
    const handleOpenAccordionCallback = () => {
        setCloseAccordion(null);
    };


    const accordion_data = [
        {
            heading: <FilterHeading filter={currFilter} />,
            content: (
                <FilterContent
                    currGenre={genreDD}
                    currRating={ratingDD}
                    handleGenreChange={handleGenreChange}
                    genres={genres}
                    ratings={ratings}
                    handleRatingChange={handleRatingChange}
                />
            ),
            type: 'filter',
        },
        {
            heading: <SortHeading sort={currSort} />,
            content: (
                <ListContent
                    items={sortTypes}
                    onClick={handleSortTypeChange}
                />
            ),
            type: 'sort',
        },
    ];


    if (loading)
        return <Loading />;
    else {
        return (
            <>
                {
                    error ? (
                        <h2>{error}</h2>
                    ) : (

                        <div className='screen screen-h-padding browser-screen'>
                            <h2 className='centered_header'>Top Picks</h2>

                            <div className='nav browser-nav'>
                                <div className='nav-left'>
                                    <div className='separated-inputs'>
                                        <CustomSelect
                                            inputLabel='Items per page'
                                            inputLabelId='browser-select-label'
                                            labelId='ShowBooksPerPage'
                                            id='select'
                                            value={perPage}
                                            handleChange={handlePerPageChange}
                                            items={pages}
                                        />

                                        <CustomSelect
                                            inputLabel='Average Rating'
                                            inputLabelId='browser-select-label'
                                            labelId='Rating'
                                            id='select-rating'
                                            value={ratingDD}
                                            handleChange={handleRatingChange}
                                            items={ratings}
                                        />

                                        <CustomSelect
                                            inputLabel='Genre'
                                            inputLabelId='browser-select-label'
                                            labelId='Genre'
                                            id='select-genre'
                                            value={genreDD}
                                            handleChange={handleGenreChange}
                                            items={genres}
                                        />
                                        <CustomSelect
                                            inputLabel='Sort by'
                                            inputLabelId='browser-select-label'
                                            labelId='Sort'
                                            id='select-sort'
                                            value={sortType || 'getByTS'}
                                            handleChange={handleSortTypeChange}
                                            items={sortTypes}
                                        />
                                    </div>
                                    <div className='browser-buttons'>
                                        <div onClick={() => handlePerPageClick(10)}>
                                            <ItemsPerPageCompressed
                                                itemsNumber={10}
                                                selected={perPage === 10}
                                            />
                                        </div>
                                        <div onClick={() => handlePerPageClick(20)}>
                                            <ItemsPerPageCompressed
                                                itemsNumber={20}
                                                selected={perPage === 20}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='nav-right nav-total-items'>
                                    {page * perPage - perPage + 1}-
                                    {page * perPage -
                                        perPage +
                                        currBooks.length} of {mybooks.length} results
                                </div>
                            </div>
                            <div className='nav browser-nav'>
                                <div className='nav-left'>
                                    <Accordion
                                        screen='browser'
                                        data={accordion_data}
                                        closeAccordion={closeAccordion}
                                        handleOpenAccordionCallback={handleOpenAccordionCallback}
                                        handleCloseAccordionCallback={handleCloseAccordionCallback}
                                    />
                                </div>
                            </div>
                            <div className='homescreen__products'>
                                {currBooks.map(
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
                                        disabled={page === 1}
                                        onClick={() => goBack()}
                                    ></i>
                                </div>
                                <div className='centered-footer'>
                                    <div>
                                        {page} of {lastPage}
                                    </div>
                                </div>
                                <div className='nav-right'>
                                    <i
                                        className='fa-solid fa fa-chevron-right fa-lg'
                                        disabled={page === lastPage}
                                        onClick={() => goNext()}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        );
    }
};


export default Browser;
