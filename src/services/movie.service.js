import axiosInstance from "./axios.instance";
import { loadAbort } from "../helpers";

export const getClients = ({ page = 1, languaje = "en-US" }) => {
	const controller = loadAbort();
	const call = axiosInstance.get("/top_rated", {
		params: {
			api_key : "bf091621962bdf5c30339e874a2a0c1a",
			page,
			languaje,
		},
		signal: controller.signal,
	});
	return { call, controller };
};

export const getClientDetails = ({ id, languaje = "en-US" }) => {
	const controller = loadAbort();
	const call = axiosInstance.get(`/${id}`, {
		signal: controller.signal,
		params: {
			api_key : "bf091621962bdf5c30339e874a2a0c1a",
			languaje,
		},
	});
	return { call, controller };
};

export const saveFavorite = (movie) => {
	let favorites = localStorage.getItem("favorites");
	if(favorites) {
		favorites = JSON.parse(favorites);
		favorites = [movie, ...favorites]
		localStorage.setItem("favorites", JSON.stringify(favorites));
		return;
	}
	favorites = [movie];
	localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const removeFavorite = (movie) => {
	let favorites = localStorage.getItem("favorites");
	if(favorites) {
		favorites = JSON.parse(favorites);
		favorites = favorites.filter(x => !(x.id === movie.id));
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}
};

export const getFavorites = () => {
	let favorites = localStorage.getItem("favorites");
	if(favorites) {
		favorites = JSON.parse(favorites);
		return favorites;
	}
	return null;
}

export default {
	getClients,
	getClientDetails,
	saveFavorite,
	removeFavorite,
	getFavorites
};
