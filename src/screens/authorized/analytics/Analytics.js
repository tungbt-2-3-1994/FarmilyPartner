import React, { Component } from 'react';
import {
    View, Text, Image, Button, ActivityIndicator, TouchableOpacity, TextInput, ScrollView, Alert,
} from 'react-native';
import { connect } from 'react-redux';

class Analytics extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#388E3C',
        },
        headerBackTitle: null,
        headerTitleStyle: { color: 'white', fontFamily: 'Baskerville-BoldItalic', fontSize: 20 },
    }

    render() {
        return (
            <View style={styles.container}>
            </View>
        )
    }
}

styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
}

export default Analytics;
