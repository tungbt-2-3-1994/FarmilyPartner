import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { GET_CURRENT_LOCATION, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from './types';

export const getCurrentLocation = () => {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type: GET_CURRENT_LOCATION,
                    payload: position
                });
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }
}

export const logout = () => {
    return (dispatch) => {
        fetch('http://farm.ongnhuahdpe.com/partner/session/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                dispatch({
                    type: LOGOUT
                });
                const resetNavigator = NavigationActions.navigate({
                    routeName: 'Unauthorized',
                    // index: 0,
                    // actions: [
                    //     NavigationActions.navigate({
                            
                    //     })
                    // ],
                });
                dispatch(resetNavigator);
            })
    }
}

export const autoCheckLogin = () => {
    return (dispatch) => {
        fetch('http://farm.ongnhuahdpe.com/partner/session')
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 'success') {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: responseData.data
                    });
                    const resetNavigator = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'Authorized',
                            })
                        ],
                    });
                    dispatch(resetNavigator);
                }
            }).catch((error => console.log(error)));
    }
}

export const normalLogin = (email, password) => {
    // console.log(email, password);
    return (dispatch) => {
        fetch(`http://farm.ongnhuahdpe.com/partner/session`)
            .then(response => response.json())
            .then((tokenData) => {
                if (tokenData.status == 'warning') {
                    const token = tokenData.token;
                    fetch(`http://farm.ongnhuahdpe.com/partner/session/login`, {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            'email': email,
                            'password': password
                        })
                    })
                        .then((response) => response.json())
                        .then((responseData) => {
                            if (responseData.status == 'error') {
                                Alert.alert('Bạn cần nhập thông tin chính xác');
                                dispatch({
                                    type: LOGIN_FAIL
                                });

                            } else if (responseData.status == 'success') {
                                // console.log('data token', responseData.data);
                                dispatch({
                                    type: LOGIN_SUCCESS,
                                    payload: responseData.data
                                });

                                const resetNavigator = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({
                                            routeName: 'Authorized',
                                        })
                                    ],
                                });
                                dispatch(resetNavigator);
                            }
                        })
                        .done();
                } else if (tokenData.status == 'success') {
                    // da dang nhap
                    // console.log('loggedIn', tokenData);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: tokenData.data
                    });
                    const resetNavigator = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'Authorized',
                            })
                        ],
                    });
                    dispatch(resetNavigator);
                }

            }).catch(error => console.log('error', error))
    }
}