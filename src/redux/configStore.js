import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { CarouselReducers } from './reducers/CarouselReducers';
import { MovieReducers } from './reducers/MovieReducers';
import { CinemaSystemReducers } from './reducers/CinemaSystemReducers';
import { UserReducers } from './reducers/UserReducers';
import { TicketRoomReducers } from './reducers/TicketRoomReducers';
import { LoadingReducers } from './reducers/LoadingReducers';

const rootReducers = combineReducers({
    CarouselReducers,
    MovieReducers,
    CinemaSystemReducers,
    UserReducers,
    TicketRoomReducers,
    LoadingReducers,
})

export const store = createStore(rootReducers, applyMiddleware(thunk));