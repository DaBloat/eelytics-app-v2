import { View, Text, StyleSheet, Image } from 'react-native'

export default function Dashboard({ navigation }){
    return (
        <View style={styles.dashboard_container}>
            <View style={styles.info_container}>
                <View style={styles.active_logo_container}>
                    <Image source={require('../assets/success.png')} style={styles.active_logo}/>
                </View>
                <View style={styles.active_info}>
                    <Text style={styles.sample_text}>
                         Goodmorning, Kurt!
                    </Text>
                </View>
            </View>
            <View style={styles.info_container}>
                <View style={styles.active_info}>
                    <Text style={styles.sample_text}>
                         Average Size & Count
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
                <View style={styles.active_info}>
                    <Text style={styles.sample_text}>
                         Live Eel
                    </Text>
                </View>
            </View>
            <View style={styles.info_container}>
                <View style={styles.active_info}>
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
                <View style={styles.active_info}>
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
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    active_logo: {
        height: 100,
        width: 100,
    },
    info_container: {
        flexDirection: 'row',
    },
    active_logo_container: {
        backgroundColor: 'black',
        borderRadius: 10,
        margin: 5
    },
    active_info: {
        backgroundColor: 'black',
        borderRadius: 10,
        width: 225,
        margin: 5
    },
    latter_info: {
        backgroundColor: 'black',
        width: '100%',
        borderRadius: 10,
        height: 100,
        margin: 5
    },
    sample_text: {
        color: 'white'
    }
})