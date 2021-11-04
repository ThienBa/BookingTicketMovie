import { GET_DATA_CAROUSEL_REDUCER } from "../types/CarouselTypes"

const initialState = {
    arrCarousel: [],
}

export const CarouselReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_CAROUSEL_REDUCER: {
            return { ...state, arrCarousel: action.arrCarousel }
        }
        default:
            return { ...state }
    }
}
