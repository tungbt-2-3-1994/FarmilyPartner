import { combineReducers } from 'redux';

import Navigation from './Navigations';
import UserInfor from './UserInfor';
import Store from './Store';
import SearchBox from './SearchBox';
import StoreBySearch from './StoreBySearch';
import DetailStore from './StoreById';
import Device from './Device';

export default combineReducers({
    nav: Navigation,
    userInfor: UserInfor,
    partner: Device,
    store: Store,
    // searchBox: SearchBox,
    // storeBySearch: StoreBySearch,
    detailStore: DetailStore
});
