import React, { Component } from 'react';
import {
    View, Text, Image, TouchableOpacity, TouchableHighlight, Dimensions, ActivityIndicator,
    FlatList, NetInfo, PanResponder, Modal, Alert, Platform, AsyncStorage
} from 'react-native';

import { Button, Badge } from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { CalloutItem } from '../../../components/StoreMap/Callout';

import { getAllStores, getActiveOrder } from '../../../actions';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0222;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

var font = 'baskerville_bold_italic';

const CURRENT_ORDER = 'CURRENT_ORDER';

class AllStore extends Component {

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
            check_temp: false,
            region: {
                latitude: 21.029989,
                longitude: 105.836119,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15
            },
            markers: [],
            animating: true,
            badge: 0,
            currentOrder: []
        }
    }

    componentWillMount() {
        this.props.getAllStores();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            animating: nextProps.loadingStores,
        });
        if (nextProps.loadingStores == false) {
            this.setState({
                markers: nextProps.stores
            });
        }
        if (nextProps.orderLoading == false) {
            console.log('');
            if (nextProps.activeOrder.length != 0) {
                this.setState({
                    badge: this.state.badge + nextProps.activeOrder.length,
                    currentOrder: nextProps.activeOrder.concat(this.state.currentOrder)
                });
            }
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.props.getActiveOrder();
        }, 5000);
        // NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
    }

    // componentWillUnmount() {
    //     NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
    // }

    // _handleConnectionChange = (isConnected) => {
    //     console.log('e', isConnected);
    //     this.props.connectionState(isConnected);
    // };

    renderMakers() {
        markers = [];
        this.state.markers.map((marker) => {
            var latlng = {
                'latitude': marker.latitude,
                'longitude': marker.longitude
            }
            markers.push(
                <MapView.Marker
                    key={marker.latitude}
                    title={marker.title}
                    description={marker.description}
                    coordinate={latlng}
                >
                    {Platform.OS === 'ios' &&
                        <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={require('../../../img/store.png')}>
                        </Image>}
                    {Platform.OS === 'android' &&
                        <Image style={{ width: 30, height: 30, resizeMode: 'contain' }}
                            onLoad={() => this.forceUpdate()}
                            onLayout={() => this.forceUpdate()}
                            source={require('../../../img/store.png')}>
                            <Text style={{ width: 0, height: 0 }}>{Math.random()}</Text>
                        </Image>}

                    <MapView.Callout onPress={() => this.props.navigation.navigate('DetailStore', { marker })}>
                        <CalloutItem marker={marker} />
                    </MapView.Callout>
                </MapView.Marker>
            );
        })
        return markers;
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    ref='map'
                    provider={PROVIDER_GOOGLE}
                    initialRegion={this.state.region}
                    style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                    {this.state.animating == false && this.renderMakers()}
                </MapView>
                {this.state.animating &&
                    < ActivityIndicator
                        size='large'
                        color='red'
                        style={styles.activityIndicator}
                    />}
                <TouchableOpacity style={{ position: 'absolute', top: 15, right: 15 }}
                    onPress={() => {
                        if (this.state.badge == 0) {
                            Alert.alert('Bạn không có thông báo');
                        } else {
                            this.setState({
                                badge: 0
                            });
                            this.props.navigation.navigate('CurrentOrder', { 'data': this.state.currentOrder });
                        }
                    }}>
                    {this.state.badge == 0 ?
                        <Icon name='ios-notifications' size={40} color='white' />
                        :
                        <Icon name='ios-notifications' size={40} color='green' />}
                    {this.state.badge == 0 ?
                        <View style={{ backgroundColor: 'transparent', position: 'absolute', top: -5, right: -5, padding: 3 }}><Text style={{ color: 'rgba(52, 52, 52, 0.2)', fontSize: 20 }}>{this.state.badge}</Text></View>
                        :
                        <View style={{ backgroundColor: 'red', position: 'absolute', top: -5, right: -5, borderRadius: 20, padding: 3 }}><Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{this.state.badge}</Text></View>
                    }

                </TouchableOpacity>
            </View >
        );
    }
}

const styles = {
    activityIndicator: {
        position: 'absolute', top: 0, left: 0,
        right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'
    },
    container: {
        flex: 1,
    },
};

const mapStateToProps = (state) => {
    console.log('state', state.activeOrder);
    return ({
        user: state.userInfor,
        stores: state.store.stores,
        loadingStores: state.store.loading,
        activeOrder: state.activeOrder.activeOrder,
        orderLoading: state.activeOrder.loading
    });
}

export default connect(mapStateToProps, { getAllStores, getActiveOrder })(AllStore);
