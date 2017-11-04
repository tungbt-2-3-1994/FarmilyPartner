import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput
} from 'react-native';

import { css } from '../../screens/Global';

export default class Textbox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TextInput
                {...this.props}
                underlineColorAndroid="transparent"
                onSubmitEditing={this.props.onSubmitEditing}
                placeholderTextColor="white"
                style={[styles.textbox, this.props.style]}
            />
        );
    }
}

export const styles = StyleSheet.create({
    textbox: {
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
        color: '#fff',
        marginBottom: 10,
    }
});