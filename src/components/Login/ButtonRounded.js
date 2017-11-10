import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import { css } from '../../screens/Global';

export default class ButtonRounded extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.caption}>
                        {this.props.text}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export const styles = StyleSheet.create({
    button: {
        backgroundColor: '#009689',
        borderRadius: 100,
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 15,
        minWidth: 200,
    },
    caption: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
});