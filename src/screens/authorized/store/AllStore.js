import React, { Component } from 'react';
import {
    View, Text, Image, TouchableOpacity, TouchableHighlight, Dimensions, ActivityIndicator,
    FlatList, NetInfo, PanResponder, Modal, Alert, Platform
} from 'react-native';

import { connect } from 'react-redux';

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import Icon from 'react-native-vector-icons/MaterialIcons';

import { CalloutItem } from '../../../components/StoreMap/Callout';

import { getAllStores } from '../../../actions';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0222;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

var font = 'baskerville_bold_italic';

class AllStore extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#388E3C',
        },
        headerBackTitle: null,
        headerTitleStyle: { color: 'white', fontFamily: 'Baskerville-BoldItalic', fontSize: 20 }
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
        }
        // this._handleConnectionChange = this._handleConnectionChange.bind(this);
    }

    // moveMapToLocation(latlng) {
    //     this.refs.map.animateToRegion({
    //         latitudeDelta: 0.015,
    //         longitudeDelta: 0.015,
    //         ...latlng
    //     }, 2000);
    // }

    // componentWillMount() {
    //     this.props.getAllStores(this.props.user.user.id);
    //     this.panResponder = PanResponder.create({
    //         onStartShouldSetPanResponder: (event, gestureState) => true,
    //         onPanResponderGrant: this._onPanRespondGrant.bind(this),
    //     });
    // }

    // _onPanRespondGrant(event, gestureState) {
    //     // console.log('locationX', event.nativeEvent.locationX);
    //     // console.log('pageX', event.nativeEvent.pageX);
    //     if (event.nativeEvent.locationX === event.nativeEvent.pageX) {
    //         this.setState({ toogle: false });
    //     }
    // }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         animating: nextProps.loadingStores.loading,
    //     });
    //     // if (nextProps.loadingGeo == false) {
    //     //     var { coords } = nextProps.userInfor;
    //     //     this.setState({
    //     //         region: {
    //     //             latitude: coords.latitude,
    //     //             longitude: coords.longitude,
    //     //             latitudeDelta: LATITUDE_DELTA,
    //     //             longitudeDelta: LONGITUDE_DELTA
    //     //         }
    //     //     });
    //     // }
    //     // if (nextProps.loadingStores.loading == false) {
    //     //     this.setState({
    //     //         markers: nextProps.stores
    //     //     });
    //     // }
    // }

    // componentDidMount() {
    //     NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
    // }

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
                    onPress={() => this.onMarkerPress(marker)}
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

                    <MapView.Callout onPress={() => this.props.navigation.navigate('StoreDetail', { marker })}>
                        <CalloutItem marker={marker} />
                    </MapView.Callout>
                </MapView.Marker>
            );
        })
        return markers;
    }

    /*  */

    onMarkerPress = (marker) => {
        // let startPos = this.props.userInfor.coords.latitude + ',' + this.props.userInfor.coords.longitude;
        // let endPos = marker.latitude + ',' + marker.longitude;
        // // console.log(startPos, endPos);
        // this.getDirections(startPos, endPos);
        this.moveMapToLocation({ 'latitude': marker.latitude, 'longitude': marker.longitude });
    }

    // onClearSearching() {
    //     // console.log('aa');
    //     this.setState({
    //         text: ''
    //     });
    // }

    // toogleNearby() {
    //     this.setState({
    //         toogle: !this.state.toogle
    //     });
    //     this.props.getNearByStore(this.state.region.latitude, this.state.region.longitude);
    // }

    // toogleAll() {
    //     this.setState({
    //         toogle: false
    //     });
    //     this.props.getAllStores();
    // }

    // clickItem(item) {
    //     this.setState({
    //         toogle: false
    //     });
    //     let start = this.props.userInfor.coords.latitude + ',' + this.props.userInfor.coords.longitude;
    //     let end = item.latitude + ',' + item.longitude;
    //     this.getDirections(start, end);
    //     this.moveMapToLocation({ 'latitude': item.latitude, 'longitude': item.longitude });
    // }

    // async getDirections(startLoc, destinationLoc) {
    //     try {
    //         let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
    //         let respJson = await resp.json();
    //         let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    //         let coords = points.map((point, index) => {
    //             return {
    //                 latitude: point[0],
    //                 longitude: point[1]
    //             }
    //         })
    //         this.setState({ coords: coords })
    //         return coords
    //     } catch (error) {
    //         Alert.alert(
    //             'Thông báo',
    //             'Có lỗi xảy ra khi tìm đường. Tìm kiếm lại',
    //             [
    //                 { text: 'Ok', onPress: () => this.getDirections(startLoc, destinationLoc) },
    //             ],
    //             { cancelable: false }
    //         );
    //         return error;
    //     }
    // }

    emptyListComponent() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontFamily: 'Baskerville-BoldItalic', fontSize: 20 }}>Có lỗi khi tìm các cửa hàng quanh bạn</Text>
            </View>)
    }

    render() {
        // console.log('render', this.state.animating);
        // var latlng = {
        //     latitude: this.state.region.latitude,
        //     longitude: this.state.region.longitude
        // }

        return (
            <View style={styles.container}>
                <MapView
                    ref='map'
                    provider={PROVIDER_GOOGLE}
                    initialRegion={this.state.region}
                    style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                    {/* {this.renderMakers()} */}
                </MapView>
                {/* {!this.props.isConnected.isConnected &&
                    <View style={styles.activityIndicator}>
                        <Text>Loading</Text>
                    </View>
                } */}
            </View >
        );
    }
}

const styles = {
    floatingBtn: { justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 10, bottom: 10, width: width / 7, height: width / 7, borderRadius: width / 14, backgroundColor: 'rgba(255, 0, 0, 0.3)' },
    floatingBtn2: { justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 10, bottom: 20 + width / 7, width: width / 7, height: width / 7, borderRadius: width / 14, backgroundColor: 'rgba(255, 0, 0, 0.3)' },
    flItem: { flex: 1, width: width, height: 40, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    activityIndicator: {
        position: 'absolute', top: 0, left: 0,
        right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'
    },
    container: {
        flex: 1,
    },
    text: {
        color: 'red'
    },
    icon: {
        width: 26,
        height: 26,
    },
    pin: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pinText: {
        color: 'red'
    },
    searchBox: {
        position: 'absolute',

    },
    flatList: {
        position: 'absolute',
        top: 50,
        margin: 15,
        backgroundColor: "#fff",
        opacity: 0.9,
    }
};

const mapStateToProps = (state) => {
    console.log('state', state);
    return ({
        user: state.userInfor,
        // stores: state.store.stores,
        // loadingStores: state.store,
    });
}

export default connect(mapStateToProps, { getAllStores })(AllStore);
