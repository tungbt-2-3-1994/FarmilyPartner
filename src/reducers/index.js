import { combineReducers } from 'redux';

import Navigation from './Navigations';
import UserInfor from './UserInfor';
import Store from './Store';
import SearchBox from './SearchBox';
import StoreBySearch from './StoreBySearch';
import DetailStore from './StoreById';
import Device from './Device';
import ActiveOrder from './ActiveOrder';

export default combineReducers({
    nav: Navigation,
    userInfor: UserInfor,
    partner: Device,
    store: Store,
    activeOrder: ActiveOrder,
    detailStore: DetailStore
});
