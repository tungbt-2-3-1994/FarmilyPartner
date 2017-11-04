import React, { PropTypes } from 'react';
import {
    Text,
    Image,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// const propTypes = {
//     marker: PropTypes.object.isRequired,
// };

const CalloutItem = ({ marker }) => {
    return (
        <View style={styles.callout} underlayColor='#dddddd'>
            {/*<Image style={styles.calloutPhoto} source={marker.photo} />*/}
            <Image style={styles.calloutPhoto} source={require('../../img/logo.png')} />
            <View style={styles.textInfo}>
                <Text style={styles.calloutTitle}>{marker.partner.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='location-on' />
                    <Text style={{ marginLeft: 5, fontSize: 10 }}>{marker.address}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='phone' />
                    <Text style={{ marginLeft: 5, fontSize: 10 }}>{marker.partner.phone_number}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='alarm-on' />
                    <Text style={{ marginLeft: 5, fontSize: 10 }}>8:00</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='alarm-off' />
                    <Text style={{ marginLeft: 5, fontSize: 10 }}>21:00</Text>
                </View>
            </View>
        </View>
    );
};

// CalloutItem.propTypes = propTypes;

const styles = {
    callout: {
        flex: 1,
        justifyContent: 'center',
        width: 230,
        height: 130,
        flexDirection: 'row'
    },
    calloutPhoto: {
        flex: 0.3,
        width: 60,
        height: 60,
        padding: 10,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    calloutTitle: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    calloutDescription: {
        fontSize: 10
    },
    textInfo: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 0.7,
        padding: 10
    },
};

export { CalloutItem };