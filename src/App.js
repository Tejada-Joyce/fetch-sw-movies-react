import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // What is commented out is the way I coded it
      // const response = await fetch("https://swapi.dev/api/fils/").then(
      //   async (res) => {
      //     if (res.ok) {
      //       return res.json();
      //     } else {
      //       // eslint-disable-next-line no-throw-literal
      //       throw { name: "servicesError", message: "Something went wrong!" };
      //     }
      //   }
      // );

      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const results = data.results;
      const transformedResults = results.map((result) => {
        return {
          id: result.episode_id,
          title: result.title,
          releaseDate: result.release_date,
          openingText: result.opening_crawl,
        };
      });
      setMovies(transformedResults);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading ...</p>}
        {!isLoading && movies.length === 0 && !error && (
          <p>We found no movies. :(</p>
        )}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
