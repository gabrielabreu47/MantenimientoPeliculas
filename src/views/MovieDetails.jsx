import { useState } from "react";
import { useAsync, useFetchAndLoad, useToggle } from "../hooks/common";
import { useRoute, Link } from "wouter";
import { routes } from "../router";
import { MovieCard } from "../components/movies";
import { Box, Stack, Button } from "@mui/material";
import movieService from "../services/movie.service";
import LoadingPage from "./LoadingPage";

const photosUrl = "https://image.tmdb.org/t/p/w500";

export const MovieDetails = () => {
	const [_match, params] = useRoute(routes.movie.details);

	const { id } = params ?? { id: 0 };

	const [movie, setMovie] = useState({});
	const { loading, callEndpoint } = useFetchAndLoad();

	const handleGoBack = () => {

	}

	const request = async () => await callEndpoint(movieService.getClientDetails({ id }));

	const handleSuccesRequest = (data) => {
		setMovie(data);
	};

	useAsync({ request, handleSuccesRequest });

	if (loading) return <LoadingPage loading={loading} />;

	if (!movie)
		return (
			<Box>
				<Stack spacing={2} direction="row" justifyContent="center">
					<MovieCard
						movie={{
							id: 0,
							name: "No",
							lastName: "Encontrado",
						}}
					/>
				</Stack>
			</Box>
		);


	return (
		<div className="movie-page">
			<img className="background-image" src={photosUrl + movie.poster_path} />
			<div className="movie-content">
				<Box sx={{ padding: "2em" }} style={{ height: "90%" }}>
					<Link key={movie.id} href={routes.movie.all}>
						<Button className="back-button" variant="contained" onClick={handleGoBack}>{`Volver`}</Button>
					</Link>
					<Stack spacing={2} direction="row" justifyContent="center" style={{ height: "90%" }}>
						<MovieCard fullDetail movie={movie} />
					</Stack>
				</Box>
			</div>
		</div>
	);
};

export default MovieDetails;
