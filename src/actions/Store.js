import { GET_ALL_STORES, FETCH_STORE_BY_ID, FAIL_TO_GET_STORES, SEARCH_STORE_BY_ADD_INFOR } from './types';

export const getAllStores = (partner_id) => {
    return (dispatch) => {
        // call API get all stores
        fetch(`http://farm.ongnhuahdpe.com/partners/${partner_id}/stores`)
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status === 'success') {
                    dispatch({
                        type: GET_ALL_STORES,
                        payload: responseData.data
                    });
                } else if (responseData.status === 'error') {
                    dispatch({
                        type: FAIL_TO_GET_STORES
                    });
                }
            }).catch(error => console.log('error', error));
    }
}

export const getMoreStore = (index) => {
    return (dispatch) => {
        //call API get all stores
        fetch(`http://farm.ongnhuahdpe.com/admin/stores?page=${index}`)
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status === 'success') {
                    if (responseData.data !== []) {
                        dispatch({
                            type: GET_ALL_STORES,
                            payload: responseData
                        });
                    }
                } else if (responseData.status === 'error') {
                    dispatch({
                        type: FAIL_TO_GET_STORES
                    });
                }
            }).catch(error => console.log('error', error));
    }
}

export const getStoreById = (id) => {
    return (dispatch) => {
        //call API get store by id
        fetch(`http://farm.ongnhuahdpe.com/admin/stores/${id}`)
            .then(response => response.json())
            .then((responseData) => {
                dispatch({
                    type: FETCH_STORE_BY_ID,
                    payload: responseData
                });
            }).catch(error => console.log('error', error));
    }
}

export const searchStoreByAddOrInfo = (text) => {
    return (dispatch) => {
        fetch(`http://farm.ongnhuahdpe.com/admin/stores?quick_search=${text}`)
            .then(response => response.json())
            .then((responseData) => {
                dispatch({
                    type: SEARCH_STORE_BY_ADD_INFOR,
                    payload: responseData.data
                });
            }).catch(error => console.log('error', error));
    }
}