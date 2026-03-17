import { View, Text, StyleSheet, Image } from 'react-native'
import { WebView } from 'react-native-webview'
import { useState, useEffect } from 'react'

export default function Dashboard({ navigation }){
    const [greeting, setGreeting] = useState("")
    const [currentTime, setCurrentTime] = useState(new Date())
    const [timeState, setTimeState] = useState('morning')
    const timeStateDict = {
        'morning' : require('../assets/morning.png'),
        'noon' : require('../assets/noon.png'),
        'night' : require('../assets/night.png')
    }
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
    },[])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

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
                        <View style={styles.average_container}>
                            <View style={[styles.size_eel, {backgroundColor: '#00D4FF'}]}>
                                <Text style={styles.size_eel_count}>
                                    00
                                </Text>
                                <Text style={styles.size_eel_title}>
                                    ELVER
                                </Text>
                            </View>
                            <View style={[styles.size_eel, {backgroundColor: '#00FF41'}]}>
                                <Text style={styles.size_eel_count}>
                                    00
                                </Text>
                                <Text style={styles.size_eel_title}>
                                    KUROKO
                                </Text>
                            </View>
                           <View style={[styles.size_eel, {backgroundColor: '#FF3131'}]}>
                                <Text style={styles.size_eel_count}>
                                    00
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
                            999
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
                    <Image source={require('../assets/success.png')} style={styles.active_logo}/>
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
                    <View style={styles.live_eel_info}>
                        <Text>
                            Pop
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.info_container}>
                <View style={styles.active_card}>
                    <Text style={styles.sample_text}>
                         Live Tank
                    </Text>
                </View>
                <View style={styles.active_logo_container}>
                    <Image source={require('../assets/success.png')} style={styles.active_logo}/>
                </View>
            </View>
            <View style={styles.info_container}>
                <View style={styles.active_logo_container}>
                    <Image source={require('../assets/success.png')} style={styles.active_logo}/>
                </View>
                <View style={styles.active_card}>
                    <Text style={styles.sample_text}>
                         I DOn't Know Yet!
                    </Text>
                </View>
            </View>
            <View style={styles.latter_info}>
                <Text style={styles.sample_text}>
                    System Info
                </Text>
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
        height: 75,
        width: 75,
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
        borderWidth: 1,
        borderColor: 'rgba(0, 122, 255, 1)',
        margin: 5,
        height: 60,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    greeting_card: {
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        borderWidth: 1,
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
        alignItems: 'center'
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
    average_container: {
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
    live_eel_info: {
         zIndex: 1, 
         backgroundColor: 'rgba(30, 30, 30, 0.4)', 
         position: 'absolute', 
         height: '100%', 
         width: '100%',
         borderRadius: 8
    }
})