/**
 * Created by f.putra on 4/16/17.
 */
import React from 'react';
import {ActivityIndicator, Dimensions, Keyboard, LayoutAnimation, Text, TouchableHighlight, View} from 'react-native'
import {Container, Content, Icon, Input, Item} from 'native-base'
import KeyboardSpacer from '../../components/Keyboard'
import firebase from 'react-native-firebase'
import {onEmail} from './../../utils/EmailValidation'

export default class Login extends React.Component {

    /**
     * ini adalah state navigation
     * @type {{headerTitle: string}}
     */
    static navigationOptions = {
        headerTitle: "LOGIN"
    };

    /**
     * State bisa dibilang adalah variabel default yang dimiliki suatu component yang nilainya dapat diubah-ubah
     * dan nilai pada state harus didefinisikan terlebih dahulu pada constructor suatu component
     *
     * pelajaran lebih lanjutnya bisa dicari menggunakan kata kunci props dan state
     */
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            invalidEmail: false,
            invalidPassword: false,
            passwordSuccess: false,
            loading: false,
            Emailsuccess: false,
            opacityCheckmark: 0,
            opacityCheckPass: 0,
            opacityAlertPass: 0,
            opacityAlert: 0,
            disableEmail: false,
            disablePassword: false,
            isAuthenticated: false,
        };
    }

    /**
     * ini adalah function asynchronous yang di buat sesuai kebutuhan
     * berikut adalah method email check saat typeing
     * @param username
     * @returns {Promise<void>}
     */
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

    /**
     * yang ini saat ketik password
     * @param password
     * @returns {Promise<void>}
     */
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

    /**
     * yang ini saat klik tombol login
     * @returns {Promise<void>}
     */
    async onLoginPressed() {

        /**
         * ini adalah cara mengambil state yang baik.
         */
        const {email, password, Emailsuccess, passwordSuccess} = this.state;

        if (email === '' || password === '') {
            return;
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        /**
         * ini adalah cara set state pada constructor diatas
         */
        this.setState({
            loading: true,
            disableEmail: true,
            disablePassword: true
        });

        if (Emailsuccess === true && passwordSuccess === true) {
            Keyboard.dismiss();
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => this.props.navigation.navigate('main'))
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    }

    async forgotPassword() {
        this.props.navigation.navigate('forgotPassword');
    }

    clearError() {
        setTimeout(() => {
            this.setState({
                error: "",
                loading: false
            });
        }, 5000);
    }

    render() {
        return (
            <Container>
                <Content keyboardShouldPersistTaps={'always'}>
                    <View style={styles.container}>
                        <Text style={styles.heading}>
                            Welcome
                        </Text>
                        <Item success={this.state.Emailsuccess} error={this.state.invalidEmail}
                              style={{width: Dimensions.get('window').width / 1.3}}>
                            <Input
                                onChangeText={(text) => this.onEmailChange(text)}
                                keyboardType={'email-address'}
                                autoCapitalize={'none'}
                                style={styles.input} placeholder="Email"/>
                            <Icon name='checkmark' style={{opacity: this.state.opacityCheckmark}}/>
                            <Icon name='alert' style={{opacity: this.state.opacityAlert}}/>
                        </Item>
                        <Item success={this.state.passwordSuccess} error={this.state.invalidPassword}
                              style={{width: Dimensions.get('window').width / 1.3}}>
                            <Input
                                onChangeText={(text) => this.onChangePassword(text)}
                                style={styles.input}
                                placeholder="Password"
                                autoCapitalize={'none'}
                                secureTextEntry={true}/>
                            <Icon name='checkmark' style={{opacity: this.state.opacityCheckPass}}/>
                            <Icon name='alert' style={{opacity: this.state.opacityAlertPass}}/>
                        </Item>

                        {this.state.loading ?
                            <View style={styles.containerLoading}>
                                <ActivityIndicator color='#cf2b5d' size="large"/>
                            </View> :
                            <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.buttonLogin}>
                                <Text style={styles.buttonTextLogin}>
                                    Login
                                </Text>
                            </TouchableHighlight>}

                        <TouchableHighlight style={{marginTop: 10}} onPress={this.forgotPassword.bind(this)}>
                            <Text style={{color: '#304FFE'}}>
                                Forgot Password?
                            </Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={{marginTop: 10}} onPress={() => this.props.navigation.navigate('signup')}>
                            <Text style={{color: '#304FFE'}}>
                                Don't have an account? Sign Up
                            </Text>
                        </TouchableHighlight>

                        <Text style={styles.error}>
                            {this.state.error}
                        </Text>
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
    containerLoading: {
        height: 45,
        width: Dimensions.get('window').width / 2,
        marginRight: 2,
        borderRadius: 100,
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
