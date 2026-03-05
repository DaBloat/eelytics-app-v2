import { View, Text, TouchableOpacity, Animated, StyleSheet, Image } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
 
export default function Tank({ route }){
    const animatedLevel = useRef(new Animated.Value(0)).current
    const [tankStatus, setTankStatus] = useState({'action' : "NONE", 'water_level': 0})
    const [tankControl, setTankControl] = useState({"mode": 'NONE', "maintain": 10})
    const { baseUrl } = route.params

    const tankStatusColor = (info) => {
        if (info === 'water_level') {
            let upper = tankControl.maintain + 0.2
            let lower = tankControl.maintain - 0.2
            if ( lower <= tankStatus.water_level && tankStatus.water_level <= upper) {
                return '#00FF41'
            }
            else {
                return '#FF3131'
            }
        }
        if (info === 'action') {
            if (tankStatus.action === 'FILLING') {
                return '#00FF41'
            }
            if (tankStatus.action === 'DRAINING') {
                return '#FF3131'
            }
            else {
                return 'white'
            }
        }
    }

    useEffect(() => {
        const fetchTankStats = async () => {
            const response = await fetch(`${baseUrl}/api/dt/live_tank`)
            const data = await response.json()

            setTankStatus(data)

            Animated.timing(animatedLevel, {
            toValue: data.water_level,
            duration: 500,
            useNativeDriver: false
            }).start()
        }
        fetchTankStats()
        const intervalId = setInterval(fetchTankStats, 100)

        return () => clearInterval(intervalId)
    }, [])

    const waterLevelPercentage = animatedLevel.interpolate({
        inputRange: [0, 15],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp', 
    });

    return (
        <View style={styles.tank_container}>
            <View style={styles.tank_info_container}>
                <View style={[styles.tank, { borderColor: tankStatusColor('water_level')}]}>
                    <Image source={require('../assets/peek.png')} resizeMode="contain" style={styles.tank_peek}/>
                    <Animated.View height={waterLevelPercentage} style={styles.tank_water_level}/>
                </View>
                <View style={styles.tank_info_card_container}>
                    <View style={styles.tank_info_card}>
                        <Text style={[styles.tank_info_text, { color: tankStatusColor('water_level')}]} >
                            {tankStatus.water_level} cm
                        </Text>
                        <View style={styles.tank_info_card_title_container}>
                            <Text style={styles.tank_info_card_title}>
                                Water Level
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tank_info_card}>
                        <Text style={[styles.tank_info_text, { color: 'white'}]} >
                            {tankControl.maintain} ± 0.2 cm
                        </Text>
                        <View style={styles.tank_info_card_title_container}>
                            <Text style={styles.tank_info_card_title}>
                                Maintain at
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tank_info_card}>
                        <Text style={[styles.tank_info_text, { color: 'white'}]} >
                            {tankControl.mode}
                        </Text>
                        <View style={styles.tank_info_card_title_container}>
                            <Text style={styles.tank_info_card_title}>
                                Mode
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tank_info_card}>
                        <Text style={[styles.tank_info_text, { color: tankStatusColor('action')}]} >
                            {tankStatus.action} 
                        </Text>
                        <View style={styles.tank_info_card_title_container}>
                            <Text style={styles.tank_info_card_title}>
                                Action
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.button_container}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#2C2C2E' }]}>
                    <MaterialCommunityIcons name='tune-variant' color={'white'} size={24}/>
                    <Text style={styles.button_text}>
                        Edit Setting
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#006DFF' }]}>
                    <MaterialCommunityIcons name='water-plus' color={'white'} size={24}/>
                    <Text style={styles.button_text}>
                        Add Water
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#D32F2F' }]}>
                    <MaterialCommunityIcons name='water-minus' color={'white'} size={24}/>
                    <Text style={styles.button_text}>
                        Drain Water
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tank_container: {
        flex: 1,
        margin: 30,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    tank_info_container: {
        flexDirection: 'row',
        width: '100%',
        height: 275,
    },
    tank: {
        borderWidth: 2,
        borderRadius: 10,
        width: '50%',
        marginRight: 5,
        backgroundColor: 'rgba(30, 30, 30, 1)',
        overflow: 'hidden',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100%',
    },
    tank_water_level: {
        width: '100%',
        backgroundColor: 'rgba(0, 122, 255, 0.5)',
    },
    tank_peek: { 
        height: 65, 
        width: '100%', 
        marginBottom: -8, 
        zIndex: 1
    },
    tank_info_card_container: {
        width: '45%',
        marginLeft: 5
    },
    tank_info_card: {
        borderRadius:10,
        borderWidth: 2,
        borderColor: 'rgba(0, 122, 255, 1)',
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    tank_info_card_title: {
        color: 'white',
        fontWeight: 'bold',
        padding: 5,
        fontSize: 14,
    },
    tank_info_card_title_container: {
        borderTopWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        width: '75%',
        alignItems:'center'
    },
    tank_info_text: {
        padding: 5,
        fontSize: 19,
        fontWeight: 'bold'
    },
    button_container: {
        margin: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 2,
        width: '100%',
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: '55%',
        height: 50,
        borderRadius: 10
    },
    button_text: {
        color: 'white',
        fontWeight: 'bold',
        marginHorizontal: 7,
        fontSize: 14,
        padding: 10
    }
})