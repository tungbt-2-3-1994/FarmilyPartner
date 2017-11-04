import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { GET_ALL_DEVICES } from './types';

export const getAllDevices = (idStore) => {
    return (dispatch) => {
        fetch(`http://farm.ongnhuahdpe.com/partner/stores/${idStore}/devices`)
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 'success') {
                    // console.log('dd', responseData);
                    // for (var i = 0; i < responseData.data.devices.length; i++) {

                    // }
                    dispatch({
                        type: GET_ALL_DEVICES,
                        payload: responseData.data
                    });
                }
            }).catch((error => console.log(error)));
    }
}

