import React from 'react';
import {
    Image,
    Text, View, TouchableOpacity, Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Control from '../screens/authorized/control/Control';
import Detail from '../screens/authorized/control/Detail';

const WIDTH = Dimensions.get('window').width;

export const ControlStack = StackNavigator({
    Control: {
        screen: Control,
        navigationOptions: {
            title: 'Điều khiển'
        }
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            title: 'Chi tiết điều khiển'
        }
    },

}, {

    });

export default ControlStack;
