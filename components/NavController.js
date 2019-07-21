import React, { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useIsLoggedIn, useLogIn, useLogOut } from '../AuthContext';
import AuthNavigation from '../navigation/AuthNavigation';
import TabNavigation from '../navigation/TabNavigation';


export default () => {
    const isLoggedIn = useIsLoggedIn();
    const logIn = useLogIn();
    const logOut = useLogOut();
    console.log(isLoggedIn);
    return (
        <View style={{ flex: "1" }}>
          {isLoggedIn ? <TabNavigation /> : <AuthNavigation />}
        </View>
      )
}
