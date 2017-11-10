

import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { GET_ACTIVE_ORDER } from './types';

export const getActiveOrder = () => {
    return (dispatch) => {
        fetch(`http://farm.ongnhuahdpe.com/partner/stores/1/orders/active`)
            .then(response => response.json())
            .then((responseData) => {
                // console.log(responseData);
                if (responseData.status == 'success') {
                    console.log('dd', responseData);
                    dispatch({
                        type: GET_ACTIVE_ORDER,
                        payload: responseData.data
                    });
                }
            }).catch((error => console.log(error)));
    }
}
