import React, { useState } from 'react';
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import * as Scroll from 'react-scroll';

const SearchBar = ({ updateSearchTerm, updateSearchResults, page, updatePage, updateNumOfPages, updateIsLoading }) => {
    const [searchStr, setSearchStr] = useState("");
    const Element = Scroll.Element;
    const handleChange = (e) => {
        setSearchStr(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateIsLoading(true);
        updateSearchTerm(searchStr.trim())

        await axios
            .get(`${process.env.REACT_APP_API_URL}&s=${searchStr.trim()}&page=${page}`)
            .then(res => {
                updateSearchResults(res.data.Search)
                updateNumOfPages(Math.ceil(parseInt(res.data.totalResults) / 10));
                updatePage(1);
                updateIsLoading(false)
            })
            .catch(err => {
                console.log(err);
                updateIsLoading(false)
            })
    }

    return (
        <Element name="target">
            <Form onSubmit={handleSubmit} className="shadow-lg">
                <InputGroup size="lg">
                    <FormControl
                        autoFocus
                        placeholder="Search for a movie"
                        aria-label="Search for a movie"
                        value={searchStr}
                        onChange={handleChange}
                    />
                    <InputGroup.Append>
                        <Button type="submit" variant="outline-secondary">
                            <FontAwesomeIcon icon="search" />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
        </Element>

    )
}

export default SearchBar;