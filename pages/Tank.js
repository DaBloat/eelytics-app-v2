import { View, Text, TouchableOpacity, Animated, StyleSheet, Image } from 'react-native'
import { useEffect, useRef, useState } from 'react'
 
export default function Tank({ route }){
    const animatedLevel = useRef(new Animated.Value(0)).current
    const [tankStatus, setTankStatus] = useState({'action' : "NONE", 'water_level': 0})
    const { baseUrl } = route.params

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
                <View style={styles.tank}>
                    <Image source={require('../assets/peek.png')} resizeMode="contain" style={styles.tank_peek}/>
                    <Animated.View height={waterLevelPercentage} style={styles.tank_water_level}/>
                </View>
                <View style={styles.tank_info_card_container}>
                    <View style={styles.tank_info_card}>
                        <Text style={styles.tank_info_text} >
                            {tankStatus.water_level} cm
                        </Text>
                        <View style={styles.tank_info_card_title_container}>
                            <Text style={styles.tank_info_card_title}>
                                Water Level
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tank_info_card}>
                        <Text style={styles.tank_info_text} >
                            -
                        </Text>
                        <View style={styles.tank_info_card_title_container}>
                            <Text style={styles.tank_info_card_title}>
                                Maintain at
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tank_info_card}>
                        <Text style={styles.tank_info_text} >
                            -
                        </Text>
                        <View style={styles.tank_info_card_title_container}>
                            <Text style={styles.tank_info_card_title}>
                                Mode
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tank_info_card}>
                        <Text style={styles.tank_info_text} >
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
            <View>
                <TouchableOpacity>
                    <Text>
                        Edit Mode
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>
                        Edit Maintain Target
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>
                        Flush Water
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
        borderColor: 'rgba(255, 255, 255, 0.5)',
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
        color: 'white',
        padding: 5,
        fontSize: 19,
        fontWeight: 'bold'
    },
})