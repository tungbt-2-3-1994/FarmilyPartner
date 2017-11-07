import { GET_ACTIVE_ORDER, LOGOUT } from '../actions/types';

const INITIAL = {
    activeOrder: {},
    loading: true
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case GET_ACTIVE_ORDER:
            return { ...state, loading: false, activeOrder: action.payload };
        case LOGOUT:
            return INITIAL;
        default:
            return state;
    }
}