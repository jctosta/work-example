import React, { useState, useEffect } from 'react';

const sortMovies = (a, b) => {  
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;
}

function MovieList(props) {

    const [movies, setMovies] = useState(props.movies);

    useEffect(() => {
        const sortedMovieList = movies.sort(sortMovies);    
    
        setMovies(sortedMovieList.map(m => {        
            m.review = props.reviews.find(r => m.id === r["movie-id"]).review;
            m.displayReview = false;
            return m;
        }));

        console.log(movies);

    }, movies);

    const toggleReviewVisibility = (index) => {
        const tempMovies = movies;
        tempMovies[index].displayReview = !tempMovies[index].displayReview;
        setMovies(tempMovies);
        console.log(movies);
    }

    const displayReview = (movie) => {
        const imageURL = `https://us-central1-beacon-fe-worksample-api.cloudfunctions.net/app/${movie["cover-url"]}`;
        return (<div>
            <img src={imageURL} alt={`${movie.title} Cover Image`} />
            <span>{movie.review}</span>
        </div>);
    }

    const movieList = movies.map((movie, index) => 
        <li key={index} className="list-item">
            <div className="movie-title" onClick={() => toggleReviewVisibility(index)}>{Number(movie.score).toLocaleString(undefined, {style: 'percent', minimumFractionDigits:0})} <a href={movie.url}>{movie.title}</a> ({movie.year})</div>
            <div className="movie-review">{displayReview(movie)}</div>
        </li>
    );


    return (
        <div>
            <h2>Movie List</h2>
            <ul>{movieList}</ul>
        </div>
    );
}

export default MovieList;