import { PropTypes } from "prop-types";
import { movieShape } from "./propTypeModels";
import MovieCard from "./MovieCard";
import { Stack } from "@mui/material";
import { Link } from "wouter";
import { routes } from "../../router";

const MovieList = ({ movies, onFavorites, favorites }) => {
	return (
		<Stack direction="row" style={{ flexWrap: "wrap", gap: "1vmax", justifyContent: "space-between" }}>
			{movies.map((movie) => (
				<Link key={movie.id} href={routes.movie.details.replace(":id", movie.id)}>
					<MovieCard movie={movie} onFavorites={onFavorites} favorites={favorites}/>
				</Link>
			))}
		</Stack>
	);
};

MovieList.propTypes = {
	movies: PropTypes.arrayOf(PropTypes.exact(movieShape)),
};

export default MovieList;
