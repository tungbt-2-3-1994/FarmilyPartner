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
                    name: 'Rau muống',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Rau cải thìa',
                    y: 10.38
                }, {
                    name: 'Rau cải xoăn',
                    y: 4.77
                }, {
                    name: 'Cải tím',
                    y: 0.91
                }, {
                    name: 'Các loại khác',
                    y: 0.2
                }]
            }]
        };
        return (
            <View style={{ flex: 1 }}>
                <ChartView style={{ flex: 1, backgroundColor: 'white' }} config={conf} />
            </View>
        );
    }
}

export default Analytics;
