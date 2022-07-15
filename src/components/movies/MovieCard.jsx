import { Stack, Avatar, Card, CardContent, Typography, Rating } from "@mui/material";
import { PropTypes } from "prop-types";
import { movieShape } from "./propTypeModels";

const minCardStyles = {
	maxHeight: 310,
	minWidth: 200,
	maxWidth: 500,
	width: "20%",
	"&:hover": {
		cursor: "pointer",
		backgroundColor: "#f5f5f5",
	},
};

const photosUrl = "https://image.tmdb.org/t/p/w500";

const primaryFont = {
	fontFamily: "Roboto",
	fontSize: "1.3em",
};

const secondaryFont = {
	...primaryFont,
	fontSize: "1em",
};

const isFavorite = (id, favorites) => {
	let movie = favorites.find(x => x.id === id);
	if(movie) return 1;
	return 0;
}
 
const Detail = ({ movie, onClick, onFavorites, favorites, ...props }) => {
	return (
		<Card {...props} sx={minCardStyles} className="movie-card">
			<div onClick={onClick} className="movie-card-content">
				<Stack alignItems="center">
					<Avatar style={{ width: 250, height: 250 }} src={photosUrl + movie.poster_path} variant="square" />
				</Stack>
				<Stack justifyContent="center" alignItems="center">
					<Typography sx={primaryFont}>{movie.title}</Typography>
					<Typography sx={secondaryFont}>{movie.vote_average+ "/10"}</Typography>
				</Stack>
			</div>
			<div className="star-container">
				<Rating value ={isFavorite(movie.id, favorites)} defaultValue={0} max={1} onChange={(event, newValue) => {
					onFavorites(newValue, movie);
				}} />
			</div>
		</Card>
	);
};

const FullDetail = ({ movie, onClick }) => {
	return (
		<div className="big-movie-card" onClick={onClick}>
			<div className="movie-detail-card">
				<div className="movie-image-container">
						<img
							className="movie-image"
							src={photosUrl + movie.poster_path}
							variant="square"
						/>
					</div>
				<div className="movie-content">
					<div className="movie-title">
						<b>{movie.title}</b>
					</div>
					<div className="movie-info">
						<div className="info-item">
							<b>Vote Average: </b>
							<span>{movie.vote_average}</span>
						</div>
						<div className="info-item">
							<b>Original Languaje: </b>
							<span>{movie.original_language}</span>
						</div>
						<div className="info-item">
							<b>Overview: </b>
							<span>{movie.overview}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const MovieCard = (props) => {

	const { fullDetail } = props;

	return fullDetail ? <FullDetail {...props} /> : <Detail {...props} />;
};

MovieCard.propTypes = {
	movie: PropTypes.shape(movieShape),
};

export default MovieCard;
