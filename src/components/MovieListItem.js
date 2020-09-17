import React from 'react';

function MovieListItem(props) {

    const movie = props.movie;

    return (
        <li>
            <div onClick={}>{Number(movie.score).toLocaleString(undefined, {style: 'percent', minimumFractionDigits:0})} <a href={movie.url}>{movie.title}</a> ({movie.year})</div>
            <div>{movie.review}</div>
        </li>
    );
}

export default MovieListItem;