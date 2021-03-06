/**
 * Created by f.putra on 7/15/17.
 */
import React from 'react';
import PropTypes from 'prop-types'
import {Dimensions, Keyboard, LayoutAnimation, Platform, StyleSheet, View, ViewPropTypes} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        marginTop : height - 420 ^ -1,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

const defaultAnimation = {
    duration: 500,
    create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
    },
    update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 200
    }
};

export default class KeyboardSpacer extends React.Component {
    static propTypes = {
        topSpacing: PropTypes.number,
        onToggle: PropTypes.func,
        style: ViewPropTypes.style,
        dismiss : PropTypes.func
    };

    static defaultProps = {
        topSpacing: 0,
        onToggle: () => null,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            keyboardSpace: height - 420,
            isKeyboardOpened: false
        };
        this._listeners = null;
        this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
        this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
    }

    componentDidMount() {
        const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
        const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
        this._listeners = [
            Keyboard.addListener(updateListener, this.updateKeyboardSpace),
            Keyboard.addListener(resetListener, this.resetKeyboardSpace)
        ];
    }

    componentWillUnmount() {
        this._listeners.forEach(listener => listener.remove());
    }

    updateKeyboardSpace(event) {
        if (!event.endCoordinates) {
            return;
        }

        let animationConfig = defaultAnimation;
        if (Platform.OS === 'ios') {
            animationConfig = LayoutAnimation.create(
                event.duration,
                LayoutAnimation.Types[event.easing],
                LayoutAnimation.Properties.opacity,
            );
        }
        LayoutAnimation.configureNext(animationConfig);

        // get updated on rotation
        // when external physical keyboard is connected
        // event.endCoordinates.height still equals virtual keyboard height
        // however only the keyboard toolbar is showing if there should be one
        const keyboardSpace = (height - event.endCoordinates.screenY);
        this.setState({
            keyboardSpace,
            isKeyboardOpened: true
        }, this.props.onToggle(true, keyboardSpace));
    }

    resetKeyboardSpace(event) {
        let animationConfig = defaultAnimation;
        if (Platform.OS === 'ios') {
            animationConfig = LayoutAnimation.create(
                event.duration,
                LayoutAnimation.Types[event.easing],
                LayoutAnimation.Properties.opacity,
            );
        }
        LayoutAnimation.configureNext(animationConfig);

        this.setState({
            keyboardSpace: height - 420,
            isKeyboardOpened: false
        }, this.props.onToggle(false, 0));
        Keyboard.dismiss();
    }

    render() {
        return (
            <View style={[styles.container, { height: this.state.keyboardSpace }, this.props.style]}/>);
    }
}