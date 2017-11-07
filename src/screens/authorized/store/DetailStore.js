import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList, ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import { Infor } from '../../../components/StoreMap/Infor';
import { getStoreById } from '../../../actions';

const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 150;
const STICKY_HEADER_HEIGHT = 50;
const AVATAR_SIZE = 120;


class DetailStore extends Component {

    state = {
        uri: ''
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#388E3C',
        },
        headerBackTitle: null,
        headerTintColor: 'white',
        headerTitleStyle: { color: 'white', fontFamily: 'Baskerville-BoldItalic', fontSize: 20 },
        // headerBackTitleStyle: { color: 'white', fontFamily: 'Baskerville-BoldItalic', fontSize: 16 },
    }

    componentDidMount() {
        // console.log('params', this.props.navigation.state.params.marker);
        const { id } = this.props.navigation.state.params.marker;
        this.props.getStoreById(id);
    }

    renderForeground() {
        const { images } = this.props.navigation.state.params.marker;
        return (
            <View style={styles.foreground}>
                {images.length !== 0 ? (
                    <Image source={{ uri: 'http://farm.ongnhuahdpe.com'.concat(images[0].src) }} style={{ width: window.width, height: PARALLAX_HEADER_HEIGHT, resizeMode: 'stretch' }} />
                ) : (
                        <Image source={require('../../../img/storef.jpg')} style={{ width: window.width, height: PARALLAX_HEADER_HEIGHT, resizeMode: 'stretch' }} />
                    )}
            </View>
        );
    }

    componentWillReceiveProps(nextProps) {
    }


    renderBackground() {
        return (
            <View style={styles.foreground}>

            </View>
        );
    }

    renderStickyHeader() {
        return (
            <View key='sticky-header' style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{this.props.navigation.state.params.marker.name}</Text>
            </View>
        );
    }

    emptyListComponent() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ActivityIndicator
                    color='red'
                    size="large"
                />
            </View>)
    }

    render() {
        const { onScroll = () => { } } = this.props;
        const { marker } = this.props.navigation.state.params;
        return (
            <View style={{ flex: 1 }}>
                <ParallaxScrollView
                    onScroll={onScroll}
                    stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    backgroundSpeed={10}
                    renderBackground={this.renderBackground.bind(this)}
                    renderForeground={this.renderForeground.bind(this)}
                    renderStickyHeader={this.renderStickyHeader.bind(this)}
                >
                    <View style={styles.container}>
                        <View style={{ backgroundColor: '#FFFFFF', marginTop: 5 }}>
                            <Text style={styles.text}>Thông tin cửa hàng</Text>
                            <Infor infor={marker.address} icon='location-on' />
                            <Infor infor={marker.info} icon='info-outline' />
                            <Infor infor={marker.phone_number} icon='phone' />
                        </View>
                        <View style={{ backgroundColor: '#FFFFFF', marginTop: 5, paddingRight: 3, paddingLeft: 3 }}>
                            <Text style={styles.text}>Các loại sản phẩm</Text>
                            <FlatList
                                style={{ marginTop: 10 }}
                                data={this.props.detailStore.vegetables}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.flatItem}>
                                        {/* {item.images.length !== 0 ?
                                            <Image source={{ uri: item.images[0] }} style={styles.flatItemFood} />
                                            :
                                            <Image source={require('../../../img/noImage.jpg')} style={styles.flatItemFood} />
                                        } */}
                                        <Image source={require('../../../img/noImage.jpg')} style={styles.flatItemFood} />
                                        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(52, 52, 52, 0.1)' }}>
                                            <Text style={{ margin: 2, textAlign: 'center', color: '#319C46', fontFamily: 'BodoniSvtyTwoOSITCTT-Bold' }}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.id}
                                horizontal={false}
                                numColumns={3}
                                ListEmptyComponent={this.emptyListComponent.bind(this)}
                            />
                        </View>
                    </View>
                </ParallaxScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#DEDEDE'
    },
    text: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#7F3355'
    },
    icon: {
        width: 26,
        height: 26,
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: window.width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFF",

    },
    stickySectionText: {
        color: '#21610B',
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
        fontFamily: 'AvenirNext-HeavyItalic'
    },
    foreground: {
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D2D2D2',
    },
    flatItem: {
        height: (window.width - 20) / 3,
        borderRadius: 5,
        borderColor: '#D2D2D2',
        borderWidth: 2,
        alignItems: 'center',
        flex: 1,
        margin: 2
    },
    flatItemFood: {
        width: (window.width - 40) / 3,
        height: (window.width - 40) / 3,
        borderRadius: (window.width - 30) / 6,
        resizeMode: 'contain',
    }
};

const mapStateToProps = (state) => {
    return ({
        userInfor: state.userInfor.userLocation,
        stores: state.store.stores,
        loadingStores: state.store.loading,
        detailStore: state.detailStore.storeById
    });
}

export default connect(mapStateToProps, { getStoreById })(DetailStore);
