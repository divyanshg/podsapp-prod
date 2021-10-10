import React, { useContext, useState } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, TextInput, Image } from 'react-native'
import { gStyle, colors } from '../constants';

import { AuthContext } from '../contexts/AuthContext';

function Login() {

    const [username, onChangeUsername] = useState("")
    const [password, onChangePassword] = useState("")

    const { login } = useContext(AuthContext)

    const loginCheck = async () => {
        if(username.length == 0 && password.length == 0) return
        const result = await login(username, password)
        if(result != 200){
            return "login failed"
        }
    }

    return (
        <React.Fragment>
            <View style={styles.mainCont}>
                <Image style={styles.logo} source={require("../assets/icon.png")} />
                <TextInput style={styles.textInputs} onChangeText={onChangeUsername} value={username} placeholder="Username or Phone Number"/>
                <TextInput secureTextEntry={true} style={styles.textInputs} onChangeText={onChangePassword} value={password} placeholder="Password"/>
                <TouchableHighlight style={styles.login} onPress={() => {loginCheck()}}>
                    <Text style={{color: colors.white, fontSize: 16}}>LOG IN</Text>
                </TouchableHighlight>
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    login: {
        borderRadius: 50,
        height: 59,
        width: '90%',
        backgroundColor: colors.brandPrimary,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginHorizontal: 20,
        marginVertical: 10
    },
    mainCont:{
        backgroundColor: colors.black,
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        height: 89,
        width: 200,
        resizeMode: 'contain'
    },
    textInputs: {
        borderRadius: 50,
        height: 64,
        width: '90%',
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        backgroundColor: colors.white,
    }
})

export default Login;
