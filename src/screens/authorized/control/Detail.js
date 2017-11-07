import React, { Component } from 'react';
import {
    AsyncStorage, Dimensions, Switch, View, Text, Image, Button, ActivityIndicator, TouchableOpacity, TextInput, ScrollView, Alert, Modal
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import io from 'socket.io-client/dist/socket.io';

var e;

const config = {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 10000,
    connect_timeout: 10000
};

const SOCKET_URL = 'http://farm.ongnhuahdpe.com:3000';

const { width, height } = Dimensions.get('window');

const vegetables = ['Rau cải', 'Rau muống', 'Rau cần', 'Rau fake'];

class Detail extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#388E3C',
        },
        headerBackTitle: null,
        headerTintColor: 'white',
        headerTitleStyle: { color: 'white', fontFamily: 'Baskerville-BoldItalic', fontSize: 20 },
        headerRight: <TouchableOpacity style={{ marginRight: 5 }} onPress={() => { e.setModalVisible(true) }}><Icon2 size={20} color='white' name='exchange' /></TouchableOpacity>
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
        modalVisible: false,
        currentVeget: ''
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    constructor(props) {
        super(props);
        e = this;
        this.socket = io.connect(SOCKET_URL, { config });
        this.socket.emit('authenticate', { 'token': this.props.user.auth_token });
        // this.socket.emit('get_device_state', this.props.navigation.state.params.id);
    }

    componentWillUnmount() {
        let { id } = this.props.navigation.state.params;
        this.socket.removeListener(`device_${id}_state`);
        // console.log('asjasga');
        this.save();
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
        this.get();
        this.getCurrentVeget();
        let { id } = this.props.navigation.state.params;
        this.socket.on(`device_${id}_state`, (data) => {
            // let tstr = '{' + data.replace(/\*/g, '\"') + '}';
            // console.log(JSON.parse(tstr));
            // let json = JSON.parse(tstr);
            if (data.NAME == 'LED') {
                this.handleLed(data);
            } else if (data.NAME == 'MOTOR1') {
                this.handleMotor1(data);
            } else if (data.NAME == 'MOTOR2') {
                this.handleMotor2(data);
            } else if (data.NAME == 'MOTOR3') {
                this.handleMotor3(data);
            } else if (data.NAME == 'MOTOR4') {
                this.handleMotor4(data);
            } else if (data.NAME == 'PUMP') {
                this.handlePump(data);
            } else if (data.NAME == 'VALVE') {
                this.handleValve(data);
            } else {
                this.handleData(data);
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
                "time": new Date().getTime(),
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
                "time": new Date().getTime(),
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
                "time": new Date().getTime(),
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
                "time": new Date().getTime(),
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
                "time": new Date().getTime(),
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
                "time": new Date().getTime(),
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
                "time": new Date().getTime(),
            }
        });
    }

    changeVeget = (index) => {
        if (index == 0) {
            this.saveCurrentVeget(0);
            this.setState({ modalVisible: false });
            sendChangeCai = () => {
                this.socket.emit('change_device_state', {
                    'device_id': this.props.navigation.state.params.id,
                    'data': {
                        "Header": "S",
                        "Command": "100",
                        "time": new Date().getTime(),
                    }
                });
            }
        } else if (index == 1) {
            this.saveCurrentVeget(1);
            this.setState({ modalVisible: false });
            sendChangeMuong = () => {
                this.socket.emit('change_device_state', {
                    'device_id': this.props.navigation.state.params.id,
                    'data': {
                        "Header": "S",
                        "Command": "101",
                        "time": new Date().getTime(),
                    }
                });
            }
        } else if (index == 2) {
            this.saveCurrentVeget(2);
            this.setState({ modalVisible: false });
            sendChangeCan = () => {
                this.socket.emit('change_device_state', {
                    'device_id': this.props.navigation.state.params.id,
                    'data': {
                        "Header": "S",
                        "Command": "102",
                        "time": new Date().getTime(),
                    }
                });
            }
        } else {
            this.saveCurrentVeget(3);
            this.setState({ modalVisible: false });
            sendChangeFake = () => {
                this.socket.emit('change_device_state', {
                    'device_id': this.props.navigation.state.params.id,
                    'data': {
                        "Header": "S",
                        "Command": "103",
                        "time": new Date().getTime(),
                    }
                });
            }
        }
    }

    save = async () => {
        try {
            await AsyncStorage.setItem('LED', JSON.stringify(this.state.ledData));
            await AsyncStorage.setItem('PUMP', JSON.stringify(this.state.pumpData));
            await AsyncStorage.setItem('VALVE', JSON.stringify(this.state.valveData));
            await AsyncStorage.setItem('MOTOR1', JSON.stringify(this.state.motor1Data));
            await AsyncStorage.setItem('MOTOR2', JSON.stringify(this.state.motor2Data));
            await AsyncStorage.setItem('MOTOR3', JSON.stringify(this.state.motor3Data));
            await AsyncStorage.setItem('MOTOR4', JSON.stringify(this.state.motor4Data));
            // console.log('save', this.state.ledData);
        } catch (e) {
            console.log(e);
        }
    }

    get = async () => {
        try {
            let led = await AsyncStorage.getItem('LED') || 0;
            let pump = await AsyncStorage.getItem('PUMP') || 0;
            let valve = await AsyncStorage.getItem('VALVE') || 0;
            let motor1 = await AsyncStorage.getItem('MOTOR1') || 0;
            let motor2 = await AsyncStorage.getItem('MOTOR2') || 0;
            let motor3 = await AsyncStorage.getItem('MOTOR3') || 0;
            let motor4 = await AsyncStorage.getItem('MOTOR4') || 0;
            // console.log('asas', led);
            this.setState({
                ledData: JSON.parse(led)
            });
            this.setState({
                pumpData: JSON.parse(pump)
            });
            this.setState({
                valveData: JSON.parse(valve)
            });
            this.setState({
                motor1Data: JSON.parse(motor1)
            });
            this.setState({
                motor2Data: JSON.parse(motor2)
            });
            this.setState({
                motor3Data: JSON.parse(motor3)
            });
            this.setState({
                motor4Data: JSON.parse(motor4)
            });

        } catch (e) {
            console.log('e', e);
        }
    }

    saveCurrentVeget = async (i) => {
        try {
            await AsyncStorage.setItem('CURRENT_VEGET', vegetables[i]);
            this.setState({
                currentVeget: vegetables[i]
            });
        } catch (e) {
            Alert.alert('Lưu rau thất bại');
        }
    }
    getCurrentVeget = async () => {
        try {
            let currentVeget = await AsyncStorage.getItem('CURRENT_VEGET') || vegetables[0];
            this.setState({
                currentVeget: currentVeget
            });
        } catch (e) {
            Alert.alert('Load rau thất bại');
        }
    }


    render() {
        // console.log('this', this.state.data);
        let space = ' ';
        return (
            <View style={{ flex: 1, backgroundColor: '#CACACA' }}>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert("Modal has been closed.") }}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(10, 90, 22, 0.5)' }}>
                        <View style={{ width: 3 * width / 4, height: 2 * height / 5, alignSelf: 'center', backgroundColor: 'white', marginTop: 3 * height / 10 }}>
                            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#388E3C' }}>
                                <Text style={{ color: 'white', fontSize: width / 12 }}>Chọn loại rau</Text>
                            </View>

                            <ScrollView style={{ flex: 0.8 }}>
                                {vegetables.map((veget, i) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            this.changeVeget(i)
                                            {/* console.log('index', i); */ }
                                        }} key={i} style={{ alignItems: 'center', marginTop: 5, borderBottomWidth: 1, borderColor: '#269D83', marginLeft: 0 }}>
                                            <Text style={{ paddingTop: 2, paddingBottom: 2, fontSize: width / 15 }}>{veget}</Text>
                                        </TouchableOpacity>);
                                })}
                            </ScrollView>
                            <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5, backgroundColor: '#388E3C' }} onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Icon1 name='cancel' color='#D53343' size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>
                <ScrollView style={{ flex: 1, margin: 8, backgroundColor: 'white' }}>
                    <Text style={{ fontFamily: 'Cochin', paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}>
                        <Text style={{ color: '#CACACA', fontSize: 14 }} >
                            Sensor Box ID: {space}
                        </Text>
                        <Text numberOfLines={2} style={{ fontWeight: 'bold', color: 'black', fontSize: 17 }}>
                            {this.props.navigation.state.params.sensorId}
                        </Text>
                    </Text>
                    <Text style={{ fontFamily: 'Cochin', paddingTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}>
                        <Text style={{ color: '#CACACA', fontSize: 14 }} >
                            Rau đang trồng: {space}
                        </Text>
                        <Text numberOfLines={2} style={{ fontWeight: 'bold', color: 'black', fontSize: 17 }}>
                            {this.state.currentVeget}
                        </Text>
                    </Text>

                    <View style={{ marginTop: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Cochin', fontSize: width / 12, color: '#388E3C', marginLeft: width / 15 }}>{this.state.data.TEMPERATURE}</Text>
                                <Icon name='ios-thermometer' size={width / 9} color='#388E3C' />
                            </View>
                            <Text style={{ fontFamily: 'Cochin', fontSize: width / 25 }}>°C</Text>
                            <Text style={{ fontSize: width / 30 }}>Nhiệt độ</Text>

                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Cochin', fontSize: width / 12, color: '#388E3C', marginLeft: width / 15 }}>{this.state.data.HUMIDITY}</Text>
                                <Image style={{ width: width / 9, height: width / 9, resizeMode: 'stretch' }} source={require('../../../img/humidity.png')} />
                            </View>
                            <Text style={{ fontFamily: 'Cochin', fontSize: width / 25 }}>%</Text>
                            <Text style={{ fontSize: width / 30 }}>Độ ẩm</Text>

                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Cochin', fontSize: width / 12, color: '#388E3C', marginLeft: width / 15 }}>{this.state.data.pH}</Text>
                                <Image style={{ width: width / 9, height: width / 9, resizeMode: 'stretch' }} source={require('../../../img/pH.jpg')} />
                            </View>
                            <Text style={{ fontFamily: 'Cochin', fontSize: width / 25 }}>°</Text>
                            <Text style={{ fontSize: width / 30 }}>Độ pH</Text>

                        </View>
                    </View>
                    <View style={{ marginTop: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Cochin', fontSize: width / 12, color: '#388E3C', marginLeft: width / 15 }}>{this.state.data.EC}</Text>
                                <Image style={{ width: width / 9, height: width / 9, resizeMode: 'stretch' }} source={require('../../../img/bolt.png')} />
                            </View>
                            <Text style={{ fontFamily: 'Cochin', fontSize: width / 25 }}>mS/cm</Text>
                            <Text style={{ fontSize: width / 30 }}>Độ dẫn điện</Text>

                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#CACACA', justifyContent: 'space-between', width: width / 3 - 6, height: width / 3 - 6, padding: 2 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Cochin', fontSize: width / 12, color: '#388E3C', marginLeft: width / 15 }}>{this.state.data.LUX}</Text>
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
