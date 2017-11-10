import React, { Component } from 'react';
import {
    Dimensions, View, Text, Image, Button, ActivityIndicator, TouchableOpacity, TextInput, ScrollView, Alert, FlatList
} from 'react-native';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

class CurrentOrder extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#388E3C',
        },
        headerTintColor: 'white',
        headerBackTitle: null,
        headerTitleStyle: { color: 'white', fontFamily: 'Baskerville-BoldItalic', fontSize: 20 },
    }

    state = {
        dataSet: [
            { 'title': 'A', 'data': ['a', 'b', 'c'] },
            { 'title': 'B', 'data': ['as', 'asas'] }
        ]
    }

    componentDidMount() {
        console.log('data', this.props.navigation.state.params.data);
        var exchangeData = [];
        var { data } = this.props.navigation.state.params;
        for (var i = 0; i < data.length; i++) {
            exchangeData.title = data[i].code;
            exchangeData.data = data[i].items;
        }
        // this.setState({
        //     dataSet: exchangeData
        // });
    }


    render() {
        // console.log('dataSet', this.state.dataSet);
        return (
            <ScrollView style={{ flex: 1, marginBottom: 10 }}>
                {this.props.navigation.state.params.data.map((order) => {
                    return (
                        <View key={order.code} style={{  backgroundColor: 'white', borderRadius: 10, borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10, }}>
                                <Text style={{ fontSize: 20 }}>{order.code}</Text>
                                <Text style={{ fontWeight: 'bold' }}>{order.user.name} - {order.user.email}</Text>
                                <Text>Ngày đặt:  {order.created_at}</Text>
                            </View>
                            <View style={{ padding: 10 }}>
                                {order.items.map((item, id) => {
                                    return (
                                        <Text key={id} style={{ fontSize: 14, padding: 3 }}>- {item.vegetables_in_store.vegetable.name}: {item.quantity}</Text>
                                    )
                                })}
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        );
    }
}

export default CurrentOrder;
