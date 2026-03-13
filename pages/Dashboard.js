import { View, Text, StyleSheet, Image } from 'react-native'
import { useState, useEffect } from 'react'

export default function Dashboard({ navigation }){
    const [greeting, setGreeting] = useState("")
    const [currentTime, setCurrentTime] = useState(new Date())
    const dummy = 'Dominic'

    useEffect(() => {
        const getGreeting = () => {
            const currentHour = new Date().getHours()
            if (currentHour < 12) {
                return `Good Morning, ${dummy}!`
            }
            else if (currentHour === 12) {
                return `Good Noon, ${dummy}!`
            }
            else if (currentHour < 18) {
                return `Good Afternoon, ${dummy}!`
            }
            else {
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
                    <Image source={require('../assets/success.png')} style={{width: 45, height: 45}}/>
                </View>
                <View style={styles.greeting_card}>
                    <View style={styles.greeting_container}>
                        <Text style = {styles.greeting}>
                            {greeting}
                        </Text>
                        <Text style = {styles.datetime}>
                            {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.info_container}>
                <View style={styles.active_card}>
                    <Text style={styles.sample_text}>
                         Average Size & Count
                    </Text>
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
                    <Text style={styles.sample_text}>
                         Live Eel
                    </Text>
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
        borderWidth: 1,
        borderColor: 'rgba(0, 122, 255, 1)',
        margin: 5,
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    active_card: {
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        borderWidth: 1,
        borderColor: 'rgba(0, 122, 255, 1)',
        borderRadius: 10,
        width: 225,
        margin: 5
    },
    latter_info: {
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        borderWidth: 1,
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
        borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    count_title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
        paddingTop: 5
    }
})