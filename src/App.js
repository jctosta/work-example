import React, { useState, useEffect } from 'react';

// External Libs
import axios from 'axios';

import MovieList from './components/MovieList';
import FilterToolbar from './components/FilterToolbar';

import './style/App.scss';
import ErrorBoundary from './components/ErrorBoundary';

/** @todo: Move to config file */
const API_BASE_URL = 'https://us-central1-beacon-fe-worksample-api.cloudfunctions.net/app';
const MOVIES_STORAGE_KEY = 'movies-work-sample';
const REVIEWS_STORAGE_KEY = 'reviews-work-sample';

const errorHandler = (error) => {
  console.error(error);
}

const loadLocalStorage = (key) => {
  console.log('LOADING DATA FROM LOCAL STORAGE');
  const defaultValue = [];
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch(err) {
    console.error(err);
    return defaultValue;
  }
}

const setLocalStorage = (key, value) => {
  console.log('SAVING DATA ON LOCAL STORAGE');
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch(err) {
    console.error(err);
  }
}

const loadApiDataSync = async endpoint => {
  console.log('LOADING DATA FROM API');
  const res = await axios.get(API_BASE_URL + endpoint);
  return await res.data;
}

function App() {

  const [movies, setMovies] = useState(loadLocalStorage(MOVIES_STORAGE_KEY));
  const [reviews, setReviews] = useState(loadLocalStorage(REVIEWS_STORAGE_KEY));
  const [filteredMovieList, setFilteredMovieList] = useState(movies);

  useEffect(() => {
    if(movies.length === 0) {
      console.log('MOVIE DATA NOT FOUND');
      (async () => { 
        const movieData = await loadApiDataSync('/movies');
        setMovies(movieData);
        setLocalStorage(MOVIES_STORAGE_KEY, movieData);
      })();
    }
    if (reviews.length === 0) {
      console.log('REVIEW DATA NOT FOUND');
      (async () => { 
        const reviewData = await loadApiDataSync('/reviews');
        setReviews(reviewData);
        setLocalStorage(REVIEWS_STORAGE_KEY, reviewData);
      })();
    }
  }, [movies.length, reviews.length]);

  const filterHandler = (value) => {
    setFilteredMovieList(movies.filter(movie => movie.title.toUpperCase().includes(value.toUpperCase())));
  }

  const decadeFilterHandler = (value) => {

    if (Number.parseInt(value) === 0) {
      setFilteredMovieList(movies);
    } else {
      const selectedDecade = new Date(Number.parseInt(value), 0);
      const endOfDecade = new Date(Number.parseInt(value) + 9, 0);
  
      setFilteredMovieList(movies.filter(movie => {
        const movieDate = new Date(Number.parseInt(movie.year), 0);        
        return (movieDate > selectedDecade && movieDate < endOfDecade);
      }));
    }
    
  }

  return (
    <ErrorBoundary>
      <section className="section">
        <div className="container">
          <h1 className="title">Movies Evan Likes!</h1>
          <p className="subtitle">Below is a (not) comprehensive list of movies that Evan really likes.</p>
          <FilterToolbar filterHandler={filterHandler.bind(this)} decadeFilterHandler={decadeFilterHandler.bind(this)} />
          <hr />
          <MovieList movies={filteredMovieList} reviews={reviews} apiBaseURL={API_BASE_URL} />
        </div>
      </section>
    </ErrorBoundary>
  );
}

export default App;