/**
 * Created by f.putra on 4/16/17.
 */
import React from 'react';
import {ActivityIndicator, Dimensions, Keyboard, Text, TouchableHighlight, View} from 'react-native';
import {Container, Content, Icon, Input, Item} from 'native-base';
import {onEmail} from './../../utils/EmailValidation'
import firebase from 'react-native-firebase'
import Styles from './../../utils/Style'
import KeyboardSpacer from './../../components/Keyboard';

const ACCESS_TOKEN = 'access_token';

export default class Register extends React.Component {

    static navigationOptions = {
        headerTitle: "REGISTRATION"
    };

    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            referral: "",
            password_confirmation: "",
            errors: "",
            device_token: '',
            invalidEmail: false,
            invalidPassword: false,
            passwordSuccess: false,
            loading: false,
            Emailsuccess: false,
            invalidPasswordConfirm: false,
            passwordSuccessConfirm: false,
            opacityCheckPassConfirm: 0,
            opacityAlertPassConfirm: 0,
            opacityCheckmark: 0,
            opacityCheckPass: 0,
            opacityAlertPass: 0,
            opacityAlert: 0
        }
    }

    async onEmailChange(username) {
        switch (onEmail(username)) {
            case true:
                this.setState({
                    email: username,
                    invalidEmail: false,
                    Emailsuccess: true,
                    opacityAlert: 0,
                    opacityCheckmark: 1,
                });
                break;
            case false :
                this.setState({
                    invalidEmail: true,
                    Emailsuccess: false,
                    opacityAlert: 1,
                    opacityCheckmark: 0,
                });
                break;
        }
    }

    async onChangePassword(password) {
        switch (password.length >= 8) {
            case true:
                this.setState({
                    password: password,
                    invalidPassword: false,
                    passwordSuccess: true,
                    opacityAlertPass: 0,
                    opacityCheckPass: 1
                });
                break;
            case false:
                this.setState({
                    invalidPassword: true,
                    passwordSuccess: false,
                    opacityAlertPass: 1,
                    opacityCheckPass: 0
                });
                break;
        }
    }

    async onChangePasswordConfirm(password) {
        switch (password.length >= 8 && (this.state.password === password)) {
            case true:
                this.setState({
                    password_confirmation: password,
                    invalidPasswordConfirm: false,
                    passwordSuccessConfirm: true,
                    opacityAlertPassConfirm: 0,
                    opacityCheckPassConfirm: 1
                });
                break;
            case false:
                this.setState({
                    invalidPasswordConfirm: true,
                    passwordSuccessConfirm: false,
                    opacityAlertPassConfirm: 1,
                    opacityCheckPassConfirm: 0
                });
                break;
        }
    }

    async onRegisterPressed() {
        const {Emailsuccess, passwordSuccess, passwordSuccessConfirm, email, password} = this.state;
        if (Emailsuccess === true && passwordSuccess === true && passwordSuccessConfirm === true) {
            this.setState({loading: true});
            Keyboard.dismiss();
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => this.props.navigation.navigate('main'))
                .catch(error => this.setState({errorMessage: error.message}))
        }
    }

    clearError() {
        setTimeout(() => {
            this.setState({
                errors: ''
            });
        }, 3000);
    }

    render() {

        return (
            <Container>
                <Content keyboardShouldPersistTaps={'always'}>
                    <View style={Styles.container}>
                        <Text>
                            Please Complete your details,
                        </Text>
                        <Text>
                            Let's Get Started!
                        </Text>
                        <Item success={this.state.Emailsuccess} error={this.state.invalidEmail}
                              style={{width: Dimensions.get('window').width / 1.3}}>
                            <Input
                                onChangeText={(text) => this.onEmailChange(text)}
                                keyboardType={'email-address'}
                                returnKeyType={'next'}
                                autoCapitalize={'none'}
                                style={styles.input} placeholder="Email Address"/>
                            <Icon name='checkmark' style={{opacity: this.state.opacityCheckmark}}/>
                            <Icon name='alert' style={{opacity: this.state.opacityAlert}}/>
                        </Item>
                        <Item success={this.state.passwordSuccess} error={this.state.invalidPassword}
                              style={{width: Dimensions.get('window').width / 1.3}}>
                            <Input
                                onChangeText={(text) => this.onChangePassword(text)}
                                style={styles.input}
                                autoCapitalize={'none'}
                                placeholder="Password"
                                secureTextEntry={true}/>
                            <Icon name='checkmark' style={{opacity: this.state.opacityCheckPass}}/>
                            <Icon name='alert' style={{opacity: this.state.opacityAlertPass}}/>
                        </Item>
                        <Item success={this.state.passwordSuccessConfirm} error={this.state.invalidPasswordConfirm}
                              style={{width: Dimensions.get('window').width / 1.3}}>
                            <Input
                                onChangeText={(text) => this.onChangePasswordConfirm(text)}
                                style={styles.input}
                                placeholder="Confirm Password"
                                autoCapitalize={'none'}
                                secureTextEntry={true}/>
                            <Icon name='checkmark' style={{opacity: this.state.opacityCheckPassConfirm}}/>
                            <Icon name='alert' style={{opacity: this.state.opacityAlertPassConfirm}}/>
                        </Item>

                        <Text style={Styles.error}>{this.state.errors}</Text>

                        {this.state.loading ? <ActivityIndicator size="large"/> :
                            <TouchableHighlight onPress={this.onRegisterPressed.bind(this)}
                                                style={Styles.buttonRegister}>
                                <Text style={Styles.buttonText}>
                                    Register
                                </Text>
                            </TouchableHighlight>}
                    </View>
                </Content>
                <KeyboardSpacer/>
            </Container>
        );
    }
}
const styles = {
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10,
        paddingTop: 80
    },
    input: {
        height: 50,
        width: Dimensions.get('window').width / 1.5,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        alignContent: 'center'
    },
    buttonLogin: {
        height: 45,
        width: Dimensions.get('window').width / 2,
        marginRight: 2,
        borderRadius: 100,
        backgroundColor: '#cf2b5d',
        alignSelf: 'center',
        marginTop: 14,
        justifyContent: 'center'
    },
    buttonTextLogin: {
        fontSize: 20,
        color: '#FFF',
        alignSelf: 'center'
    },
    heading: {
        fontSize: 20,
    },
    error: {
        color: 'red',
        paddingTop: 10
    },
    success: {
        color: 'green',
        paddingTop: 10
    },
    loader: {
        marginTop: 20
    }
};