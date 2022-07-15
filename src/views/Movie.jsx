import { MovieList } from "../components/movies";
import LoadingPage from "./LoadingPage";
import movieService from "../services/movie.service";
import { Box, FormControlLabel, Checkbox, FormGroup } from "@mui/material";
import { PaginationArrows } from "../components/common";
import { usePaginationRequest } from "../hooks/common";
import { customToasts } from "../helpers";
import { useState } from "react";

const Movie = () => {
  const handleSuccesRequest = (data) => {
    let favorites = movieService.getFavorites();
    if (favorites) {
      setFavorites(favorites);
    }
  };

  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleDataEnded = (message) => {
    customToasts.toastInfo(message);
  };

  const getMovies = (favorites) => {
    if (favorites) {
      return movieService.getFavorites;
    }
    return movieService.getClients;
  }

  const { response, goBack, goForward, loading } = usePaginationRequest(
    !showFavorites,
    getMovies(showFavorites),
    handleSuccesRequest,
    handleDataEnded
  );

  const handleOnFavorites = (value, movie) => {
    if (value === 1) {
      movieService.saveFavorite(movie);
      setFavorites([movie, ...favorites]);
    } else {
      movieService.removeFavorite(movie);
      let newFavorites = favorites.filter(x => !(x.id === movie.id));
      setFavorites(newFavorites);
    }
  }

  const handleCheckboxChange = () => {
    setShowFavorites(!showFavorites);
  }

  if (loading) return <LoadingPage loading={loading} />;

  return (
    <>
      <FormGroup className="movie-header">
        <h1 className="title" >Movies</h1>
        <FormControlLabel className="set-favorites" control={<Checkbox onChange={handleCheckboxChange}/>} label="Ver Favoritos" />
      </FormGroup>
      <Box sx={{ width: '80%', margin: 'auto' }}>
        <MovieList movies={response} onFavorites={handleOnFavorites} favorites={favorites} />
      </Box>
      <Box>
        <PaginationArrows onClickBack={goBack} onClickForward={goForward} />
      </Box>
    </>
  );
};

export default Movie;
