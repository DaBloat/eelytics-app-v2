import { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Dashboard from './Dashboard'
import Live from './Live'
import Tank from './Tank'
import Account from './Account';
import Log from './Log';

import AnimateIcon from '../components/AnimateIcon';
import Header from '../components/Header';

const Tab = createMaterialTopTabNavigator()

export default function Home({ navigation }) {
    const [routeName, setRouteName] = useState('Dashboard')

    return (
        <SafeAreaProvider>
            <Header title={routeName}/>
            <SafeAreaView style={{ flex:1 }}>
                <Tab.Navigator
                    screenListeners={{
                        state: (e) => {
                            setRouteName(e.data.state.routes[e.data.state.index].name)
                        }
                    }}
                    tabBarPosition='bottom'
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color }) => {
                            let iconName

                            if (route.name === 'Dashboard') {
                                iconName = focused ? 'home' : 'home-outline'
                            } else if (route.name === 'Log') {
                                iconName = focused ? 'file-chart' : 'file-chart-outline'
                            } else if (route.name === 'Live') {
                                iconName = focused ? 'camera-enhance' : 'camera-enhance-outline'
                            } else if (route.name === 'Tank') {
                                iconName = focused ? 'beaker' : 'beaker-outline'
                            } else if (route.name === 'Account') {
                                iconName = focused ? "account" : "account-outline"
                            }

                            return (
                                <AnimateIcon focused={focused}>
                                    <MaterialCommunityIcons name={iconName} size={30} color={color}/>
                                </AnimateIcon>
                            )
                        },
                    tabBarActiveTintColor: 'rgba(0, 122, 255, 1)',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle:{
                        backgroundColor: 'rgba(30, 30, 30, 1)',
                        borderTopColor: 'rgba(0, 122, 255, 1)',
                        borderTopWidth: 1,
                        height: 55
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: 'transparent'
                    },
                    tabBarShowLabel: false
                })}
                >
                    <Tab.Screen name="Dashboard" component={Dashboard}/>
                    <Tab.Screen name="Tank" component={Tank}/>
                    <Tab.Screen name="Live" component={Live}/>
                    <Tab.Screen name="Log" component={Log}/>
                    <Tab.Screen name="Account" component={Account}/>
                </Tab.Navigator>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
