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
            <View style={styles.textInfo}>
                <Text style={styles.calloutTitle}>{marker.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
                    <Icon name='location-on' />
                    <Text style={{ marginLeft: 5, paddingRight: 5, fontSize: 10 }}>{marker.address}</Text>
                </View>
            </View>
        </View>
    );
};

// CalloutItem.propTypes = propTypes;

const styles = {
    callout: {
        justifyContent: 'center',
        width: 200
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
        padding: 5
    },
};

export { CalloutItem };