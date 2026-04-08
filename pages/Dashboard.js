import { View, Text, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'
import { useState, useEffect, useRef } from 'react'

export default function Dashboard({ route, navigation }){
    const animatedLevel = useRef(new Animated.Value(0)).current
    const [greeting, setGreeting] = useState("")
    const [currentTime, setCurrentTime] = useState(new Date())
    const [timeState, setTimeState] = useState('morning')
    const [eelData, setEelData] = useState({"group":"NONE", "size": 0})
    const [action, setAction] = useState(false)
    const [tankData, setTankData] = useState({'opts':{'maintain': 0, 'mode': "NONE"}, 'status':{'action':'NONE', 'water_level': 0}})
    const [logData, setLogData] = useState({'count': 0, 'avg_elver': 0, 'avg_kuroko': 0, 'avg_table': 0})
    const [system, setSystem] = useState(false)
    const timeStateDict = {
        'morning' : require('../assets/morning.png'),
        'noon' : require('../assets/noon.png'),
        'night' : require('../assets/night.png')
    }
    const colorGroup = {"ELVER" : '#00D4FF',
                        "KUROKO" : '#00FF41',
                        'TABLE': '#FF3131',
                        'NONE': 'white'}
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
        const fetchLiveData = async() => {
            const response = await fetch(`${baseUrl}/api/dt/live_eel`)
            const data = await response.json()

            setEelData(data)
        }

        const intervalId = setInterval(fetchLiveData, 100)
        return () => clearInterval(intervalId)
    },[])

    useEffect(() => {
        const fetchLiveData = async() => {
            const response = await fetch(`${baseUrl}/api/eelsdb/get_data`)
            const data = await response.json()

            setLogData(data)
        }

        const intervalId = setInterval(fetchLiveData, 100)
        return () => clearInterval(intervalId)
    },[])

    const maintainColor = () => {
            let upper = tankData.opts.maintain + 0.2
            let lower = tankData.opts.maintain - 0.2
            if ( lower <= tankData.status.water_level && tankData.status.water_level <= upper) {
                return '#00FF41'
            }
            else {
                return '#FF3131'
            }
    }

    useEffect(() => {
        const fetchTankStats = async () => {
            const response = await fetch(`${baseUrl}/api/dt/live_tank_all`)
            const data = await response.json()

            Animated.timing(animatedLevel, {
            toValue: data.status.water_level,
            duration: 90,
            useNativeDriver: false
            }).start()

            setTankData(data)
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
                <TouchableOpacity style={styles.active_card} onPress={()=>{navigation.navigate('Log', { baseUrl: baseUrl })}}>
                    <View style={styles.average_card}>
                        <View style={styles.common_container}>
                            <View style={[styles.size_eel, {backgroundColor: '#00D4FF'}]}>
                                <Text style={styles.size_eel_count}>
                                    {(logData.avg_elver).toFixed(2)}
                                </Text>
                                <Text style={styles.size_eel_title}>
                                    ELVER
                                </Text>
                            </View>
                            <View style={[styles.size_eel, {backgroundColor: '#00FF41'}]}>
                                <Text style={styles.size_eel_count}>
                                    {(logData.avg_kuroko).toFixed(2)}
                                </Text>
                                <Text style={styles.size_eel_title}>
                                    KUROKO
                                </Text>
                            </View>
                           <View style={[styles.size_eel, {backgroundColor: '#FF3131'}]}>
                                <Text style={styles.size_eel_count}>
                                    {(logData.avg_table).toFixed(2)}
                                </Text>
                                <Text style={styles.size_eel_title}>
                                    TABLE
                                </Text>
                            </View>
                        </View>
                        <View style={styles.average_title}>
                            <Text style={styles.average_title_text}>
                                Average Size (inches)
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                    <View style={styles.active_logo_container}>
                        <Text style={styles.count_text}>
                            {logData.count}
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
                    {eelData.group === "NONE" ? <Image source={require('../assets/eel_not_detected.png')} style={styles.active_logo}/> : 
                                 <Image source={require('../assets/eel_detected.png')} style={styles.active_logo}/>}
                </View>
                <TouchableOpacity style={styles.active_card} onPress={()=>{navigation.navigate('Live', { baseUrl: baseUrl })}}>
                    <View style={styles.webview_container}>
                        <WebView
                            source={{ 
                                uri: `${baseUrl}/cam/`,
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
                            scrollEnabled={true}
                            mediaPlaybackRequiresUserAction={false}
                            allowsInlineMediaPlayback={true}
                        />   
                    </View>
                    <View style={[styles.eel_info, { backgroundColor: 'rgba(30, 30, 30, 0.6)' }]}>
                        <View style={styles.group_container}>
                                <Text style={[styles.info_text, { color: colorGroup[eelData.group] }]}>
                                    {eelData.group === "NONE" ? "-" : eelData.group}
                                </Text>
                            <View style={styles.info_title_container}>
                                <Text style={styles.info_title_text}>
                                    Live Detected Group Size
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.info_container}>
                <TouchableOpacity style={styles.active_card} onPress={()=>{navigation.navigate('Tank', { baseUrl: baseUrl })}}>
                    <View style={[styles.eel_info, { backgroundColor: 'rgba(30, 30, 30, 0.6)' }]}>
                        <View style={styles.group_container}>
                                <Text style={[styles.info_text, { color: maintainColor() }]}>
                                    {(tankData.status.water_level).toFixed(2)} cm
                                </Text>
                            <View style={styles.info_title_container}>
                                <Text style={styles.info_title_text}>
                                    Live Detected Water Lvl
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.tank}>
                        <Animated.View height={waterLevelPercentage} style={styles.tank_water_level}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.active_logo_container}>
                    {tankData.status.action === "FILLING" ? <Image source={require('../assets/eel_fill.png')} style={styles.active_logo}/> : 
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
                    <View style={styles.per_stat_container}> 
                        <View style={styles.per_stat}>
                            <Text style={styles.per_stat_text}>
                                CPU
                            </Text>
                            <View style={styles.stat_bar}>
                                <Animated.View width={'12%'} style={styles.stat_bar_level}/>
                            </View>
                        </View>
                        <View style={styles.per_stat}>
                            <Text style={styles.per_stat_text}>
                                RAM
                            </Text>
                            <View style={styles.stat_bar}>
                                <Animated.View width={'25%'} style={styles.stat_bar_level}/>
                            </View>
                        </View>
                        <View style={styles.per_stat}>
                            <Text style={styles.per_stat_text}>
                                BIN
                            </Text>
                            <View style={styles.stat_bar}>
                                <Animated.View width={'35%'} style={styles.stat_bar_level}/>
                            </View>
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
    per_stat_container: {
        marginHorizontal: 15
    },
    per_stat: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 3,
    },
    stat_bar: {
        width: '87%',
        height: 10,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    per_stat_text: {
        color: 'white',
        fontWeight: 'bold',
        width: 35
    },
    stat_bar_level: {
        height: "100%",
        backgroundColor: 'red'
    }
})