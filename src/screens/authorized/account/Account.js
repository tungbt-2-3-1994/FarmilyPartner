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
        let avatarView;
        if (this.props.loggedIn) {
            if (this.props.user.user.avatar_url != null) {
                avatarView = <Image style={{ width: width / 2, height: width / 2, borderRadius: width / 4, resizeMode: 'contain', marginBottom: 10 }} source={{ uri: this.props.user.user.avatar_url }} />;
            } else {
                avatarView = <Image style={{ width: width / 2, height: width / 2, borderRadius: width / 4, resizeMode: 'contain', marginBottom: 10 }} source={require('../../../img/normalAcc.png')} />;
            }
        }
        if (this.props.loggedIn === true && this.props.user !== null) {
            view = (
                <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: width, height: width * 3 / 5, backgroundColor: '#00FFFF' }}>
                        {/* <Image style={{ borderColor: '#CACACA', borderWidth: 1, width: width / 2, height: width / 2, borderRadius: width / 4, resizeMode: 'contain', marginBottom: 10 }} source={require('../../img/noImage.jpg')} /> */}
                        {avatarView}
                    </View>
                    <View style={{ backgroundColor: 'white', margin: 10, borderRadius: 5, padding: 10 }}>
                        <Text>
                            <Text>Tên: </Text>
                            <Text style={{ fontFamily: 'Baskerville-BoldItalic', fontSize: 18 }}>
                                {this.props.user.user !== null ? this.props.user.user.name : null}
                            </Text>
                        </Text>
                    </View>
                    <View style={{ backgroundColor: 'white', margin: 10, borderRadius: 5, padding: 10 }}>
                        <Text>
                            <Text>Số điện thoại: </Text>
                            <Text style={{ fontFamily: 'Baskerville-BoldItalic', fontSize: 18 }}>
                                {this.props.user.user !== null ? this.props.user.user.phone_number : 'Không có'}
                            </Text>
                        </Text>

                    </View>
                    <View style={{ backgroundColor: 'white', margin: 10, borderRadius: 5, padding: 10 }}>
                        <Text>
                            <Text>Email: </Text>
                            <Text style={{ fontFamily: 'Baskerville-BoldItalic', fontSize: 18 }}>
                                {this.props.user.user !== null ? this.props.user.user.email : 'Không có'}
                            </Text>
                        </Text>

                    </View>
                    <Container>
                        <ButtonLogin
                            styles={{ button: styles.transparentButtonOut }}
                            onPress={() => {
                                this.setState({ animating: true });
                                this.props.logout()
                            }}
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
