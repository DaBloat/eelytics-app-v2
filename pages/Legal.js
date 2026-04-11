import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

export default function Legal({ toggleLegal }){
    return(
        <>
            <View style={styles.bfar_container}>
                <Image source={require('../assets/bfar.png')} style={styles.bfar_logo}/>
            </View>
            <View>
                <Text style={styles.bfar_order}>
                    Fisheries Administrative Order No. 242, Series of 2012
                </Text>
            </View>
            <View>
                <Text style={styles.bfar_subject}>
                    Reinstating the ban on the export of elvers
                </Text>
            </View>
            <ScrollView>
                <Image source={require('../assets/bfar_1.png')} style={styles.bfar_paper}/>
                <Image source={require('../assets/bfar_2.png')} style={styles.bfar_paper}/>
            </ScrollView>
            <TouchableOpacity onPress={toggleLegal} style={styles.bfar_button}>
                <Text style={styles.bfar_button_text}>
                    OK, Got It!
                </Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    bfar_container: {
        backgroundColor: 'rgba(0, 122, 255, 0.9)',
        borderRadius: 10,
        margin: 10
    },
    bfar_logo: {
        height: 75,
        width: 100
    },
    bfar_order: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10
    },
    bfar_subject: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },
    bfar_paper: {
        height: 400,
        width: 300
    },
    bfar_button: {
        margin: 5,
        backgroundColor: 'rgba(0, 122, 255, 0.9)',
        padding: 15,
        borderRadius: 10,
    },
    bfar_button_text: {
        color: 'white',
        fontWeight: 'bold'
    }
})