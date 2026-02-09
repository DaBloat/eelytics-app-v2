import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Header({ title }){
    return (
        <View style={styles.headerContainer}>
            <View style={styles.lContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logo}/>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            <View>
                <TouchableOpacity>
                    <MaterialCommunityIcons name={'menu'} size={30} color={'gray'}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        backgroundColor: 'rgba(30, 30, 30, 1)',
        height: '6%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 122, 255, 1)',
        paddingHorizontal: 15,
        height: 55
    },
    lContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        height: 42,
        width: 42
    },
    title: {
        color: 'white',
        fontSize: 18,
        paddingLeft: 10,
        fontWeight: 'bold'
    }
})