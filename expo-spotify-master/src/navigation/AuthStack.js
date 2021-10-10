import React from 'react'
import {
    createAppContainer
} from 'react-navigation';

import {
    createStackNavigator
} from 'react-navigation-stack';

import Main from '../screens/Main';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const Auth = createStackNavigator({Main, Login, Signup},{headerMode: 'none'})

const AuthStack = createAppContainer(Auth)

export default AuthStack