import React from 'react';
import {
    Image,
    Text, View, TouchableOpacity, Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AllStore from '../screens/authorized/store/AllStore';
import DetailStore from '../screens/authorized/store/DetailStore';
import CurrentOrder from '../screens/authorized/store/CurrentOrder';

const WIDTH = Dimensions.get('window').width;

export const StoreStack = StackNavigator({
    AllStore: {
        screen: AllStore,
        navigationOptions: {
            title: 'Cửa hàng'
        }
    },
    DetailStore: {
        screen: DetailStore,
        navigationOptions: {
            title: 'Danh sách hàng hóa'
        }
    },
    CurrentOrder: {
        screen: CurrentOrder,
        navigationOptions: {
            title: 'Đơn đặt hàng mới'
        }
    }
}, {

    });

const styles = {
    icon: {
        width: 26,
        height: 26,
    },

};

export default StoreStack;
