import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'

export default function Tank({ navigation }){
    return (
        <View style={styles.tank_container}>
            <View style={styles.tank_info_container}>
                <View style={styles.tank}>
                    <Text>POP</Text>
                </View>
                <View style={styles.tank_info_card_container}>
                    <View style={styles.tank_info_card}>
                        <Text style={styles.tank_info_text} >
                            6.5 cm
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
                                Mode
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tank_info_card}>
                        <Text style={styles.tank_info_text} >
                            -
                        </Text>
                        <View style={styles.tank_info_card_title_container}>
                            <Text style={styles.tank_info_card_title}>
                                Action
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tank_info_card}>
                        <Text style={styles.tank_info_text} >
                            -
                        </Text>
                        <View style={styles.tank_info_card_title_container}>
                            <Text style={styles.tank_info_card_title}>
                                Goal
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tank_container: {
        margin: 30,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    tank_info_container: {
        flexDirection: 'row',
        width: '100%',
        height: '65%'
    },
    tank: {
        borderWidth: 2,
        borderRadius: 10,
        width: '50%',
        marginRight: 5,
                borderColor: 'rgba(0, 122, 255, 1)',
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
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
        padding: 5
    },
    tank_info_card_title_container: {
        borderTopWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    tank_info_text: {
        color: 'white',
        padding: 5,
        fontSize: 18,
        fontWeight: 'bold'
    },
})