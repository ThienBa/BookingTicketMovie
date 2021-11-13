import { GET_LIST_MOVIE_REDUCER, SET_INFO_MOVIE_REDUCER } from "../types/MovieTypes";
import { InfoMovieModels } from "../../_core/models/InfoMovieModels";

const initialState = {
    arrrMovieDefault: [],
    arrMovieShowing: [],
    arrMovieCommingSoon: [],
    infoMovie: new InfoMovieModels(),
}

export const MovieReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_MOVIE_REDUCER: {
            const { arrMovie } = action;
            return {
                ...state,
                arrrMovieDefault: arrMovie,
                arrMovieShowing: arrMovie.filter(movie => movie.dangChieu),
                arrMovieCommingSoon: arrMovie.filter(movie => movie.sapChieu)
            }
        }

        case SET_INFO_MOVIE_REDUCER: {
            return { ...state, infoMovie: action.infoMovie }
        }
        
        default:
            return { ...state }
    }
}
