import { View, Text, StyleSheet, Image, Animated } from 'react-native'
import { WebView } from 'react-native-webview'
import { useState, useEffect, useRef } from 'react'

export default function Dashboard({ route }){
    const animatedLevel = useRef(new Animated.Value(0)).current
    const [greeting, setGreeting] = useState("")
    const [currentTime, setCurrentTime] = useState(new Date())
    const [timeState, setTimeState] = useState('morning')
    const [detection, setDetected] = useState(false)
    const [action, setAction] = useState(false)
    const [system, setSystem] = useState(false)
    const timeStateDict = {
        'morning' : require('../assets/morning.png'),
        'noon' : require('../assets/noon.png'),
        'night' : require('../assets/night.png')
    }
    const { baseUrl } = route.params
    const dummy = 'Test User'

    useEffect(() => {
        const getGreeting = () => {
            const currentHour = new Date().getHours()
            if (currentHour < 12) {
                setTimeState('morning')
                return `Good Morning, ${dummy}!`
            }
            else if (currentHour === 12) {
                setTimeState('noon')
                return `Good Noon, ${dummy}!`
            }
            else if (currentHour < 18) {
                setTimeState('noon')
                return `Good Afternoon, ${dummy}!`
            }
            else {
                setTimeState('night')
                return `Good Evening, ${dummy}!`
            }
        }
    setGreeting(getGreeting())

    const timer = setInterval(() => {
        setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
    },[])

    useEffect(() => {
        const fetchTankStats = async () => {
            const response = await fetch(`${baseUrl}/api/dt/live_tank_all`)
            const data = await response.json()

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
        <View style={styles.dashboard_container}>
            <View style={styles.info_container}>
                <View style={styles.greeting_logo_container}>
                    <Image source={timeStateDict[timeState]} style={{width: 75, height: 75}}/>
                </View>
                <View style={styles.greeting_card}>
                    <View style={styles.greeting_container}>
                        <Text style = {styles.greeting}>
                            {greeting}
                        </Text>
                        <Text style = {styles.datetime}>
                            It's {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.info_container}>
                <View style={styles.active_card}>
                    <View style={styles.average_card}>
                        <View style={styles.common_container}>
                            <View style={[styles.size_eel, {backgroundColor: '#00D4FF'}]}>
                                <Text style={styles.size_eel_count}>
                                    -
                                </Text>
                                <Text style={styles.size_eel_title}>
                                    ELVER
                                </Text>
                            </View>
                            <View style={[styles.size_eel, {backgroundColor: '#00FF41'}]}>
                                <Text style={styles.size_eel_count}>
                                    -
                                </Text>
                                <Text style={styles.size_eel_title}>
                                    KUROKO
                                </Text>
                            </View>
                           <View style={[styles.size_eel, {backgroundColor: '#FF3131'}]}>
                                <Text style={styles.size_eel_count}>
                                    -
                                </Text>
                                <Text style={styles.size_eel_title}>
                                    TABLE
                                </Text>
                            </View>
                        </View>
                        <View style={styles.average_title}>
                            <Text style={styles.average_title_text}>
                                Average Sizes (inches)
                            </Text>
                        </View>
                    </View>
                </View>
                    <View style={styles.active_logo_container}>
                        <Text style={styles.count_text}>
                            -
                        </Text>
                        <View style={styles.count_title_container}>
                            <Text style={styles.count_title}>
                                Eel Count
                            </Text>
                        </View>
                </View>
            </View>
            <View style={styles.info_container}>
                <View style={styles.active_logo_container}>
                    {detection ? <Image source={require('../assets/eel_detected.png')} style={styles.active_logo}/> : 
                                 <Image source={require('../assets/eel_not_detected.png')} style={styles.active_logo}/>}
                </View>
                <View style={styles.active_card}>
                    <View style={styles.webview_container}>
                        <WebView
                            source={{ 
                                uri: "http://192.168.1.220/cam/",
                                headers: { 'ngrok-skip-browser-warning': 'true' }
                            }}
                            style={{ 
                                flex: 1, 
                                height: 300, 
                                transform: [
                                    { scale: 2.3 },
                                    { rotate: '90deg' }
                                ],
                            }}
                            scrollEnabled={false}
                            mediaPlaybackRequiresUserAction={false}
                            allowsInlineMediaPlayback={true}
                        />   
                    </View>
                    <View style={[styles.eel_info, { backgroundColor: 'rgba(30, 30, 30, 0.6)' }]}>
                        <View style={styles.group_container}>
                                <Text style={styles.info_text}>
                                    -
                                </Text>
                            <View style={styles.info_title_container}>
                                <Text style={styles.info_title_text}>
                                    Live Detected Group Size
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.info_container}>
                <View style={styles.active_card}>
                    <View style={[styles.eel_info, { backgroundColor: 'rgba(30, 30, 30, 0.6)' }]}>
                        <View style={styles.group_container}>
                                <Text style={styles.info_text}>
                                    -
                                </Text>
                            <View style={styles.info_title_container}>
                                <Text style={styles.info_title_text}>
                                    Live Detected Water Level
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.tank}>
                        <Animated.View height={waterLevelPercentage} style={styles.tank_water_level}/>
                    </View>
                </View>
                <View style={styles.active_logo_container}>
                    {action ? <Image source={require('../assets/eel_fill.png')} style={styles.active_logo}/> : 
                              <Image source={require('../assets/eel_drain.png')} style={styles.active_logo}/>}
                </View>
            </View>
            <View style={styles.info_container}>
                <View style={styles.active_logo_container}>
                    {system ? <Image source={require('../assets/system-true.png')} style={styles.active_logo}/> : 
                              <Image source={require('../assets/system-false.png')} style={styles.active_logo}/>}
                </View>
                <View style={styles.active_card}>
                        <View style={styles.group_container}>
                            <View style={styles.common_container}>
                                <View style={[styles.sys_stat, {backgroundColor: '#FF3131'}]}>
                                    <Text style={styles.sys_stat_bool}>
                                        ERR
                                    </Text>
                                    <Text style={styles.sys_stat_title}>
                                        MODEL
                                    </Text>
                                </View>
                                <View style={[styles.sys_stat, {backgroundColor: '#FF3131'}]}>
                                    <Text style={styles.sys_stat_bool}>
                                        ERR
                                    </Text>
                                    <Text style={styles.sys_stat_title}>
                                        GATE
                                    </Text>
                                </View>
                                <View style={[styles.sys_stat, {backgroundColor: '#FF3131'}]}>
                                    <Text style={styles.sys_stat_bool}>
                                        ERR
                                    </Text>
                                    <Text style={styles.sys_stat_title}>
                                        TANK
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.info_title_container}>
                                <Text style={styles.info_title_text}>
                                    System Health
                                </Text>
                            </View>
                        </View>
                </View>
            </View>
            <View style={styles.latter_info}>
                <View style={styles.group_container}>
                    <View>
                        <View>
                            <Text>
                                CPU
                            </Text>
                            <Animated.View/>
                        </View>
                        <View>
                            <Text>
                                RAM
                            </Text>
                            <Animated.View/>
                        </View>
                        <View>
                            <Text>
                                STORAGE
                            </Text>
                            <Animated.View/>
                        </View>
                    </View>
                    <View style={styles.info_title_container}>
                        <Text style={styles.info_title_text}>
                            System Status
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dashboard_container: {
        margin: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    active_logo: {
        height: 95,
        width: 95,
    },
    info_container: {
        flexDirection: 'row',
    },
    active_logo_container: {
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(0, 122, 255, 1)',
        margin: 5,
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    active_card: {
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        borderWidth: 2,
        borderColor: 'rgba(0, 122, 255, 1)',
        borderRadius: 10,
        width: 225,
        height: 100,
        margin: 5
    },
    latter_info: {
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        borderWidth: 2,
        borderColor: 'rgba(0, 122, 255, 1)',
        width: '100%',
        borderRadius: 10,
        height: 100,
        margin: 5
    },
    greeting_logo_container: {
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(0, 122, 255, 1)',
        margin: 5,
        height: 60,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    greeting_card: {
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        borderWidth: 2,
        borderColor: 'rgba(0, 122, 255, 1)',
        borderRadius: 10,
        width: 225,
        height: 60,
        margin: 5
    },
    greeting_container: {
        margin: 15,
        justifyContent: 'center'
    },
    greeting: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    datetime: {
        color: 'rgba(255, 255, 255, 0.2)',
        fontSize: 14,
        fontWeight: 'bold'
    },
    count_text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 50
    },
    count_title_container: {
        width: '65%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    count_title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
        paddingTop: 5
    },
    average_card: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5
    },
    average_title: {
        width: '65%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    average_title_text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
        paddingTop: 5
    },
    common_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 5,
        paddingHorizontal: 15
    },
    size_eel: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
        width: 55,
        borderRadius: 10
    },
    size_eel_count: {
        fontSize: 25,
        color: 'rgba(30, 30, 30, 1)',
        fontWeight: 'bold'
    },
    size_eel_title: {
        fontSize: 12,
        color: 'rgba(30, 30, 30, 1)',
        fontWeight: 'bold'
    },
    webview_container: {
        flex: 1, 
        overflow: 'hidden', 
        borderRadius: 8
    },
    eel_info: {
         zIndex: 1, 
         position: 'absolute', 
         height: '100%', 
         width: '100%',
         borderRadius: 8,
         justifyContent: 'center',
    },
    group_container: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 5
    },
    info_title_container: {
        width: '75%',
        borderTopWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingBottom: 5,
        alignItems: 'center'
    },
    info_title_text: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        padding: 3,
    },
    info_text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        padding: 5
    },
    tank: {
        borderRadius: 8,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100%'
    },
    tank_water_level: {
        width: '100%',
        backgroundColor: 'rgba(0, 122, 255, 1)',
    },
    sys_stat: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
        width: 55,
        borderRadius: 10
    },
    sys_stat_bool: {
        fontSize: 25,
        color: 'rgba(30, 30, 30, 1)',
        fontWeight: 'bold'
    },
    sys_stat_title: {
        borderTopWidth: 1,
        borderColor: 'rgba(30, 30, 30, 0.6)',
        fontSize: 12,
        color: 'rgba(30, 30, 30, 1)',
        fontWeight: 'bold',
    },
})