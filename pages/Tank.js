import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'

export default function Tank({ navigation }){
    return (
        <View style={styles.tank_container}>
            <View style={styles.tank_info_container}>
                <View style={styles.tank}>
                    <Text>POP</Text>
                </View>
                <View style={styles.tank_info_card_container}>
                    <Text>POP</Text>
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
        marginRight: 5
    },
    tank_info_card_container: {
        borderWidth: 2,
        borderRadius: 10,
        width: '45%',
        marginLeft: 5
    }
})