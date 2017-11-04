import { StackNavigator } from 'react-navigation';

import Login from '../screens/unauthorized/Login';
import MainNavigator from './MainNavigator';


const Root = StackNavigator({
    Unauthorized: {
        screen: Login,
    },
    Authorized: {
        screen: MainNavigator
    },
}, {
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false
        }
    });

export default Root;