import { SET_DETAIL_MOVIE_REDUCER, SET_THEATER_SYSTEM_REDUCER } from "../types/CinemaSystemTypes"

const initialState = {
    arrCinemaSystem: [],
    movieDetail: {},
}

export const CinemaSystemReducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_THEATER_SYSTEM_REDUCER: {
            return { ...state, arrCinemaSystem: action.arrCinemaSystem }
        }
        case SET_DETAIL_MOVIE_REDUCER: {
            return { ...state, movieDetail: action.movieDetail }
        }
        default:
            return { ...state }
    }
}
