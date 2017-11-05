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
            animating: false
        }
    }

    componentWillMount() {
    }

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
                        source={require('../../img/logofarmilytransparent.png')}
                    />
                    <View style={{}}>
                        <TextInput
                            placeholder="Email hoặc tên đăng nhập"
                            returnKeyType="next"
                            placeholderTextColor="#1F4491"
                            style={styles.textbox}

                            onSubmitEditing={() => this.passwordInput.focus()}
                            underlineColorAndroid='transparent'
                            keyboardType="email-address"
                            onChangeText={(text) => { this.setState({ textEmail: text }) }}
                        />
                        <TextInput
                            secureTextEntry={true}
                            placeholder="Mật khẩu"
                            returnKeyType="go"

                            underlineColorAndroid="transparent"
                            placeholderTextColor="#1F4491"
                            style={styles.textbox}
                            ref={(input) => this.passwordInput = input}
                            onChangeText={(text) => { this.setState({ textPassword: text }) }}
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
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
        color: '#1F4491',
        marginBottom: 18,
        paddingBottom: 3,
        fontWeight: 'bold'
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
