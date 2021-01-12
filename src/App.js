import React, { useState, useEffect } from 'react';
import { Row, Container, Toast } from "react-bootstrap";
import AppHeader from "./components/AppHeader";
import NominatedMovies from "./components/NominatedMovies";
import SearchResults from "./components/SearchResults";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes, faTrash, faCheck, faPlus,
  faChevronLeft, faChevronRight, faSearch
} from "@fortawesome/free-solid-svg-icons";
library.add(faTimes, faTrash, faCheck, faPlus,
  faChevronLeft, faChevronRight, faSearch)

function App() {
  const [searchTerm, setSearchterm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const updatePage = (pageNum) => {
    setPage(pageNum);
  }

  const updateIsLoading = (bool) => setIsLoading(bool);

  const [numOfPages, setNumOfPages] = useState(0);

  const updateNumOfPages = (num) => {
    setNumOfPages(num);
  }
  const updateSearchTerm = (str) => {
    setSearchterm(str);
  }

  const updateNominatedMovies = (movies) => {
    setNominatedMovies(movies);
  }

  const clearNominatedMovies = () => {
    setNominatedMovies([]);
    localStorage.removeItem("noms");
  }

  const updateSearchResults = movies => setSearchResults(movies);

  useEffect(() => {
    setNominatedMovies(JSON.parse((localStorage.getItem("noms"))) || [])
  }, [])

  return (
    <div>
      <AppHeader updateSearchTerm={updateSearchTerm} searchTerm={searchTerm} updateSearchResults={updateSearchResults}
        page={page} updatePage={updatePage} updateNumOfPages={updateNumOfPages} numOfPages={numOfPages}
        isLoading={isLoading} updateIsLoading={updateIsLoading}
      />
      <FiveNominationsToast nominatedMovies={nominatedMovies} />
      <Container>
        <Row>
          <SearchResults searchResults={searchResults} updateNominatedMovies={updateNominatedMovies}
            nominatedMovies={nominatedMovies} updatePage={updatePage} page={page}
            updateSearchResults={updateSearchResults} searchTerm={searchTerm}
            updateNumOfPages={updateNumOfPages} numOfPages={numOfPages}
            isLoading={isLoading} updateIsLoading={updateIsLoading} />
          <NominatedMovies nominatedMovies={nominatedMovies}
            clearNominatedMovies={clearNominatedMovies} updateNominatedMovies={updateNominatedMovies}
          />
        </Row>
      </Container>
    </div>
  );
}

const FiveNominationsToast = ({ nominatedMovies = [] }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show)
  }

  useEffect(() => {
    if (nominatedMovies.length >= 5) {
      setShow(true)
    }
  }, [nominatedMovies.length])

  return (
    <Toast show={show} onClose={toggleShow} delay={5000} animation={null} autohide style={{
      position: 'fixed',
      top: 16,
      right: 16,
      backgroundColor: "#1F1F1F",
      color: "#FFFFFF",
      zIndex: 1050,
    }}
    >
      <Toast.Body style={{ fontSize: 18, cursor: "pointer" }}>You have nominated 5 movies
      <FontAwesomeIcon icon="times" onClick={() => toggleShow()} className="ml-4 mr-2" /></Toast.Body>
    </Toast>
  )
}

export default App;
