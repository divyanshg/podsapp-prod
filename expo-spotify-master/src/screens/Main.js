import React from 'react'
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native'

import { colors, gStyle } from '../constants'

function Main({navigation}) {
    return (
       <React.Fragment>
           <View style={gStyle.container}>
                <View style={styles.containerHeader}>
                    <View style={styles.flexHeader}>
                        <Image style={styles.logo} source={require("../assets/icon.png")} />
                    </View>
                </View>
                <View style={{marginTop: 300}}>
                    <Text style={styles.headings}>Awesome podcasts.</Text>
                    <Text style={styles.headings}>Free on podsapp.</Text>
                </View>
                <View style={{marginTop: 200}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.signup}>
                        <Text style={{color: colors.white, fontSize: 16}}>SIGN UP FREE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.login}>
                        <Text style={{color: colors.white}}>LOG IN</Text>
                    </TouchableOpacity>
                </View>
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
    headings:{
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
    logo:{
        height: 89,
        width: 150,
        resizeMode: 'contain'
    },
    signup:{
        borderRadius: 50,
        height: 59,
        width: '90%',
        backgroundColor: colors.brandPrimary,
        alignItems:'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginHorizontal: 20,
        marginVertical: 10
    },
    login: {
        // borderRadius: 50,
        height: 59,
        width: '90%',
        // borderWidth: 2,
        // borderColor: colors.white,
        alignItems:'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginHorizontal: 20,
        marginVertical: 10
    }
})

export default Main
