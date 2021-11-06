import { GET_LIST_MOVIE_REDUCER } from "../types/MovieTypes";

const initialState = {
    arrMovieShowing: [],
    arrMovieCommingSoon: [],
}

export const MovieReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_MOVIE_REDUCER: {
            const { arrMovie } = action;
            return {
                ...state,
                arrMovieShowing: arrMovie.filter(movie => movie.dangChieu),
                arrMovieCommingSoon: arrMovie.filter(movie => movie.sapChieu)
            }
        }

        default:
            return { ...state }
    }
}
