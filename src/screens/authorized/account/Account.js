import React, { Component } from 'react';
import {
    Dimensions, View, Text, Image, Button, ActivityIndicator, TouchableOpacity, TextInput, ScrollView, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import Container from '../../../components/Login/Container';
import Label from '../../../components/Login/Label';
import ButtonLogin from '../../../components/Login/Button';
const { width, height } = Dimensions.get('window');

import { logout } from '../../../actions';

class Account extends Component {

    static navigationOptions = {
        title: 'Tài khoản',
        headerStyle: {
            backgroundColor: '#388E3C',
        },
        headerBackTitle: null,
        headerTitleStyle: { color: 'white', fontFamily: 'Baskerville-BoldItalic', fontSize: 20 },
    }

    state = {
        textEmail: '',
        textPassword: '',
        loggedIn: true,
        animating: false
    }



    render() {
        let view;
        if (this.props.loggedIn === true && this.props.user !== null) {
            view = (
                <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: width, height: width * 3 / 5, backgroundColor: '#00FFFF' }}>
                        <Image style={{ width: width / 2, height: width / 2, borderRadius: width / 4, resizeMode: 'contain', marginBottom: 10 }} source={require('../../../img/logofarmily.png')} />
                    </View>
                    <View style={{ backgroundColor: 'white', margin: 10, borderRadius: 5, padding: 10 }}>
                        <Text style={{ fontFamily: 'Baskerville-BoldItalic', fontSize: 18 }}>
                            Tên: {this.props.user !== null ? this.props.user.user.name : 'Erroe'}
                        </Text>
                    </View>
                    <View style={{ backgroundColor: 'white', margin: 10, borderRadius: 5, padding: 10 }}>
                        <Text style={{ fontFamily: 'Baskerville-BoldItalic', fontSize: 18 }}>
                            Phone Number: {this.props.user !== null ? this.props.user.user.phone_number : 'Không có'}
                        </Text>
                    </View>
                    <View style={{ backgroundColor: 'white', margin: 10, borderRadius: 5, padding: 10 }}>
                        <Text style={{ fontFamily: 'Baskerville-BoldItalic', fontSize: 18 }}>
                            Email: {this.props.user !== null ? this.props.user.user.email : 'Không có'}
                        </Text>
                    </View>
                    <Container>
                        <ButtonLogin
                            styles={{ button: styles.transparentButtonOut }}
                            onPress={() => { this.props.logout() }}
                        >
                            <View style={styles.inline}>
                                <Text style={[styles.buttonBlueText, styles.buttonBigText]}>  Đăng xuất </Text>
                            </View>
                        </ButtonLogin>
                    </Container>
                </ScrollView>
            );
        } else {
            view = (
                <View backgroundColor='white'>
                    <Text></Text>
                </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>
                {view}
            </View>
        );
    }
}

const styles = {
    signUp: { marginTop: 10, borderRadius: 5, backgroundColor: '#42F2B0', width: 100, height: 30, justifyContent: 'center', alignItems: 'center' },
    scroll: {
        backgroundColor: 'white',
        padding: 30,
        flexDirection: 'column'
    },
    textInput: {
        height: 30,
        fontSize: 14,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingBottom: 2,
        borderColor: '#42F2B0',
        borderWidth: 2
    },
    transparentButton: {
        marginTop: 30,
        borderColor: '#3B5699',
        borderWidth: 2,
        borderRadius: 5,
    },
    transparentButtonOut: {
        marginTop: 30,
        borderColor: '#3B5699',
        borderWidth: 2,
        borderRadius: 5,
        marginLeft: 100, marginRight: 100,
    },
    buttonBlueText: {
        fontSize: 14,
        color: '#3B5699'
    },
    buttonBigText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    buttonWhiteText: {
        fontSize: 16,
        color: '#FFF',
        padding: 8,

    },
    buttonBlackText: {
        fontSize: 20,
        color: '#595856'
    },
    primaryButton: {
        backgroundColor: '#34A853',
        borderRadius: 5,
    },
    footer: {
        marginTop: 30,

    },
    icon: {
        width: 26,
        height: 26,
    },
};

const mapStateToProps = (state) => {
    // console.log(state.userInfor.user);
    return ({
        loggedIn: state.userInfor.loggedIn,
        user: state.userInfor.user || {}
    });
}

export default connect(mapStateToProps, { logout })(Account);
