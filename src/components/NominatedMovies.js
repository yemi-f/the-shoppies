import React from 'react';
import { Col, Button } from 'react-bootstrap';
import MovieRow from "./MovieRow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const NominatedMovies = ({ nominatedMovies = [], updateNominatedMovies, clearNominatedMovies }) => {
    return (
        <Col xs={12} md={6}>
            <div>
                <h1 className="text-center py-2">Nominations</h1>
                {nominatedMovies.length === 0
                    ? <p className="lead text-center">You have not nominated any movies</p>
                    : <p className="ml-2 lead">{nominatedMovies.length} of 5 nominated
                        <span className="float-right mr-2">
                            <Button variant="link" className="rounded-pill py-0 text-dark" onClick={() => clearNominatedMovies()}>
                                <strong>Remove all</strong>
                            </Button>
                        </span></p>
                }
                {nominatedMovies.map((movie, index) => {
                    return (
                        <MovieRow key={index} movie={movie} updateNominatedMovies={updateNominatedMovies}>
                            <DeleteButton updateNominatedMovies={updateNominatedMovies} movie={movie}
                                nominatedMovies={nominatedMovies} />
                        </MovieRow>
                    )
                })}
            </div>
        </Col>
    )
}

const DeleteButton = ({ movie, updateNominatedMovies, nominatedMovies = [] }) => {
    const removeFromNominatedMovies = () => {
        const temp = nominatedMovies.filter(mov => mov.imdbID !== movie.imdbID);
        localStorage.setItem("nominees", JSON.stringify(temp));
        updateNominatedMovies(temp);
    }

    return (
        <Button variant="outline-danger" className="rounded-pill"
            onClick={() => removeFromNominatedMovies()}>
            <span><FontAwesomeIcon className="mr-2" icon={faTrash} />Remove</span>
        </Button>
    )
}

export default NominatedMovies;