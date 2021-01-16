import React from 'react';
import { Container } from "react-bootstrap";
import SearchBar from "./SearchBar";

const AppHeader = ({ searchTerm, updateSearchTerm, updateShowSpinner, updatePage }) => {
    return (
        <Container className="py-3">
            <h1 onClick={() => window.location.href = "/"} className="pb-2" style={{ cursor: "pointer" }}>The Shoppies</h1>
            <SearchBar updateSearchTerm={updateSearchTerm} searchTerm={searchTerm}
                updatePage={updatePage} updateShowSpinner={updateShowSpinner} />
        </Container>
    )
}

export default AppHeader;