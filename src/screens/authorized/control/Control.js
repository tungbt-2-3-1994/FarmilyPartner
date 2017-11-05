import React, { Component } from 'react';
import {
    Switch, View, Text, Image, Button, ActivityIndicator, TouchableOpacity, TextInput, ScrollView, Alert, FlatList, Dimensions
} from 'react-native';
import { connect } from 'react-redux';
// import SocketIOClient from 'socket.io-client';

import { getAllDevices } from '../../../actions';

const { height, width } = Dimensions.get('window');

const STATION = 'devices';
const STORE = 'device';

// import { socket } from '../../Socket';

class Control extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#388E3C',
        },
        headerBackTitle: null,
        headerTitleStyle: { color: 'white', fontFamily: 'Baskerville-BoldItalic', fontSize: 20 },
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        // socket.emit('authenticate', { 'token': this.props.user.auth_token });
    }

    componentWillReceiveProps(nextProps) {
        // if (!nextProps.loading) {
        // this.socket.on('device_1_state', (data) => {
        //     console.log('data', data);
        // });
        // }

    }

    componentWillMount() {
        this.props.getAllDevices(this.props.user.user.id);
    }

    emptyListComponent() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontFamily: 'Baskerville-BoldItalic', fontSize: 20 }}>Bạn chưa có thiết bị nào</Text>
            </View>)
    }

    onItemPress = (id, sensorId) => {
        this.props.navigation.navigate('Detail', { 'id': id, "sensorId": sensorId });
    }

    onButtonPress = () => {
        console.log('asasas');
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#D2D2D2' }}>
                <FlatList
                    data={this.props.store[STATION]}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => this.onItemPress(item.id, item.identify_code)} style={styles.flatItem} >
                            <Text style={styles.name}> {item.name.toUpperCase()}</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 10 }}>
                                <Text style={{ flex: 0.2 }}>Cửa hàng</Text>
                                <Text style={{ flex: 0.05 }}>:</Text>
                                <Text style={{ flex: 0.75, fontWeight: 'bold' }}>{this.props.store.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 10 }}>
                                <Text style={{ flex: 0.2 }}>Địa chỉ</Text>
                                <Text style={{ flex: 0.05 }}>:</Text>
                                <Text style={{ flex: 0.75, fontWeight: 'bold' }}>{this.props.store.address}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 10 }}>
                                <Text style={{ flex: 0.2 }}>Mã số</Text>
                                <Text style={{ flex: 0.05 }}>:</Text>
                                <Text style={{ flex: 0.75, fontWeight: 'bold' }}>{item.identify_code}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={this.emptyListComponent.bind(this)}
                />
            </View>
        );
    }
}

const styles = {
    flatItem: {
        borderRadius: 10, borderColor: '#FFFF', backgroundColor: '#FFFF', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'space-between',
        marginTop: 10,
        marginLeft: 10, marginRight: 10,
        padding: 7,
    },
    name: {
        fontFamily: 'Baskerville-Bold',
        fontSize: 30,
        color: 'green',
        alignSelf: 'center'

    }
}

const mapStateToProps = (state) => {
    // console.log(state.device);
    return ({
        loggedIn: state.userInfor.loggedIn,
        user: state.userInfor.user,
        store: state.partner[STORE],
        loading: state.partner.loading
    });
}

export default connect(mapStateToProps, { getAllDevices })(Control);
