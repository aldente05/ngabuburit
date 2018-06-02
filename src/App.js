/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Dimensions, Text, View} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'ELVAN GANTENG',
});

type Props = {};
const {width , height} = Dimensions.get('window')
export default class App extends Component<Props> {

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{flex: 1}}>
                    Welcome to akjhsdgkjhas
                </Text>

                <Text style={{flex: 1}}>
                    To get started
                </Text>
                <Text style={{flex: 1 , right: height / 20 * -1, color: 'red'}}>
                    HALO CLOUMNS
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
