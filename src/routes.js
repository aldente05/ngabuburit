/**
 * Created by f.putra on 02/06/18.
 */
import {StackNavigator} from 'react-navigation';

/**
 * pemakaian routing untuk stack navigator ini langsung menuju pada view yang di route,
 * tidak ada bottom tab atau navigation drawer.
 * pemakaiannya langsung pada screen dibawah, lihat file screen untuk routingnya.
 * disini konfigurasi routingnya.
 */
const splashNavigation = StackNavigator({
    splash: {
        screen: require('./scenes/Splash').default,
    },

    login : {
        screen: require('./scenes/credentials/Login').default,
    },

    signup : {
        screen: require('./scenes/credentials/Registration').default,
    },

    main :{
        screen: require('./scenes/home/MainHome').default,
    }
});

export default splashNavigation;
