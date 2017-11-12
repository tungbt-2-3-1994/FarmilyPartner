import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import { css } from '../Global';

// Components
import ButtonLogin from '../../components/Login/Button';
import Label from '../../components/Login/Label';
import Container from '../../components/Login/Container';
import Textbox from '../../components/Login/Textbox';
import ButtonRounded from '../../components/Login/ButtonRounded';

import { normalLogin, autoCheckLogin } from '../../actions';

class Account extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            textEmail: '',
            textPassword: '',
            animating: false,
            emailBorderColor: '#ffffff',
            passBorderColor: '#ffffff',
            emailPlaceholderColor: '#787878',
            passPlaceholderColor: '#787878',
        }
    }

    handleEmailFocus = () => {
        this.setState({
            emailBorderColor: '#009689',
            passBorderColor: '#ffffff',
            emailPlaceholderColor: '#21458c',
            passPlaceholderColor: '#787878',
        });
    }

    handlePassFocus = () => {
        this.setState({
            emailBorderColor: '#ffffff',
            passBorderColor: '#009689',
            emailPlaceholderColor: '#787878',
            passPlaceholderColor: '#21458c',
        });
    }

    componentWillMount() {
    }

    // componentDidMount() {
    //     console.log(new Date().getTime().toLocaleString());
    // }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loggedIn.loggedIn) {
            this.setState({
                animating: false
            });
        }
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    onNormalLogin(email, password) {
        if (email == '' || password == '') {
            Alert.alert('Bạn cần nhập đủ thông tin các trường');
            this.setState({
                animating: false
            });
        } else {
            if (!this.validateEmail(email)) {
                Alert.alert('Email của bạn không đúng định dạng');
            } else {
                this.setState({
                    animating: true
                });
                this.props.normalLogin(email, password);
            }
        }
    }

    render() {
        return (
            <View style={[css.container, styles.container]}>
                <Image
                    style={css.auth_bg}
                    source={require('../../img/bg.png')}
                    resizeMode="stretch"
                    blurRadius={5}
                />
                <ScrollView style={css.auth_content}>
                    <Image
                        style={css.logo}
                        source={require('../../img/partnerTransparent.png')}
                    />
                    <View style={{}}>
                        <TextInput
                            placeholder="Nhập email"
                            returnKeyType="next"
                            placeholderTextColor={this.state.emailPlaceholderColor}
                            style={{
                                backgroundColor: '#ffffff',
                                borderWidth: 1,
                                color: '#21458c',
                                marginBottom: 18,
                                paddingBottom: 15,
                                paddingTop: 15,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderRadius: 30,
                                borderColor: this.state.emailBorderColor
                            }}
                            onSubmitEditing={() => this.passwordInput.focus()}
                            underlineColorAndroid='transparent'
                            keyboardType="email-address"
                            onChangeText={(text) => { this.setState({ textEmail: text }) }}
                            onFocus={() => { this.handleEmailFocus() }}
                        />
                        <TextInput
                            secureTextEntry={true}
                            placeholder="Nhập mật khẩu"
                            returnKeyType="go"
                            underlineColorAndroid="transparent"
                            placeholderTextColor={this.state.passPlaceholderColor}
                            style={{
                                backgroundColor: '#ffffff',
                                borderWidth: 1,
                                color: '#21458c',
                                marginBottom: 18,
                                paddingBottom: 15,
                                paddingTop: 15,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderRadius: 30,
                                borderColor: this.state.passBorderColor
                            }}
                            ref={(input) => this.passwordInput = input}
                            onChangeText={(text) => { this.setState({ textPassword: text }) }}
                            onFocus={() => { this.handlePassFocus() }}
                        />

                        <View style={css.auth_submit}>
                            <ButtonRounded
                                onPress={() => { this.onNormalLogin(this.state.textEmail, this.state.textPassword) }}
                                text="Đăng nhập"
                            />
                        </View>
                    </View>

                </ScrollView>
                {this.state.animating &&
                    <ActivityIndicator
                        color='red'
                        size="large"
                        style={styles.activityIndicator} />
                }
            </View>
        );
    }
}

const styles = {
    textbox: {

    },
    activityIndicator: {
        position: 'absolute', top: 0, left: 0,
        right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#475299',
        justifyContent: 'center',
        marginTop: 60,
        borderRadius: 5
    },
    container: {
        position: 'relative',
    },
    transparentButton: {
        marginTop: 30,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5
    },
    buttonBlueText: {
        fontSize: 14,
        color: 'white'
    },
    buttonBigText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
};

const mapStateToProps = (state) => {
    return ({
        loggedIn: state.userInfor,
        user: state.userInfor.user
    });
}

export default connect(mapStateToProps, { normalLogin, autoCheckLogin })(Account);
