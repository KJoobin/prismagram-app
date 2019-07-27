import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { AsyncStorage } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import  ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo-hooks'
import apolloClientOptions from './apollo';
import { ThemeProvider } from 'styled-components'
import styles from './styles';
import NavController from './components/NavController';
import { AuthProvider } from './AuthContext';
import AuthNavigation from './navigation/AuthNavigation';


export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  //App 이 시작되기전에 로드되어야할 ( Icon, font , img ... )
  const preLoad = async () => {
    // AsyncStorage.clear();
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync(require("./assets/logo.png"))
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        request: async operation => {
          const token = await AsyncStorage.getItem("token");
          console.log(token);
          return operation.setContext({
            headers: { Authorization: `Bearer ${token}` }
          })
        },
        ...apolloClientOptions
      });
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if(isLoggedIn === null || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client)
    } catch(e) {
      console.log(e);
    }
  };
  useEffect( () => {
    preLoad();
  }, []);





  return loaded && client && isLoggedIn !== null?
    (
      <ApolloProvider client={client}>
        <ThemeProvider theme={styles}>
          <AuthProvider isLoggedIn={isLoggedIn} >
            <NavController />
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    ) :
    (
      <AppLoading />
    )
}
