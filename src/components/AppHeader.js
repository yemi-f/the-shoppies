import React from 'react';
import { Container } from "react-bootstrap";
import SearchBar from "./SearchBar";

const AppHeader = ({ searchTerm, updateSearchTerm, updateSearchResults, page, updatePage, numOfPages, updateNumOfPages, getMovies }) => {
    return (
        <Container className="py-3">
            <h1 onClick={() => window.location.href = "/"} className="pb-2" style={{ cursor: "pointer" }}>The Shoppies</h1>
            <SearchBar updateSearchTerm={updateSearchTerm} searchTerm={searchTerm} updateSearchResults={updateSearchResults}
                page={page} updatePage={updatePage} updateNumOfPages={updateNumOfPages} numOfPages={numOfPages}
                getMovies={getMovies} />
        </Container>
    )
}

export default AppHeader;