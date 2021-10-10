import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import {gStyle, colors} from '../constants'

function Signup() {
    return (
        <React.Fragment>
            <View style={gStyle.container}>
                <View style={styles.containerHeader}>
                    <View style={styles.flexHeader}>
                        <Image style={styles.logo} source={require("../assets/icon.png")} />
                    </View>
                </View>
                <TextInput style={styles.textInputs} onChangeText={onChangeUsername} value={username} placeholder="Username or Phone Number"/>
                <TextInput secureTextEntry={true} style={styles.textInputs} onChangeText={onChangePassword} value={password} placeholder="Password"/> 
           </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    flexHeader: {
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    headerHeading: {
        color: colors.white,
        fontSize: 40,
    },
    headings: {
        color: colors.white,
        fontSize: 32,
        marginHorizontal: 20
    },
    containerHeader: {
        alignItems: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginHorizontal: 5,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 10
    },
    logo: {
        height: 89,
        width: 150,
        resizeMode: 'contain'
    },
})

export default Signup;
