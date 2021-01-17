import React, { useState, useEffect } from 'react';
import { Row, Container, Toast, Button } from "react-bootstrap";
import AppHeader from "./components/AppHeader";
import NominatedMovies from "./components/NominatedMovies";
import SearchResults from "./components/SearchResults";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Scroll from 'react-scroll';
import {
  faTimes, faTrash, faCheck, faPlus,
  faChevronLeft, faChevronRight
} from "@fortawesome/free-solid-svg-icons";
library.add(faTimes, faTrash, faCheck, faPlus,
  faChevronLeft, faChevronRight)

function App() {
  const [searchTerm, setSearchterm] = useState("");
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [showSpinner, setShowSpinner] = useState(false);

  const updatePage = (pageNum) => {
    setPage(pageNum);
  }

  const updateShowSpinner = (bool) => setShowSpinner(bool);

  const updateSearchTerm = (str) => {
    setSearchterm(str);
  }

  const updateNominatedMovies = (movies) => {
    setNominatedMovies(movies);
  }

  const clearNominatedMovies = () => {
    setNominatedMovies([]);
    localStorage.removeItem("nominees");
  }

  useEffect(() => {
    setNominatedMovies(JSON.parse((localStorage.getItem("nominees"))) || [])
  }, [])

  return (
    <div>
      <AppHeader updateSearchTerm={updateSearchTerm} searchTerm={searchTerm}
        updatePage={updatePage} updateShowSpinner={updateShowSpinner} />
      <FiveNominationsToast nominatedMovies={nominatedMovies} />
      <Container>
        <Row style={{ marginBottom: 72 }}>
          <SearchResults updateNominatedMovies={updateNominatedMovies}
            nominatedMovies={nominatedMovies} updatePage={updatePage} page={page}
            searchTerm={searchTerm} updateShowSpinner={updateShowSpinner}
            showSpinner={showSpinner} />
          <NominatedMovies nominatedMovies={nominatedMovies}
            clearNominatedMovies={clearNominatedMovies} updateNominatedMovies={updateNominatedMovies}
          />
        </Row>
      </Container>
      <ScrollToNominationsButton nominatedMovies={nominatedMovies} />
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

const ScrollToNominationsButton = ({ nominatedMovies = [] }) => {
  const scroller = Scroll.scroller;
  const [btnVisibility, setBtnVisibility] = useState("");

  const handleClick = () => {
    scroller.scrollTo('nominations', {
      duration: 200,
      smooth: true,
      offset: -8
    })
  }

  useEffect(() => {
    setBtnVisibility(nominatedMovies.length > 0 ? "d-block d-sm-none" : "d-none")
  }, [nominatedMovies.length])

  return (
    <div className={`w-100 p-3 ${btnVisibility}`} style={{ position: "fixed", bottom: 8 }}>
      <Button variant="dark" size="lg" block onClick={() => handleClick()}>
        View  nominations
      </Button>
    </div>
  )
}

export default App;
