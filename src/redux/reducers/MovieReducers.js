import { GET_LIST_MOVIE_REDUCER, SET_MOVIE_COMMING_SOON_REDUCER, SET_MOVIE_SHOWING_REDUCER } from "../types/MovieTypes"

const initialState = {
    arrMovie: [],
    arrMovieShowing: [],
    arrMovieCommingSoon: [],
    showing: true,
    commingSoon: true,
}

export const MovieReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_MOVIE_REDUCER: {
            return { ...state, arrMovie: action.arrMovie, arrMovieShowing: action.arrMovie.filter(movie => movie.dangChieu), arrMovieCommingSoon: action.arrMovie.filter(movie => movie.sapChieu) }
        }

        case SET_MOVIE_SHOWING_REDUCER: {
            return { ...state, showing: !state.showing, arrMovie: state.arrMovieShowing }
        }

        case SET_MOVIE_COMMING_SOON_REDUCER: {
            return { ...state, commingSoon: !state.commingSoon, arrMovie: state.arrMovieCommingSoon }
        }
        default:
            return { ...state }
    }
}
