import {
    StyleSheet,
    Dimensions
} from 'react-native';

export const css = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    auth_bg: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    logo: {
        alignSelf: 'center',
        height: 160,
        paddingVertical: 40,
        marginTop: Dimensions.get('window').height / 3 - 110,
        width: 160,
        marginBottom: 40
    },
    auth_content: {
        paddingHorizontal: 30, backgroundColor: 'rgba(233, 235, 238, 0.4)'
    },
    auth_submit: {
        marginTop: 15,
    },
    bottom_button: {
        marginTop: 60,
        marginBottom: 30,
        backgroundColor: 'transparent'
    },
    bottom_info: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5,
    },
});