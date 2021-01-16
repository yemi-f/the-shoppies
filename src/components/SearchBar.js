import React from 'react';
import { Form, InputGroup, FormControl } from "react-bootstrap";
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
            <Form className="shadow-lg">
                <InputGroup size="lg">
                    <FormControl
                        autoFocus
                        placeholder="Search for a movie"
                        aria-label="Search for a movie"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Form>
        </Element>
    )
}

export default SearchBar;