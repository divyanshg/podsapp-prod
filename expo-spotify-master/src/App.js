import React, {useEffect, useMemo, useState} from 'react';
import { StatusBar,ToastAndroid } from 'react-native';
import { registerRootComponent } from 'expo';
import AppLoading from 'expo-app-loading';
import { colors, func } from './constants';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
// import { StripeProvider } from '@stripe/stripe-react-native';
// main navigation stack
import Stack from './navigation/Stack';
import AuthStack from './navigation/AuthStack'
import { AuthContext } from './contexts/AuthContext'

async function saveKey(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result
  } else {
    return null
  }
}

async function deleteValue(key){
  await SecureStore.deleteItemAsync(key)
} 

function App() {

  const [currentEpisodeData, setCurrentEpisodeData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [toggleTabBar, _setToogleTabBar] = useState(false) 
  const [user, setUser] = useState(null)
  const [authToken, setAuthToken] = useState(null)

  useEffect(() => {
    (async () => {
      setAuthToken(await getValueFor("token"))
      setUser(await getValueFor("user"))
    })()
  }, [])
  
  const AuthContextMemo = useMemo(() => ({
    login: (email, password) => {
      return new Promise(async(resolve, reject) => {
        const {
          data
        } = await axios.post("http://10.1.1.169:3400/authorize", {
          email,
          password
        })
        if(!data || !data.token) return setAuthToken(null)
        await saveKey("token", data.token)
        console.log(data.user)
        await saveKey("user", JSON.stringify(data.user))
        setAuthToken(data.token)
        setUser(data.user)
        setIsLoading(false)

        resolve(200)
      })
    },
    signUp: async (_user) => {
      const {data} = await axios({
        method: 'POST',
        url: 'http://10.1.1.169:3400/register',
        data:_user
      })
      if(data){
        await saveKey("token", data.token)
        await saveKey("user", JSON.stringify(data.user))
        setAuthToken(data.token)
        setUser(data.user)
        setIsLoading(false)
      }
    },
    logOut: async () => {
      const {status} = await axios({
        method: 'POST',
        url: "http://10.1.1.169:3400/logout",
        data:{
          token:authToken
        }
      })
      if(status && status == 200){
        await deleteValue("token")
        await deleteValue("user")
        setAuthToken(null)
        setUser(null)
        setIsLoading(false)
      }else{
        Toast.show("Unable to logout", Toast.SHORT)
      }
    }
  }))  

  function setToggleTabBar() {
    _setToogleTabBar(!toggleTabBar)
  }

  function changeEpisode(data) {
    setCurrentEpisodeData(data)
  }

  if (isLoading) {
    return (
      <AppLoading
        onError={() => {
          // console.warn
        }}
        onFinish={() => setIsLoading(false)}
        startAsync={func.loadAssetsAsync}
      />
    );
  }

  const publishableKey = "pk_test_51HkmjIAXqvDWfijTQdGBmzLDDaU363oro50bOnUmbqbBGPkKS0pqblcE6poNqNwj9tirVTEvM62VqPZoXywl5FWS008Bqfmvd4"

  return (
    <React.Fragment>
        <StatusBar barStyle="light-content" />
        {/* <StripeProvider publishableKey={publishableKey} merchantIdentifier="merchant.identifier"> */}
          <AuthContext.Provider value={AuthContextMemo}>
            {!authToken || !user ? (
              <AuthStack />
            ): (
              <Stack
                screenProps={{
                  authToken,
                  currentEpisodeData,
                  changeEpisode: changeEpisode,
                  setToggleTabBar: setToggleTabBar,
                  toggleTabBarState: toggleTabBar
                }}
              />
            )}
          </AuthContext.Provider>
        {/* </StripeProvider> */}
    </React.Fragment>
  );
}

registerRootComponent(App);
