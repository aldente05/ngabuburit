/**
 * Created by f.putra on 4/16/17.
 */
import React from 'react';
import {Dimensions, ImageBackground} from 'react-native';
import firebase from 'react-native-firebase'

const ACCESS_TOKEN = 'access_token';

export default class Splash extends React.Component {

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            setTimeout(() => {
                this.props.navigation.navigate(user ? 'main' : 'login')
            }, 2000);
        })
    }

    render() {
        return (
            <ImageBackground source={require('../assets/hello-kitty-bg.png')} style={customStyles.splash}>
                {/*<Image source={require('../../resources/logo.png')} style={{height: '40%', alignSelf:'center'}}*/}
                {/*resizeMode={'contain'}/>*/}
            </ImageBackground>
        );
    }
}

const customStyles = {
    splash: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignContent: 'center'
    }
};