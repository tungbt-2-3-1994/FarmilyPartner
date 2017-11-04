import React from 'react';
import {
    Image,
    Text, View, TouchableOpacity, Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Analytics from '../screens/authorized/analytics/Analytics';

const WIDTH = Dimensions.get('window').width;

export const AnalStack = StackNavigator({
    Analytics: {
        screen: Analytics,
        navigationOptions: {
            title: 'Thống kê'
        }
    },

}, {

    });

export default AnalStack;
