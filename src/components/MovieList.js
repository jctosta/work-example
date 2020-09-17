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
    
    const [propMovies, setPropMovies] = useState(props.movies);
    const [propReviews, setPropReviews] = useState(props.reviews);
    const [movies, setMovies] = useState({count: 0, list: []});
    
    useEffect(() => {
        setPropMovies(props.movies);
        setPropReviews(props.reviews);
    }, [props.movies, props.reviews]);

    useEffect(() => {
        
        const generateList = () => {
            const sortedMovieList = propMovies.sort(sortMovies);  
        
            const finalList = sortedMovieList.map(m => {        
                m.review = propReviews.find(r => m.id === r["movie-id"]).review;
                m.displayReview = false;
                return m;
            });
    
            return finalList;
        };

        const movieList = generateList();

        setMovies({count: movies.count++, list: movieList});

    }, [propMovies, propReviews, movies.count]);

    const toggleReviewVisibility = (index) => {
        const tempMovies = movies.list;
        tempMovies[index].displayReview = !tempMovies[index].displayReview;
        setMovies({count: movies.count++, list: tempMovies});
    }

    const displayReview = (movie) => {
        const imageURL = `${props.apiBaseURL}/${movie["cover-url"]}`;
        return (
            <div className="box my-1">
                <div className="columns">
                    <div className="column is-2">
                        <figure className="image">
                            <img src={imageURL} alt={`${movie.title} Cover`} />
                        </figure>
                    </div>
                    <div className="column is-10">
                        <h3>Review</h3>
                        <p>{movie.review}</p>
                    </div>
                </div>
            </div>
        );
    }

    const movieList = movies.list.map((movie, index) => 
        <li key={index}>
            <p className="py-1" onClick={() => toggleReviewVisibility(index)}>
                <strong className="mr-3"><a href={movie.url} target="_blank" rel="noopener noreferrer">{movie.title}</a></strong>
                <span className="tag is-light is-medium is-light mx-1">{movie.year}</span>
                <span className="tag is-dark is-medium mx-1">{Number(movie.score).toLocaleString(undefined, {style: 'percent', minimumFractionDigits:0})}</span>
            </p>
            {movie.displayReview && displayReview(movie)}
            <hr />
        </li>
    );


    return (<ul className="content">{movieList}</ul>);
}

export default MovieList;