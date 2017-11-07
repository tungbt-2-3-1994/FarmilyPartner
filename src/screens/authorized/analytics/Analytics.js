import React, { Component } from 'react';
import { View, Dimensions, Text } from 'react-native';
import ChartView from 'react-native-highcharts';

const { width, height } = Dimensions.get('window');

class Analytics extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#388E3C',
        },
        headerBackTitle: null,
        headerTitleStyle: { color: 'white', fontFamily: 'Baskerville-BoldItalic', fontSize: 20 },
    }

    render() {
        const Highcharts = 'Highcharts';
        const conf = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
            },
            title: {
                text: 'Thống kê thu nhập của tất cả các cửa hàng'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    // showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: '',
                    y: 56.33
                }, {
                    name: 'Chrome',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Firefox',
                    y: 10.38
                }, {
                    name: 'Safari',
                    y: 4.77
                }, {
                    name: 'Opera',
                    y: 0.91
                }, {
                    name: 'Other',
                    y: 0.2
                }]
            }]
        };
        return (
            <View style={{ flex: 1 }}>
                <ChartView style={{ flex: 1, backgroundColor: 'white' }} config={conf} />
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: height / 3, backgroundColor: 'rgba(100, 23, 44, 0.2)' }}>
                    <Text>asasfas</Text>
                </View>
            </View>
        );
    }
}

export default Analytics;
