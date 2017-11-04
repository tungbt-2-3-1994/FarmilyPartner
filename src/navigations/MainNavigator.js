import React, { Component } from 'react';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconOct from 'react-native-vector-icons/MaterialIcons';

import StoreStack from './StoreStack';
import AnalStack from './AnalStack';
import ControlStack from './ControlStack';
import Account from '../screens/authorized/account/Account';

const MainNavigator = TabNavigator({
    AllStoreTab: {
        screen: StoreStack,
        navigationOptions: {
            tabBarLabel: 'Cửa hàng',
        }
    },
    AnalTab: {
        screen: AnalStack,
        navigationOptions: {
            tabBarLabel: 'Thống kê',
        }
    },
    ControlTab: {
        screen: ControlStack,
        navigationOptions: {
            tabBarLabel: 'Điều khiển',
        }
    },
    AccountTab: {
        screen: Account,
        navigationOptions: {
            tabBarLabel: 'Cửa hàng',
        }
    },
}, {
        tabBarComponent: NavigationComponent,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            bottomNavigationOptions: {
                tabs: {
                    AllStoreTab: {
                        style: { fontFamily: 'Baskerville-BoldItalic', fontWeight: 40 },
                        labelColor: '#CACACA',
                        icon: <Icon size={20} color='#CACACA' name='store' />,
                        barBackgroundColor: '#F3F3F3',
                        activeLabelColor: '#388E3C',
                        activeIcon: <Icon size={24} color="#388E3C" name="store" />
                    },
                    AnalTab: {
                        labelColor: '#CACACA',
                        icon: <Icon size={20} color='#CACACA' name='insert-chart' />,
                        barBackgroundColor: '#F3F3F3',
                        activeLabelColor: '#388E3C',
                        activeIcon: <Icon size={24} color="#388E3C" name="insert-chart" />
                    },
                    ControlTab: {
                        style: { fontFamily: 'Baskerville-BoldItalic', fontWeight: 40 },
                        labelColor: '#CACACA',
                        icon: <Icon size={20} color='#CACACA' name='adjust' />,
                        barBackgroundColor: '#F3F3F3',
                        activeLabelColor: '#388E3C',
                        activeIcon: <Icon size={24} color="#388E3C" name="adjust" />
                    },
                    AccountTab: {
                        style: { fontFamily: 'Baskerville-BoldItalic', fontWeight: 40 },
                        labelColor: '#CACACA',
                        icon: <Icon size={20} color='#CACACA' name='account-box' />,
                        barBackgroundColor: '#F3F3F3',
                        activeLabelColor: '#388E3C',
                        activeIcon: <Icon size={24} color="#388E3C" name="account-box" />
                    },
                }
            }
        }
    })

export default MainNavigator;