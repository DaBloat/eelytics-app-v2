import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScr from './pages/LoginScr'
import SignupScr from './pages/SignupScr';

const Stack = createStackNavigator()

const tranparent = {...DefaultTheme, 
                    colors: {
                      ...DefaultTheme.colors,
                      card: 'transparent',
                      background: 'transparent'
                    }}

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <Image source={require('./assets/background.png')} style={ styles.backgroundImage}/>
        <NavigationContainer theme={tranparent}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScr}/>
            <Stack.Screen name="Signup" component={SignupScr}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },

})
