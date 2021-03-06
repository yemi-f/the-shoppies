import React, { useEffect, useState } from 'react';
import { Col, Button, Row, Spinner } from 'react-bootstrap';
import MovieRow from './MovieRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import * as Scroll from 'react-scroll';

const SearchResults = ({
    updateNominatedMovies, nominatedMovies, searchTerm, updatePage, page,
    showSpinner, updateShowSpinner
}) => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [numOfPages, setNumOfPages] = useState(0);
    const [numOfResults, setNumOfResults] = useState(0);

    const scroller = Scroll.scroller;
    const scrollToSearchBar = () => {
        scroller.scrollTo('target', {
            duration: 200,
            smooth: true,
            offset: -8
        })
    }

    const handlePageNumClick = (num) => {
        setIsLoading(true);

        if (num < 1) num = 1;
        else if (num > numOfPages) num = numOfPages

        updatePage(num);
        setIsLoading(false);
        scrollToSearchBar();
    }

    useEffect(() => {
        const getMovies = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}&s=${searchTerm}&page=${page}`);
                setSearchResults(res.data.Search);
                setNumOfResults(res.data.totalResults);
                setNumOfPages(Math.ceil(parseInt(res.data.totalResults) / 10));
                setIsLoading(false);
                updateShowSpinner(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                updateShowSpinner(false);
            }
        }

        getMovies();
    }, [page, searchTerm, updateShowSpinner])

    return (
        <Col xs={12} md={6}>
            {searchTerm.length === 0
                ? <p className="lead text-center py-2">Start by searching for a movie</p>
                : <MoviesTable updateNominatedMovies={updateNominatedMovies}
                    nominatedMovies={nominatedMovies} searchResults={searchResults}
                    searchTerm={searchTerm} numOfPages={numOfPages} page={page}
                    handlePageNumClick={handlePageNumClick} numOfResults={numOfResults}
                    isLoading={isLoading} showSpinner={showSpinner}
                />}
        </Col>
    )
}

const LoadingSpinner = () => {
    return (
        <div className="text-center my-4">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

const MoviesTable = ({ searchResults = [], updateNominatedMovies, nominatedMovies, searchTerm, page,
    numOfPages, handlePageNumClick, isLoading, showSpinner, numOfResults }) => {
    return (
        <>
            {showSpinner
                ? <LoadingSpinner />
                : <>
                    {searchResults.length > 0
                        ? <div className="py-2">
                            <h3>{numOfResults} results for "{searchTerm}"</h3>
                            <NavButtons handlePageNumClick={handlePageNumClick}
                                page={page} numOfPages={numOfPages}
                                searchResults={searchResults} hidePageNumbering={false} />
                        </div>
                        : searchTerm.length > 0 && !showSpinner && <p className="lead text-center py-2">We couldn't find anything matching "{searchTerm}"</p>
                    }
                    {searchResults.map((movie, index) => {
                        return (
                            <MovieRow key={index} movie={movie} updateNominatedMovies={updateNominatedMovies}>
                                <NominateButton updateNominatedMovies={updateNominatedMovies}
                                    nominatedMovies={nominatedMovies} movie={movie} />
                            </MovieRow>
                        )
                    })}
                </>
            }
            <NavButtons handlePageNumClick={handlePageNumClick}
                page={page} numOfPages={numOfPages} searchResults={searchResults}
                hidePageNumbering={true} isLoading={isLoading} />
        </>
    )
}

const NavButtons = ({ numOfPages, page, handlePageNumClick, searchResults, hidePageNumbering, isLoading }) => {
    return (
        <>
            {searchResults.length > 0 && !isLoading &&
                <>
                    {!hidePageNumbering && <span>Page {page} of {numOfPages}</span>}
                    <Row className="my-3">
                        <Col xs={6} className="pl-3 pr-1">
                            <Button variant="dark" disabled={page <= 1} block onClick={() => handlePageNumClick(page - 1)}>
                                <FontAwesomeIcon icon="chevron-left" className="mr-2" />PREVIOUS
        </Button>
                        </Col>
                        <Col xs={6} className="pr-3 pl-1">
                            <Button variant="dark" disabled={page >= numOfPages} block onClick={() => handlePageNumClick(page + 1)}>
                                NEXT<FontAwesomeIcon icon="chevron-right" className="ml-2" />
                            </Button>
                        </Col>
                    </Row>
                </>
            }
        </>
    )
}

const NominateButton = ({ updateNominatedMovies, movie, nominatedMovies = [] }) => {
    const handleClick = () => {
        const temp = [...nominatedMovies, movie];
        localStorage.setItem("nominees", JSON.stringify(temp));
        updateNominatedMovies(temp);
    }

    const getIsNominated = () => {
        return nominatedMovies.some(mov => mov["imdbID"] === movie.imdbID);
    }

    return (
        <Button variant={getIsNominated() ? "success" : "outline-success"}
            disabled={getIsNominated() || nominatedMovies.length >= 5}
            onClick={() => handleClick()} className="rounded-pill">
            {getIsNominated() ? <span><FontAwesomeIcon className="mr-2" icon="check" />Nominated</span>
                : <span><FontAwesomeIcon className="mr-2" icon="plus" />Nominate</span>}
        </Button>
    )
}
export default SearchResults;