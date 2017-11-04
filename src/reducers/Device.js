import { GET_ALL_DEVICES, LOGOUT } from '../actions/types';

const INITIAL = {
    device: {},
    loading: true
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case GET_ALL_DEVICES:
            return { ...state, loading: false, device: action.payload };
        case LOGOUT:
            return INITIAL;
        default:
            return state;
    }
}