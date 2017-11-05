import React, { Component } from 'react';
import {
    Dimensions, Switch, View, Text, Image, Button, ActivityIndicator, TouchableOpacity, TextInput, ScrollView, Alert,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import io from 'socket.io-client/dist/socket.io';

const config = {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 10000,
    connect_timeout: 10000
};

const SOCKET_URL = 'http://farm.ongnhuahdpe.com:3000';

const { width, height } = Dimensions.get('window');

class Detail extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#388E3C',
        },
        headerBackTitle: null,
        headerTintColor: 'white',
        headerTitleStyle: { color: 'white', fontFamily: 'Baskerville-BoldItalic', fontSize: 20 },
    }

    state = {
        data: {},
        loading: true,
        ledData: {},
        motor1Data: {},
        motor2Data: {},
        motor3Data: {},
        motor4Data: {},
        pumpData: {},
        valveData: {},
    }

    constructor(props) {
        super(props);
        this.socket = io.connect(SOCKET_URL, { config });
        this.socket.emit('authenticate', { 'token': this.props.user.auth_token });
    }

    componentWillUnmount() {
        let { id } = this.props.navigation.state.params;
        this.socket.removeListener(`device_${id}_state`);
        console.log('asjasga');
    }

    handleLed = (ledData) => {
        this.setState({
            ledData: ledData,
            loading: false
        });
    }
    handleMotor1 = (ledData) => {
        this.setState({
            motor1Data: ledData,
            loading: false
        });
    }
    handleMotor2 = (ledData) => {
        this.setState({
            motor2Data: ledData,
            loading: false
        });
    }
    handleMotor3 = (ledData) => {
        this.setState({
            motor3Data: ledData,
            loading: false
        });
    }
    handleMotor4 = (ledData) => {
        this.setState({
            motor4Data: ledData,
            loading: false
        });
    }
    handlePump = (ledData) => {
        this.setState({
            pumpData: ledData,
            loading: false
        });
    }
    handleValve = (ledData) => {
        this.setState({
            valveData: ledData,
            loading: false
        });
    }

    componentDidMount() {

        console.log('data', typeof this.state.data);
        console.log('{}', typeof {});
        let { id } = this.props.navigation.state.params;
        console.log('id', id);
        this.socket.on(`device_${id}_state`, (data) => {
            console.log(data);
            let tstr = '{' + data.replace(/\*/g, '\"') + '}';
            // console.log(JSON.parse(tstr));
            let json = JSON.parse(tstr);
            console.log(json);
            if (json.NAME == 'LED') {
                this.handleLed(json);
            } else if (json.NAME == 'MOTOR1') {
                this.handleMotor1(json);
            } else if (json.NAME == 'MOTOR2') {
                this.handleMotor2(json);
            } else if (json.NAME == 'MOTOR3') {
                this.handleMotor3(json);
            } else if (json.NAME == 'MOTOR4') {
                this.handleMotor4(json);
            } else if (json.NAME == 'PUMP') {
                this.handlePump(json);
            } else if (json.NAME == 'VALVE') {
                this.handleValve(json);
            } else {
                this.handleData(json);
            }
        });
    }

    handleData = (data) => {
        this.setState({
            data: data,
            loading: false
        });
    }
    //motor 1
    motor1Press = () => {
        this.setState({
            loading: true
        });
        this.socket.emit('change_device_state', {
            'device_id': this.props.navigation.state.params.id,
            'data': {
                "Header": "S",
                "Command": "1",
                "time": "10:56:29",
            }
        });
    }
    //motor 2
    motor2Press = () => {
        this.setState({
            loading: true
        });
        this.socket.emit('change_device_state', {
            'device_id': this.props.navigation.state.params.id,
            'data': {
                "Header": "S",
                "Command": "2",
                "time": "10:56:29",
            }
        });
    }
    //motor 3
    motor3Press = () => {
        this.setState({
            loading: true
        });
        this.socket.emit('change_device_state', {
            'device_id': this.props.navigation.state.params.id,
            'data': {
                "Header": "S",
                "Command": "4",
                "time": "10:56:29",
            }
        });
    }
    //motor 4
    motor4Press = () => {
        this.setState({
            loading: true
        });
        this.socket.emit('change_device_state', {
            'device_id': this.props.navigation.state.params.id,
            'data': {
                "Header": "S",
                "Command": "8",
                "time": "10:56:29",
            }
        });
    }
    //den LED
    ledPress = () => {
        this.setState({
            loading: true
        });
        this.socket.emit('change_device_state', {
            'device_id': this.props.navigation.state.params.id,
            'data': {
                "Header": "S",
                "Command": "64",
                "time": "10:56:29",
            }
        });
    }
    //valve
    valvePress = () => {
        this.setState({
            loading: true
        });
        this.socket.emit('change_device_state', {
            'device_id': this.props.navigation.state.params.id,
            'data': {
                "Header": "S",
                "Command": "16",
                "time": "10:56:29",
            }
        });
    }
    //pump
    pumpPress = () => {
        this.setState({
            loading: true
        });
        this.socket.emit('change_device_state', {
            'device_id': this.props.navigation.state.params.id,
            'data': {
                "Header": "S",
                "Command": "32",
                "time": "10:56:29",
            }
        });
    }

    render() {
        // console.log('this', this.state.data);
        let space = ' ';
        return (
            <View style={{ flex: 1, backgroundColor: '#CACACA' }}>
                <ScrollView style={{ flex: 1, margin: 8, backgroundColor: 'white' }}>
                    <Text style={{ fontFamily: 'Cochin', paddingTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 25 }}>
                        <Text style={{ color: '#CACACA', fontSize: 14 }} >
                            Sensor Box ID: {space}
                        </Text>
                        <Text numberOfLines={2} style={{ fontWeight: 'bold', color: 'black', fontSize: 17 }}>
                            {this.props.navigation.state.params.sensorId}
                        </Text>
                    </Text>

                    <View style={{ marginTop: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Cochin', fontSize: width / 12, color: '#388E3C', marginLeft: width/15 }}>{this.state.data.TEMPERATURE}</Text>
                                <Icon name='ios-thermometer' size={width / 9} color='#388E3C' />
                            </View>
                            <Text style={{ fontFamily: 'Cochin', fontSize: width / 25 }}>°C</Text>
                            <Text style={{ fontSize: width / 30 }}>Nhiệt độ</Text>

                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Cochin', fontSize: width / 12, color: '#388E3C', marginLeft: width/15 }}>{this.state.data.HUMIDITY}</Text>
                                <Image style={{ width: width / 9, height: width / 9, resizeMode: 'stretch' }} source={require('../../../img/humidity.png')} />
                            </View>
                            <Text style={{ fontFamily: 'Cochin', fontSize: width / 25 }}>%</Text>
                            <Text style={{ fontSize: width / 30 }}>Độ ẩm</Text>

                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Cochin', fontSize: width / 12, color: '#388E3C', marginLeft: width/15 }}>{this.state.data.pH}</Text>
                                <Image style={{ width: width / 9, height: width / 9, resizeMode: 'stretch' }} source={require('../../../img/pH.jpg')} />
                            </View>
                            <Text style={{ fontFamily: 'Cochin', fontSize: width / 25 }}>°</Text>
                            <Text style={{ fontSize: width / 30 }}>Độ pH</Text>

                        </View>
                    </View>
                    <View style={{ marginTop: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Cochin', fontSize: width / 12, color: '#388E3C', marginLeft: width/15 }}>{this.state.data.EC}</Text>
                                <Image style={{ width: width / 9, height: width / 9, resizeMode: 'stretch' }} source={require('../../../img/bolt.png')} />
                            </View>
                            <Text style={{ fontFamily: 'Cochin', fontSize: width / 25 }}>mS/cm</Text>
                            <Text style={{ fontSize: width / 30 }}>Độ dẫn điện</Text>

                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Cochin', fontSize: width / 12, color: '#388E3C', marginLeft: width/15 }}>{this.state.data.LUX}</Text>
                                <Image style={{ width: width / 9, height: width / 9, resizeMode: 'stretch' }} source={require('../../../img/sun.png')} />
                            </View>
                            <Text style={{ fontFamily: 'Cochin', fontSize: width / 25 }}>Cd</Text>
                            <Text style={{ fontSize: width / 30 }}>Cường độ sáng</Text>

                        </View>
                        <View style={{ justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                        </View>
                    </View>

                    <Text style={{ paddingLeft: 10, marginTop: 10, marginBottom: 10, fontFamily: 'Cochin', fontSize: width / 15 }}>Các thông số điều khiển</Text>

                    <View style={{ marginTop: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ alignSelf: 'center', borderRadius: width / 18, width: width / 9, height: width / 9, backgroundColor: this.state.motor1Data.MOTOR1_ACTIVE == '1' ? '#5BBD2B' : 'red' }}></View>
                            <Text style={{ fontSize: width / 20, textAlign: 'center' }}>Motor 1</Text>
                            <TouchableOpacity style={{ backgroundColor: '#388E3C', borderRadius: 3 }} onPress={() => { this.motor1Press() }}>
                                <Text style={{ color: 'white', fontSize: width / 22, textAlign: 'center', paddingTop: 3, paddingBottom: 3 }} > Thay đổi</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ alignSelf: 'center', borderRadius: width / 18, width: width / 9, height: width / 9, backgroundColor: this.state.motor2Data.MOTOR2_ACTIVE == '1' ? '#5BBD2B' : 'red' }}></View>
                            <Text style={{ fontSize: width / 20, textAlign: 'center' }}>Motor 2</Text>
                            <TouchableOpacity style={{ backgroundColor: '#388E3C', borderRadius: 3 }} onPress={() => { this.motor2Press() }}>
                                <Text style={{ color: 'white', fontSize: width / 22, textAlign: 'center', paddingTop: 3, paddingBottom: 3 }} > Thay đổi</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ alignSelf: 'center', borderRadius: width / 18, width: width / 9, height: width / 9, backgroundColor: this.state.motor3Data.MOTOR3_ACTIVE == '1' ? '#5BBD2B' : 'red' }}></View>
                            <Text style={{ fontSize: width / 20, textAlign: 'center' }}>Motor 3</Text>
                            <TouchableOpacity style={{ backgroundColor: '#388E3C', borderRadius: 3 }} onPress={() => { this.motor3Press() }}>
                                <Text style={{ color: 'white', fontSize: width / 22, textAlign: 'center', paddingTop: 3, paddingBottom: 3 }} > Thay đổi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ alignSelf: 'center', borderRadius: width / 18, width: width / 9, height: width / 9, backgroundColor: this.state.motor4Data.MOTOR4_ACTIVE == '1' ? '#5BBD2B' : 'red' }}></View>
                            <Text style={{ fontSize: width / 20, textAlign: 'center' }}>Motor 4</Text>
                            <TouchableOpacity style={{ backgroundColor: '#388E3C', borderRadius: 3 }} onPress={() => { this.motor4Press() }}>
                                <Text style={{ color: 'white', fontSize: width / 22, textAlign: 'center', paddingTop: 3, paddingBottom: 3 }} > Thay đổi</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ alignSelf: 'center', borderRadius: width / 18, width: width / 9, height: width / 9, backgroundColor: this.state.pumpData.PUMP_ACTIVE == '1' ? '#5BBD2B' : 'red' }}></View>
                            <Text style={{ fontSize: width / 20, textAlign: 'center' }}>Ống nước</Text>
                            <TouchableOpacity style={{ backgroundColor: '#388E3C', borderRadius: 3 }} onPress={() => { this.pumpPress() }}>
                                <Text style={{ color: 'white', fontSize: width / 22, textAlign: 'center', paddingTop: 3, paddingBottom: 3 }} > Thay đổi</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ alignSelf: 'center', borderRadius: width / 18, width: width / 9, height: width / 9, backgroundColor: this.state.ledData.LED_ACTIVE == '1' ? '#5BBD2B' : 'red' }}></View>
                            <Text style={{ fontSize: width / 20, textAlign: 'center' }}>Đèn LED</Text>
                            <TouchableOpacity style={{ backgroundColor: '#388E3C', borderRadius: 3 }} onPress={() => { this.ledPress() }}>
                                <Text style={{ color: 'white', fontSize: width / 22, textAlign: 'center', paddingTop: 3, paddingBottom: 3 }} > Thay đổi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ alignSelf: 'center', borderRadius: width / 18, width: width / 9, height: width / 9, backgroundColor: this.state.valveData.VALVE_ACTIVE == '1' ? '#5BBD2B' : 'red' }}></View>
                            <Text style={{ fontSize: width / 20, textAlign: 'center' }}>Khóa Valve</Text>
                            <TouchableOpacity style={{ backgroundColor: '#388E3C', borderRadius: 3 }} onPress={() => { this.valvePress() }}>
                                <Text style={{ color: 'white', fontSize: width / 22, textAlign: 'center', paddingTop: 3, paddingBottom: 3 }} > Thay đổi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {this.state.loading &&
                    <ActivityIndicator
                        color='red'
                        size='large'
                        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
                    />}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state.device);
    return ({
        user: state.userInfor.user,
    });
}

export default connect(mapStateToProps, {})(Detail);
