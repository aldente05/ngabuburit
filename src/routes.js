/**
 * Created by f.putra on 02/06/18.
 */

import {StackNavigator} from 'react-navigation';

const splashNavigation = StackNavigator({
    splash: {
        screen: require('./scenes/Splash').default,
    },
    //
    // main: {
    //     screen: TabBottom,
    // },
});

export default splashNavigation;
