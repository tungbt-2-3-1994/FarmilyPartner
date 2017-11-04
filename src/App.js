import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './store';
import AppNavigator from './AppNavigator';

export default class Farmily2017 extends Component {

    render() {
        // console.ignoredYellowBox = ['Setting a timer'];
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('FarmilyPartner', () => Farmily2017);
