import React from 'react';
import { InputGroup, FormControl } from "react-bootstrap";
import * as Scroll from 'react-scroll';

const SearchBar = ({ updateSearchTerm, searchTerm, updatePage, updateShowSpinner }) => {
    const Element = Scroll.Element;

    const handleChange = (e) => {
        updatePage(1);
        updateSearchTerm(e.target.value);
        updateShowSpinner(true);
    }

    return (
        <Element name="target">
            <InputGroup size="lg">
                <FormControl
                    autoFocus
                    placeholder="Search for a movie"
                    aria-label="Search for a movie"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </InputGroup>
        </Element>
    )
}

export default SearchBar;