//Banner ad id android : ca-app-pub-1779923728070374/4945845669
//Interstitial ad id android : ca-app-pub-1779923728070374/1348832695
//native ad android id : ca-app-pub-1779923728070374/6573239210

import React, {useEffect, useState} from 'react'
import { View, Platform} from 'react-native'
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob'
import * as SecureStore from 'expo-secure-store';

function Advertisment({type, setIsChanging}) {

    const BannerAdId = Platform.select({
        "android": "ca-app-pub-1779923728070374/4945845669",
        "ios": ""
    })
    
    const [_isPremium, setIsPremium] = useState(false)
    
    useEffect(() => {
        (async () => {
            let {isPremium} = JSON.parse(await SecureStore.getItemAsync("user"))
            console.log(isPremium)
            setIsPremium(isPremium)
        })
    })

    if(!_isPremium){
        if(type === 'banner'){
            return (
                <AdMobBanner bannerSize="banner" adUnitID={BannerAdId} servePersonalizedAds={true}></AdMobBanner>    
            )
        }else if(type === 'largeBanner'){
            return(
                <AdMobBanner bannerSize="largeBanner" adUnitID={BannerAdId} servePersonalizedAds={false}></AdMobBanner>
            )
        }else if(type === 'medBanner'){
            return(
                <AdMobBanner bannerSize="mediumRectangle" adUnitID={BannerAdId} servePersonalizedAds={false}></AdMobBanner>
            )
        }
    }else{
        return (
            <></>
        )
    }

}

export default Advertisment;
