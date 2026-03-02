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
import SettingMenu from '../components/SettingMenu';

const Tab = createMaterialTopTabNavigator()

export default function Home({ navigation, route }) {
    const [routeName, setRouteName] = useState('Dashboard')
    const [isMenu, setMenu] = useState(false)
    const { baseUrl } = route.params

    const toggleMenu = () => {
        setMenu(!isMenu)
    }

    return (
        <SafeAreaProvider>
            <Header title={routeName} seeMenu={toggleMenu}/>
            <SettingMenu state={isMenu} setState={toggleMenu}/>
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
                    <Tab.Screen name="Dashboard" component={Dashboard} initialParams={{ baseUrl }}/>
                    <Tab.Screen name="Tank" component={Tank} initialParams={{ baseUrl }}/>
                    <Tab.Screen name="Live" component={Live} initialParams={{ baseUrl }}/>
                    <Tab.Screen name="Log" component={Log} initialParams={{ baseUrl }}/>
                    <Tab.Screen name="Account" component={Account} initialParams={{ baseUrl }}/>
                </Tab.Navigator>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
