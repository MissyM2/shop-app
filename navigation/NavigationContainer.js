import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import ShopNavigator from '../navigation/ShopNavigator';

const NavigationContainer = props => {
    // a way for you to access a component directly
    // here we have shopnavigator returned but we need to get access to it before it is rendered
    // so we can navigate to the auth screen
    const navRef = useRef();
    const isAuth = useSelector(state => !!state.auth.token);

    useEffect (() => {
        if (!isAuth) {
            navRef.current.dispatch(
                NavigationActions.navigate({ routeName: 'Auth'})
            );
        }
    }, [isAuth]);
    
    return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;