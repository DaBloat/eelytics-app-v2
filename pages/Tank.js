import { View, Text, TouchableOpacity, Animated, StyleSheet, Image, TextInput} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import GeneralModal from '../components/GeneralModal'
 
export default function Tank({ route }){
    const animatedLevel = useRef(new Animated.Value(0)).current
    const [isMenu, setMenu] = useState(false)
    const [tankStatus, setTankStatus] = useState({'action' : "NONE", 'water_level': 0})
    const [tankControl, setTankControl] = useState({"mode": 'NONE', "maintain": 0})
    const [maintainValue, setMaintainValue] = useState(`${tankControl.maintain}`)
    const [modeValue, setModeValue] = useState(`${tankControl.mode}`)
    const { baseUrl } = route.params

    const toggleMenu = () => {
        setMenu(!isMenu)
    }

    const handleEdit = async() => {
        const start = await fetch(`${baseUrl}/api/dt/update_tank_options`,
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    mode: modeValue,
                    maintain: maintainValue
                })
            }
        )
        const data_start = await start.json()
        console.log(data_start)
        toggleMenu()
    }

    const handleStart = async() => {
        const reset = await fetch(`${baseUrl}/api/dt/update_tank_options`,
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    mode: 'NONE',
                    maintain: 0
                })
            }
        )
        const data_reset = await reset.json()
        await new Promise(resolve => setTimeout(resolve, 150));
        const start = await fetch(`${baseUrl}/api/dt/update_tank_options`,
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    mode: "AUTO",
                    maintain: 3.5
                })
            }
        )
        const data_start = await start.json()
        console.log(data_start)
    }

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
                return '#00D4FF'
            }
            if (tankStatus.action === 'DRAINING') {
                return '#FF3131'
            }
            if (tankStatus.action === 'MAINTAINED') {
                return '#00FF41'
            }
            if (tankStatus.action === 'MANUAL_STOP') {
                return '#FFFF00'
            }
            else {
                return 'white'
            }
        }
        if (info === 'mode'){
            if (tankControl.mode === 'AUTO') {
                return '#00FF41'
            }
            if (tankControl.mode === 'MANUAL') {
                return '#FF8C00'
            }
            if (tankControl.mode === 'WAITING') {
                return '#FFFF00'
            }
        }
    }

    useEffect(() => {
        const fetchTankStats = async () => {
            const response = await fetch(`${baseUrl}/api/dt/live_tank_all`)
            const data = await response.json()

            setTankStatus(data.status)
            if (data.status.action === "MANUAL_STOP"){
                setTankControl({"mode": 'WAITING', "maintain": 999})
            }
            else {
                setTankControl(data.opts)
            }

            Animated.timing(animatedLevel, {
            toValue: data.status.water_level,
            duration: 90,
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
                            {(tankStatus.water_level).toFixed(2)} cm
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
                        <Text style={[styles.tank_info_text, { color: tankStatusColor('mode')}]} >
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
                <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]} onPress={handleStart}>
                    <MaterialCommunityIcons name='power-standby' color={'white'} size={24}/>
                    <Text style={styles.button_text}>
                        Start/Reset
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#2C2C2E' }]} onPress={toggleMenu}>
                    <MaterialCommunityIcons name='tune-variant' color={'white'} size={24}/>
                    <Text style={styles.button_text}>
                        Edit Setting
                    </Text>
                </TouchableOpacity>
            </View>
            <GeneralModal state={isMenu} onClose={toggleMenu} height={'30%'} width={'65%'}>
                <View style={styles.edit_control_container}>
                    <View style={styles.maintain_container}>
                        <Text style={styles.maintain_text}>
                            Maintain at:
                        </Text>
                        <TextInput style={styles.maintain_input_text}
                                   value={maintainValue}
                                   onChangeText={setMaintainValue}
                                   keyboardType='numeric'>
                        </TextInput>
                        <Text style={styles.inch_text}>
                            in
                        </Text>
                    </View>
                    <View style={styles.mode_container}>
                            <Text style={styles.mode_text}>
                                Mode:
                            </Text>
                            <View style={styles.modal_button_container}>
                                <TouchableOpacity style={styles.mode_button}>
                                    <Text style={styles.mode_button_text}>
                                        AUTO
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.mode_button}>
                                    <Text style={styles.mode_button_text}>
                                        MANUAL
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.mode_button}>
                                    <Text style={styles.mode_button_text}>
                                        NONE
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                    <View style={styles.modal_button_container}>
                        <TouchableOpacity style={[styles.modal_button, {backgroundColor: 'rgba(0, 122, 255, 1)'}]} onPress={handleEdit}>
                                <Text style={styles.save_button_text}>
                                    SAVE
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modal_button, {backgroundColor: '#FF3131'}]} onPress={toggleMenu}>
                                <Text style={styles.save_button_text}>
                                    CANCEL
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </GeneralModal>
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
        padding: 6,
        fontSize: 18,
        fontWeight: 'bold'
    },
    button_container: {
        margin: 20,
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
    },
    edit_control_container: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    maintain_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        padding: 10
    },
    maintain_input_text: {
        flex: 1,
        color: 'white',
        fontWeight: 16,
        height: 35  ,
        borderBottomWidth: 2,
        borderColor: 'rgba(0, 122, 255, 1)',
    },
    maintain_text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal:  10
    },
    inch_text: {
        color: 'white',
        fontWeight: 16,
        fontWeight: 'bold', 
        paddingHorizontal: 10
    },
    mode_container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginBottom: 15,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.2)',
        padding: 10
    },
    modal_button_container: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    mode_text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal:  10,
        marginBottom: 10
    },
    mode_button: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        width: '30%',
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(0, 122, 255, 1)'
    },
    mode_button_text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12
    },
    modal_button: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        width: '45%',
        height: 50,
        borderRadius: 10,
    },
    save_button_text: {
        color: 'white',
        fontWeight: 'bold',
        marginHorizontal: 7,
        fontSize: 14,
        padding: 10
    },
})