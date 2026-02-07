import { ImageBackground, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScr from './pages/LoginScr'
import SignupScr from './pages/SignupScr';
import Home from './pages/Home';

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
        <StatusBar style="light" backgroundColor="#121212" />
        <SafeAreaView style={{ flex: 1, backgroundColor:'rgba(30, 30, 30, 0.7)'}}>
              <ImageBackground source={require('./assets/background.png')} 
                               resizeMode='cover' 
                               style={styles.backgroundImage}>
                <NavigationContainer theme={tranparent}>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={LoginScr}/>
                    <Stack.Screen name="Signup" component={SignupScr}/>
                    <Stack.Screen name="Home" component={Home}/>
                  </Stack.Navigator>
                </NavigationContainer>
              </ImageBackground>
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex : 1
  },
})
