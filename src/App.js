/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
import Routes from './routes';

type Props = {};
const {width, height} = Dimensions.get('window')
export default class App extends Component<Props> {

    render() {
        return (
            <View style={{flex: 1}}>
                <Routes/>
            </View>
        );
    }
}