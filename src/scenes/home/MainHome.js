/**
 * Created by f.putra on 03/06/18.
 */
import React from 'react';
import {Dimensions, View, Text} from 'react-native';
import {Button} from 'native-base';
import firebase from 'react-native-firebase'

const ACCESS_TOKEN = 'access_token';

export default class Splash extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {currentUser: null}
    }

    componentDidMount() {
        const {currentUser} = firebase.auth()
        this.setState({currentUser})
    }

    async Logout(){
        console.log("LOGOUT")
        firebase.auth().signOut().then(result =>{
            console.log(result)
        })
    }

    render() {
        const { currentUser } = this.state

        return (
            <View>
                <Text>
                    Hi {currentUser && currentUser.email}!
                </Text>
                <Button onPress={this.Logout.bind(this)} style={{alignSelf : 'center', width : '50%', justifyContent : 'center', backgroundColor: 'white', top: '20%'}}>
                    <Text>Logout</Text>
                </Button>
            </View>
        );
    }
}