import React from 'react';
import { Row, Col } from "react-bootstrap";

const MovieRow = ({ movie, children }) => {
    return (
        <Row className="py-4 mx-1 bg-white mb-3 shadow-sm" style={{ borderRadius: 8 }}>
            <Col sm={12} md={6} lg={7} className="my-auto">
                {movie.Title} <span className="text-muted">({movie.Year})</span>
            </Col>
            <Col xs={12} md={6} lg={5} className="my-auto">
                <div className="mt-2 mt-md-0 float-md-right">{children}</div>
            </Col>
        </Row>
    )
}

export default MovieRow;